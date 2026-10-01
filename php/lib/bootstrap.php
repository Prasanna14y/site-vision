<?php
// Shared helpers for the PHP endpoints (chat.php, quote.php) on shared hosting.
declare(strict_types=1);

/**
 * Settings live OUTSIDE the web root so they can never be downloaded:
 *   /home/<cpanel-user>/sitevision-config.php   (one level above public_html)
 * See sitevision-config.example.php. Environment variables work as a fallback.
 */
function sv_config(): array
{
    static $config = null;
    if ($config !== null) {
        return $config;
    }
    $config = [];
    $candidates = [
        dirname((string) ($_SERVER['DOCUMENT_ROOT'] ?? __DIR__ . '/../..')) . '/sitevision-config.php',
        __DIR__ . '/../../../sitevision-config.php',
    ];
    foreach ($candidates as $file) {
        if (is_file($file)) {
            $loaded = require $file;
            if (is_array($loaded)) {
                $config = $loaded;
            }
            break;
        }
    }
    $config += [
        'anthropic_api_key' => getenv('ANTHROPIC_API_KEY') ?: '',
        'quote_to' => 'info@sitevision.au',
        'mail_from' => '',
    ];
    return $config;
}

function sv_json(array $body, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** Only accept POSTs from this site's own pages. */
function sv_require_same_origin_post(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        sv_json(['error' => 'method_not_allowed'], 405);
    }
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $host = $_SERVER['HTTP_HOST'] ?? '';
    if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== preg_replace('/:\d+$/', '', $host)) {
        sv_json(['error' => 'forbidden'], 403);
    }
}

function sv_read_json(): array
{
    $raw = file_get_contents('php://input', false, null, 0, 64 * 1024);
    $data = json_decode((string) $raw, true);
    return is_array($data) ? $data : [];
}

/**
 * Simple per-IP rate limit using small files in a private folder.
 * Returns false when the caller has used up `$max` requests in `$windowSeconds`.
 */
function sv_rate_limit(string $bucket, int $max, int $windowSeconds): bool
{
    $dir = __DIR__ . '/data';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) {
        return true; // can't track — don't block real visitors
    }
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $file = $dir . '/' . $bucket . '-' . hash('sha256', $ip) . '.json';
    $now = time();
    $hits = [];
    if (is_file($file)) {
        $hits = json_decode((string) @file_get_contents($file), true) ?: [];
    }
    $hits = array_values(array_filter($hits, fn($t) => is_int($t) && $t > $now - $windowSeconds));
    if (count($hits) >= $max) {
        return false;
    }
    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
    return true;
}
