<?php
// POST /api/quote.php — emails a quote request to the business (HostGator mail()).
//   body  { name, phone, email, suburb, state, enquiryType, message, website }
//   reply { ok: true }  or  { error: string } with a 4xx/5xx status.
// `website` is a hidden honeypot field: real visitors leave it empty.
declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';

sv_require_same_origin_post();

$in = sv_read_json();
$field = static function (string $key, int $max) use ($in): string {
    $v = $in[$key] ?? '';
    if (!is_string($v)) {
        return '';
    }
    // Strip control characters (incl. CR/LF — no header injection), trim, cap length.
    $v = preg_replace('/[\x00-\x09\x0B-\x1F\x7F]/u', '', $v) ?? '';
    return trim(mb_substr($v, 0, $max));
};

// Bots fill every field — pretend success so they move on.
if ($field('website', 200) !== '') {
    sv_json(['ok' => true]);
}

$name = str_replace(["\r", "\n"], ' ', $field('name', 100));
$phone = str_replace(["\r", "\n"], ' ', $field('phone', 40));
$email = str_replace(["\r", "\n"], '', $field('email', 150));
$suburb = str_replace(["\r", "\n"], ' ', $field('suburb', 80));
$state = str_replace(["\r", "\n"], ' ', $field('state', 10));
$type = str_replace(["\r", "\n"], ' ', $field('enquiryType', 60));
$message = $field('message', 3000);

if ($name === '' || $phone === '' || $suburb === '' || $type === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sv_json(['error' => 'invalid'], 400);
}
if (!sv_rate_limit('quote', 5, 3600)) { // 5 enquiries / hour per visitor
    sv_json(['error' => 'busy'], 429);
}

$config = sv_config();
$to = (string) $config['quote_to'];
$host = preg_replace('/^www\./', '', preg_replace('/:\d+$/', '', (string) ($_SERVER['HTTP_HOST'] ?? 'localhost')));
// Send from an address on the site's own domain (required by most shared hosts);
// the visitor's address goes in Reply-To so "Reply" goes straight to them.
$from = (string) ($config['mail_from'] ?: "website@{$host}");

$subject = "Quote request — {$type} — {$name} ({$suburb})";
$body = implode("\n", [
    "New quote request from the website",
    str_repeat('-', 40),
    "Name:          {$name}",
    "Phone:         {$phone}",
    "Email:         {$email}",
    "Suburb/State:  {$suburb}, {$state}",
    "Enquiry type:  {$type}",
    '',
    'Message:',
    $message !== '' ? $message : '(none)',
    '',
    str_repeat('-', 40),
    'Sent ' . date('D j M Y, g:ia') . ' from ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
]);

$headers = implode("\r\n", [
    "From: Site Vision Website <{$from}>",
    "Reply-To: {$name} <{$email}>",
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: SiteVision',
]);

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$sent = @mail($to, $encodedSubject, $body, $headers, '-f' . $from);

if (!$sent) {
    error_log('Quote mail() failed for ' . $email);
    sv_json(['error' => 'mail_failed'], 502);
}
sv_json(['ok' => true]);
