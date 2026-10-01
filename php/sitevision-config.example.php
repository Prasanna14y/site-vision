<?php
// Site Vision — server settings for the PHP chat assistant and quote form.
//
// 1. Copy this file to   sitevision-config.php
// 2. Put it in your cPanel HOME folder — one level ABOVE public_html,
//    e.g. /home/<cpanel-user>/sitevision-config.php — so it can never be downloaded.
// 3. Fill in the values below.
return [
    // Anthropic API key from https://console.anthropic.com (Settings → API keys).
    // Leave empty to keep the chat in FAQ-only mode.
    'anthropic_api_key' => '',

    // Where quote requests are emailed.
    'quote_to' => 'info@sitevision.au',

    // Sender address — must be an email on this website's domain
    // (create it in cPanel → Email Accounts if needed). Empty = website@<domain>.
    'mail_from' => '',
];
