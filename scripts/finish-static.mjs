// Finishes the static build (npm run build:static) for Apache shared hosting
// such as HostGator: adds .htaccess, 404.html and the PHP endpoints (api/) to
// dist/client and zips it to deploy/site-vision-hostgator.zip. Upload/extract
// that zip into public_html; put sitevision-config.php one level above it.
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "dist", "client");

const htaccess = `# Site Vision Security — Apache config for the static site
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On

  # Force HTTPS
  RewriteCond %{HTTPS} !=on
  RewriteCond %{HTTP:X-Forwarded-Proto} !=https
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Old Industries overview now lives on Services
  RewriteRule ^industries/?$ /services [L,R=301]

  # Old site's quote page
  RewriteRule ^request-pricing/?$ /quote [L,R=301]

  # Serve /page as /page/index.html without a trailing-slash redirect
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME}/index.html -f
  RewriteRule ^(.+?)/?$ $1/index.html [L]
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
  # Hashed build files never change; cache them for a year
  <FilesMatch "-[A-Za-z0-9_-]{8}\\.(js|css)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 30 days"
  ExpiresByType image/jpeg "access plus 30 days"
  ExpiresByType image/png "access plus 30 days"
  ExpiresByType image/svg+xml "access plus 30 days"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml text/plain application/xml
</IfModule>
`;
writeFileSync(path.join(out, ".htaccess"), htaccess);

// 404 page: the pre-rendered home page shell would hydrate into the home
// route, so use a small standalone page in the site's style instead.
const css = readFileSync(path.join(out, "index.html"), "utf8").match(/href="(\/assets\/styles-[^"]+\.css)"/)?.[1] ?? "";
writeFileSync(
  path.join(out, "404.html"),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found — Site Vision Security</title><meta name="robots" content="noindex">
<link rel="icon" href="/assets/favicon.svg">${css ? `<link rel="stylesheet" href="${css}">` : ""}</head>
<body class="bg-white text-[#1A1A1A] font-body antialiased">
<div class="flex min-h-dvh items-center justify-center px-4"><div class="max-w-md text-center">
<img src="/assets/favicon.svg" alt="Site Vision Security" class="w-20 h-20 mx-auto mb-6">
<h1 class="text-5xl font-bold font-display tracking-tight mb-3">404</h1>
<p class="text-[#4A4A4A] mb-6">This page isn't being monitored. Let's get you back somewhere secure.</p>
<a href="/" class="btn-pill">Go Home</a></div></div></body></html>`,
);

// PHP endpoints for shared hosting: api/chat.php (AI chat) + api/quote.php (email).
const php = path.join(root, "php");
if (!existsSync(path.join(php, "lib", "vendor", "autoload.php"))) {
  console.log("Installing PHP dependencies (composer)…");
  execFileSync("composer", ["install", "--no-dev", "--optimize-autoloader", "-q"], { cwd: php, stdio: "inherit" });
}
const api = path.join(out, "api");
for (const file of ["chat.php", "quote.php"]) cpSync(path.join(php, file), path.join(api, file));
for (const file of ["bootstrap.php", ".htaccess"]) cpSync(path.join(php, "lib", file), path.join(api, "lib", file));
cpSync(path.join(php, "lib", "vendor"), path.join(api, "lib", "vendor"), { recursive: true });
// The assistant's instructions, pre-rendered from src/lib/assistant.server.ts — keep it private.
renameSync(path.join(api, "assistant-prompt.txt"), path.join(api, "lib", "assistant-prompt.txt"));

const deployDir = path.join(root, "deploy");
mkdirSync(deployDir, { recursive: true });
const zip = path.join(deployDir, "site-vision-hostgator.zip");
rmSync(zip, { force: true });
execFileSync("zip", ["-qr", zip, ".", "-x", ".DS_Store", "*/.DS_Store"], { cwd: out });
cpSync(path.join(php, "sitevision-config.example.php"), path.join(deployDir, "sitevision-config.example.php"));
console.log(`Static site ready: ${path.relative(root, out)}/  →  ${path.relative(root, zip)}`);
