<?php
// POST /api/chat.php — the website chat assistant on shared hosting (HostGator).
// Same contract as src/routes/api/chat.ts:
//   body  { messages: [{ role: "user"|"assistant", content: string }, ...] }
//   reply { reply: string }  or  { error: string } with a 4xx/5xx status.
// Without an API key it returns 503 and the widget answers from the FAQ.
declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/vendor/autoload.php';

use Anthropic\Client;
use Anthropic\Core\Exceptions\APIException;
use Anthropic\Core\Exceptions\APIStatusException;
use Anthropic\Core\Exceptions\RateLimitException;

const MAX_TURNS = 12;
const MAX_CHARS_PER_MESSAGE = 800;

sv_require_same_origin_post();

$apiKey = (string) sv_config()['anthropic_api_key'];
if ($apiKey === '') {
    sv_json(['error' => 'not_configured'], 503);
}
if (!sv_rate_limit('chat', 30, 600)) { // 30 messages / 10 min per visitor
    sv_json(['error' => 'busy'], 429);
}

// Validate: alternating turns, starting and ending with the visitor.
$raw = sv_read_json()['messages'] ?? null;
if (!is_array($raw) || count($raw) === 0 || count($raw) > MAX_TURNS) {
    sv_json(['error' => 'bad_request'], 400);
}
$messages = [];
foreach (array_values($raw) as $i => $m) {
    $role = is_array($m) ? ($m['role'] ?? null) : null;
    $content = is_array($m) ? ($m['content'] ?? null) : null;
    $expected = $i % 2 === 0 ? 'user' : 'assistant';
    if ($role !== $expected || !is_string($content)) {
        sv_json(['error' => 'bad_request'], 400);
    }
    $text = trim(mb_substr($content, 0, MAX_CHARS_PER_MESSAGE));
    if ($text === '') {
        sv_json(['error' => 'bad_request'], 400);
    }
    $messages[] = ['role' => $role, 'content' => $text];
}
if (end($messages)['role'] !== 'user') {
    sv_json(['error' => 'bad_request'], 400);
}

// The assistant's instructions + knowledge, generated from the site's data at build time.
$system = (string) @file_get_contents(__DIR__ . '/lib/assistant-prompt.txt');
if ($system === '') {
    sv_json(['error' => 'not_configured'], 503);
}

try {
    $client = new Client(apiKey: $apiKey);
    $message = $client->beta->messages->create(
        model: 'claude-opus-5-5',
        maxTokens: 1024, // replies are deliberately short (2–4 sentences)
        outputConfig: ['effort' => 'low'],
        betas: ['server-side-fallback-2026-07-01'],
        fallbacks: 'default',
        system: [['type' => 'text', 'text' => $system, 'cacheControl' => ['type' => 'ephemeral']]],
        messages: $messages,
    );

    if ($message->stopReason === 'refusal') {
        sv_json(['reply' => "Sorry, I can't help with that one. For anything security-related, give our team a call or request a free quote."]);
    }
    $parts = [];
    foreach ($message->content as $block) {
        if ($block->type === 'text') {
            $parts[] = $block->text;
        }
    }
    $reply = trim(implode("\n", $parts));
    sv_json(['reply' => $reply !== '' ? $reply : "Sorry, I didn't catch that — could you rephrase?"]);
} catch (RateLimitException $e) {
    sv_json(['error' => 'busy'], 429);
} catch (APIStatusException $e) {
    error_log('Chat API error ' . ($e->status ?? '?') . ': ' . $e->getMessage());
    sv_json(['error' => 'upstream'], 502);
} catch (APIException $e) {
    error_log('Chat connection error: ' . $e->getMessage());
    sv_json(['error' => 'upstream'], 502);
}
