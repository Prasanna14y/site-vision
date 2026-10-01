"""Export the running dev site (localhost:5317) as ONE self-contained HTML file.

Every page becomes a <section> shown via CSS :target, so links work offline
with no server. CSS (from `vite build`) and images are inlined; a tiny script
restores the mobile menu and the email-based quote form.

Usage: npx vite build && python3 scripts/export-single-html.py
"""
import base64, glob, html, re, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "http://localhost:5317"
OUT = ROOT / "preview" / "Site-Vision-Security-Preview.html"

PAGES = [
    "/services", "/products", "/solar-cam", "/industries/residential",
    "/industries/commercial", "/industries/construction", "/industries/farm",
    "/about", "/contact", "/quote", "/privacy",
    "/",  # home last: it's the default page when nothing is targeted
]


def page_id(path: str) -> str:
    return "page-home" if path == "/" else "page-" + path.strip("/").replace("/", "-")


def fetch(path: str) -> str:
    return urllib.request.urlopen(BASE + path).read().decode()


def data_uri(path: Path, mime: str) -> str:
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()


def between(s: str, start: str, end: str) -> str:
    a = s.index(start)
    b = s.index(end, a)
    return s[a : b + len(end)]


def rewrite_links(s: str) -> str:
    def repl(m):
        href = m.group(1)
        path = href.split("#")[0].split("?")[0] or "/"
        if path == "/industries":
            path = "/services"
        if path in PAGES:
            return f'href="#{page_id(path)}"'
        return m.group(0)

    s = re.sub(r'href="(/[^"]*)"', repl, s)
    return s


def main():
    css = Path(glob.glob(str(ROOT / "dist/client/assets/styles-*.css"))[0]).read_text()
    home = fetch("/")

    header = between(home, "<header", "</header>")
    footer = between(home, "<footer", "</footer>")
    action_bar = home[home.index("</footer>") :]
    action_bar = between(action_bar, '<div class="lg:hidden fixed bottom-0', "</a></div>")
    ld = re.findall(r'<script type="application/ld\+json">.*?</script>', home)[:1]

    sections = []
    for path in PAGES:
        doc = fetch(path)
        main = re.search(r'<main id="main"[^>]*>(.*)</main>', doc, re.S).group(1)
        # drop per-page structured data duplicates inside main
        main = re.sub(r'<script type="application/ld\+json">.*?</script>', "", main)
        title = html.unescape(re.search(r"<title>(.*?)</title>", doc).group(1))
        sections.append(
            f'<section id="{page_id(path)}" class="page {page_id(path)}" data-title="{html.escape(title)}">{main}</section>'
        )

    body = header + '<main id="main" class="flex-1 pt-16 md:pt-20">' + "".join(sections) + "</main>" + footer
    splash = ""
    m = re.search(r'<div data-splash="[^"]*".*?</p><span[^>]*></span></div></div>', body, re.S)
    if m:
        splash = m.group(0)
        body = body.replace(splash, "")
    body = rewrite_links(body)
    action_bar = rewrite_links(action_bar)
    header_note = ""

    # inline images — single-file export embeds each photo once (WebP only;
    # every current browser supports it), so drop the <source> + JPEG fallback.
    body = re.sub(r'<source srcSet="(/assets/[^"]+\.webp)" type="image/webp"/>', "", body)
    body = re.sub(r'src="(/assets/(?:solar|photos)/[^"]+)\.jpg"', r'src="\1.webp"', body)
    body = body.replace('src="/assets/hero-security-cam.jpg"', 'src="/assets/hero-security-cam.webp"')
    assets = ROOT / "public" / "assets"
    body = body.replace("/assets/hero-security-cam.webp", data_uri(assets / "hero-security-cam.webp", "image/webp"))
    body = body.replace("/assets/hero-security-cam.jpg", data_uri(assets / "hero-security-cam.jpg", "image/jpeg"))
    for p in sorted((assets / "photos").glob("*")) if (assets / "photos").exists() else []:
        mime = "image/webp" if p.suffix == ".webp" else "image/jpeg"
        body = body.replace(f"/assets/photos/{p.name}", data_uri(p, mime))
    for p in sorted(x for x in (assets / "solar").rglob("*") if x.is_file() and x.suffix == ".webp"):
        rel = p.relative_to(assets).as_posix()
        body = body.replace(f"/assets/{rel}", data_uri(p, "image/webp"))
    for name in ("main.svg", "main-on-dark.svg"):
        body = body.replace(f"/assets/logo/{name}", data_uri(assets / "logo" / name, "image/svg+xml"))
    body = body.replace('src="/assets/favicon.svg"', f'src="{data_uri(assets / "favicon.svg", "image/svg+xml")}"')
    favicon = data_uri(assets / "favicon.svg", "image/svg+xml")

    page_css = """
.page{display:none}
.page-home{display:block}
.page:target{display:block}
.page:target ~ .page-home{display:none}
.page{scroll-margin-top:0}
"""

    script = """
<script>
// Mobile menu
(function(){
  var btn=document.querySelector('[aria-controls="mobile-menu"]');
  var menu=document.getElementById('mobile-menu');
  if(btn&&menu){
    btn.addEventListener('click',function(){
      var open=menu.classList.toggle('max-h-[560px]');
      menu.classList.toggle('max-h-0',!open);
      btn.setAttribute('aria-expanded',open);
    });
    menu.addEventListener('click',function(e){
      if(e.target.closest('a')){menu.classList.remove('max-h-[560px]');menu.classList.add('max-h-0');btn.setAttribute('aria-expanded','false');}
    });
  }
  // Scroll to top on page change + update title
  function onNav(){
    var id=location.hash.slice(1)||'page-home';
    var el=document.getElementById(id);
    if(el&&el.classList.contains('page')){window.scrollTo(0,0);document.title=el.dataset.title;}
  }
  window.addEventListener('hashchange',onNav);onNav();
  // In-page anchors (e.g. product categories, skip link): scroll, don't switch page
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href^="#"]');if(!a)return;
    var el=document.getElementById(a.getAttribute('href').slice(1));
    if(el&&!el.classList.contains('page')){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});}
  });
  // Count-up numbers (mirrors src/components/CountUp.tsx)
  if(('IntersectionObserver' in window)&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    var cio=new IntersectionObserver(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return;cio.unobserve(e.target);
      var el=e.target,to=+el.dataset.count,suf=el.dataset.suffix||'',t0=performance.now();
      (function tick(now){var t=Math.min(1,(now-t0)/1400);el.textContent=Math.round(to*(1-Math.pow(1-t,3)))+suf;if(t<1)requestAnimationFrame(tick);})(t0);
    });},{threshold:0.4});
    document.querySelectorAll('[data-count]').forEach(function(el){el.textContent='0'+(el.dataset.suffix||'');cio.observe(el);});
  }
  // Splash: tap to skip (timing itself is pure CSS)
  var sp=document.querySelector('[data-splash]');
  if(sp)sp.addEventListener('click',function(){sp.classList.add('splash-skip');});
  // Scroll reveal (mirrors src/lib/reveal.ts), re-run per page
  var KF=[{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'none'}];
  var io=('IntersectionObserver' in window)&&!matchMedia('(prefers-reduced-motion: reduce)').matches
    ? new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.unobserve(e.target);e.target.animate(KF,{duration:700,delay:+(e.target.dataset.rd||0),easing:'cubic-bezier(0.22,1,0.36,1)',fill:'backwards'});});},{rootMargin:'0px 0px -6% 0px',threshold:0.01})
    : null;
  function reveal(){
    if(!io)return;
    var id=location.hash.slice(1)||'page-home';var page=document.getElementById(id);
    if(!page||!page.classList.contains('page'))page=document.getElementById('page-home');
    page.querySelectorAll('section:not([data-logo-intro]) .content-container > *').forEach(function(el){
      var grid=/\bgrid\b/.test(el.className)&&el.children.length>1;
      var items=grid?[].slice.call(el.children):[el];
      items.forEach(function(it,i){if(it.dataset.rv||it.getBoundingClientRect().top<innerHeight)return;it.dataset.rv=1;if(grid)it.dataset.rd=Math.min(i,6)*70;io.observe(it);});
    });
  }
  addEventListener('hashchange',function(){requestAnimationFrame(reveal);});requestAnimationFrame(reveal);
  // Quote form -> pre-filled email
  var form=document.querySelector('#page-quote form');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      function f(id){var x=form.elements.namedItem(id);return x?String(x.value).trim():'';}
      var body=['Name: '+f('name'),'Phone: '+f('phone'),'Email: '+f('email'),'Suburb: '+f('suburb')+', '+f('state'),'Enquiry type: '+f('enquiryType'),'',f('message')].join('\\n');
      var subject='Quote request — '+f('enquiryType')+' — '+f('name')+' ('+f('suburb')+')';
      location.href='mailto:%EMAIL%?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    });
  }
})();
</script>"""
    email = re.search(r'mailto:([^"?]+)"', footer).group(1)

    # Chat assistant: no server in the single file, so it answers from the FAQ.
    import json as _json
    chat_cfg = _json.loads(re.search(r'<script type="application/json" id="sv-chat-config">(.*?)</script>', home, re.S).group(1))
    chat_cfg.update(endpoint=None, quoteUrl="#page-quote")
    chat_js = (assets / "chat-widget.js").read_text()
    chat = ('<script type="application/json" id="sv-chat-config">' + _json.dumps(chat_cfg).replace("<", "\\u003c") + "</script>"
            + "<script>" + chat_js + "</script>")
    script = script.replace("%EMAIL%", email)

    out = f"""<!DOCTYPE html>
<html lang="en" style="color-scheme:light">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Site Vision Security — Melbourne Security Systems & Monitoring</title>
<meta name="description" content="Website preview — Site Vision Security"/>
<link rel="icon" href="{favicon}"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/>
<style>{css}{page_css}</style>
{''.join(ld)}
</head>
<body class="bg-white text-[#1A1A1A] font-body antialiased">
{splash}
<a href="#main" class="skip-link">Skip to content</a>
<div class="flex flex-col min-h-dvh pb-16 lg:pb-0">{body}</div>
{action_bar}
{script}
{chat}
</body>
</html>"""
    OUT.write_text(out)
    print(OUT, f"{len(out)/1024:.0f} KB")


main()
