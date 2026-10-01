/* Site Vision chat assistant — framework-free so the same file runs on the
 * live site and inside the single-file client preview.
 * Config comes from <script type="application/json" id="sv-chat-config">:
 *   { endpoint: "/api/chat" | null, quoteUrl, phoneDisplay, phoneHref, faqs: [{q,a}] }
 * With an endpoint it asks the AI (POST /api/chat); if that's unavailable it
 * answers from the FAQ instead, so the widget always works. */
(function () {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
function init() {
  if (window.__svChat) return;
  window.__svChat = true;
  var cfgEl = document.getElementById("sv-chat-config");
  if (!cfgEl) return;
  var cfg;
  try { cfg = JSON.parse(cfgEl.textContent || "{}"); } catch (e) { return; }
  var faqs = cfg.faqs || [];
  var aiAvailable = !!cfg.endpoint;
  var history = []; // [{role, content}] sent to the AI
  var busy = false;

  var RED = "#DF2227", INK = "#1A1A1A";
  var css = "" +
    ".svc-btn{position:fixed;right:16px;bottom:84px;z-index:45;width:58px;height:58px;border-radius:50%;background:" + RED + ";color:#fff;border:0;box-shadow:0 8px 24px rgba(0,0,0,.25);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .2s}" +
    ".svc-btn:hover{transform:scale(1.06)}" +
    ".svc-btn:focus-visible{outline:2px solid " + INK + ";outline-offset:3px}" +
    ".svc-pulse{position:absolute;inset:0;border-radius:50%;box-shadow:0 0 0 0 rgba(223,34,39,.5);animation:svc-pulse 2.4s infinite}" +
    "@keyframes svc-pulse{70%{box-shadow:0 0 0 16px rgba(223,34,39,0)}100%{box-shadow:0 0 0 0 rgba(223,34,39,0)}}" +
    "@media (min-width:1024px){.svc-btn{bottom:24px;right:24px}.svc-panel{bottom:96px!important;right:24px!important}}" +
    ".svc-panel{position:fixed;right:12px;left:12px;bottom:150px;z-index:46;max-width:380px;margin-left:auto;height:min(560px,calc(100dvh - 180px));background:#fff;border:1px solid #E5E5E5;box-shadow:0 20px 50px rgba(0,0,0,.25);display:none;flex-direction:column;font-family:inherit}" +
    ".svc-panel.open{display:flex;animation:svc-in .2s ease-out}" +
    "@keyframes svc-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}" +
    ".svc-head{background:" + INK + ";color:#fff;padding:14px 16px;display:flex;align-items:center;gap:10px}" +
    ".svc-head b{font-size:15px;display:block}.svc-head small{font-size:11px;color:rgba(255,255,255,.6)}" +
    ".svc-dot{width:9px;height:9px;border-radius:50%;background:#22c55e;flex-shrink:0}" +
    ".svc-x{margin-left:auto;background:none;border:0;color:#fff;font-size:22px;line-height:1;cursor:pointer;padding:4px}" +
    ".svc-body{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:#F7F7F7}" +
    ".svc-msg{max-width:85%;padding:10px 12px;font-size:14px;line-height:1.45;white-space:pre-wrap;word-wrap:break-word}" +
    ".svc-bot{background:#fff;border:1px solid #E5E5E5;color:" + INK + ";align-self:flex-start}" +
    ".svc-me{background:" + RED + ";color:#fff;align-self:flex-end}" +
    ".svc-typing{color:#888;font-size:13px;align-self:flex-start}" +
    ".svc-chips{display:flex;flex-wrap:wrap;gap:6px}" +
    ".svc-chip{border:1px solid #DDD;background:#fff;color:" + INK + ";font-size:12px;padding:6px 10px;cursor:pointer;text-align:left}" +
    ".svc-chip:hover{border-color:" + RED + ";color:" + RED + "}" +
    ".svc-actions{display:flex;gap:6px;flex-wrap:wrap}" +
    ".svc-act{font-size:12px;font-weight:600;padding:7px 10px;text-decoration:none;border:1px solid " + INK + ";color:" + INK + ";background:#fff}" +
    ".svc-act.red{background:" + RED + ";border-color:" + RED + ";color:#fff}" +
    ".svc-form{display:flex;border-top:1px solid #E5E5E5}" +
    ".svc-form input{flex:1;border:0;padding:14px;font-size:14px;outline:none;font-family:inherit;min-width:0}" +
    ".svc-form button{border:0;background:" + RED + ";color:#fff;padding:0 16px;font-weight:600;cursor:pointer}" +
    ".svc-form button:disabled{opacity:.5}" +
    ".svc-note{font-size:10px;color:#888;padding:6px 12px;background:#fff;border-top:1px solid #F0F0F0}" +
    "@media (prefers-reduced-motion:reduce){.svc-pulse{animation:none}.svc-panel.open{animation:none}}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  var btn = el("button", "svc-btn");
  btn.setAttribute("aria-label", "Chat with Site Vision");
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = '<span class="svc-pulse" aria-hidden="true"></span><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

  var panel = el("div", "svc-panel");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Site Vision assistant");
  var head = el("div", "svc-head");
  var titleWrap = el("div");
  titleWrap.appendChild(el("b", null, "Site Vision Assistant"));
  var subtitle = el("small", null, aiAvailable ? "AI assistant · replies instantly" : "Instant answers");
  titleWrap.appendChild(subtitle);
  head.appendChild(el("span", "svc-dot"));
  head.appendChild(titleWrap);
  var close = el("button", "svc-x", "×");
  close.setAttribute("aria-label", "Close chat");
  head.appendChild(close);
  var body = el("div", "svc-body");
  body.setAttribute("aria-live", "polite");
  var form = el("form", "svc-form");
  var input = el("input");
  input.type = "text";
  input.placeholder = "Ask about cameras, alarms, Solar Cam hire…";
  input.setAttribute("aria-label", "Your question");
  input.maxLength = 800;
  var send = el("button", null, "Send");
  send.type = "submit";
  form.appendChild(input);
  form.appendChild(send);
  var note = el("div", "svc-note", "Answers are a guide only — our team will confirm details in your quote.");
  panel.appendChild(head);
  panel.appendChild(body);
  panel.appendChild(form);
  panel.appendChild(note);
  document.body.appendChild(panel);
  document.body.appendChild(btn);

  function scroll() { body.scrollTop = body.scrollHeight; }
  function bot(text) { var m = el("div", "svc-msg svc-bot", text); body.appendChild(m); scroll(); return m; }
  function me(text) { body.appendChild(el("div", "svc-msg svc-me", text)); scroll(); }
  function actions() {
    var a = el("div", "svc-actions");
    var q = el("a", "svc-act red", "Get a free quote");
    q.href = cfg.quoteUrl || "/quote";
    a.appendChild(q);
    if (cfg.phoneHref) {
      var c = el("a", "svc-act", "Call " + cfg.phoneDisplay);
      c.href = cfg.phoneHref;
      a.appendChild(c);
    }
    body.appendChild(a);
    scroll();
  }
  function chips(list) {
    var wrap = el("div", "svc-chips");
    list.forEach(function (text) {
      var c = el("button", "svc-chip", text);
      c.type = "button";
      c.addEventListener("click", function () { wrap.remove(); ask(text); });
      wrap.appendChild(c);
    });
    body.appendChild(wrap);
    scroll();
  }

  // FAQ fallback: best keyword overlap between the question and each FAQ.
  var STOP = "a an the and or of to in on for is are do does i my me we you your can how what with it at be this that have has there their our about".split(" ");
  function words(s) {
    return (s.toLowerCase().match(/[a-z0-9+]+/g) || []).filter(function (w) { return w.length > 2 && STOP.indexOf(w) < 0; });
  }
  function faqAnswer(question) {
    var qw = words(question), best = null, bestScore = 0;
    faqs.forEach(function (f) {
      var fw = words(f.q + " " + f.q + " " + f.a), score = 0;
      qw.forEach(function (w) {
        fw.forEach(function (x) { if (x === w || (w.length > 4 && x.indexOf(w.slice(0, 5)) === 0)) score++; });
      });
      if (score > bestScore) { bestScore = score; best = f; }
    });
    return bestScore >= 2 ? best.a : null;
  }

  function ask(text) {
    if (busy) return;
    text = text.trim();
    if (!text) return;
    me(text);
    history.push({ role: "user", content: text });
    if (history.length > 12) history = history.slice(-11); // keep it short; must start with a user turn
    while (history.length && history[0].role !== "user") history.shift();

    if (!aiAvailable) return reply(fallback(text));
    busy = true;
    send.disabled = true;
    var typing = el("div", "svc-typing", "Typing…");
    body.appendChild(typing);
    scroll();
    fetch(cfg.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history }),
    })
      .then(function (r) {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then(function (d) {
        if (!d || !d.reply) throw new Error("empty");
        reply(d.reply, true);
      })
      .catch(function () {
        aiAvailable = false; // switch to FAQ answers for the rest of the visit
        subtitle.textContent = "Instant answers";
        reply(fallback(text));
      })
      .then(function () {
        typing.remove();
        busy = false;
        send.disabled = false;
      });
  }

  function fallback(text) {
    return faqAnswer(text) ||
      "Good question — our team can answer that properly. Request a free quote or give us a call" +
      (cfg.phoneDisplay ? " on " + cfg.phoneDisplay : "") + ".";
  }

  function reply(text, fromAi) {
    bot(text);
    history.push({ role: "assistant", content: text });
    if (!fromAi || /quote|call/i.test(text)) actions();
  }

  var started = false;
  function open() {
    panel.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
    if (!started) {
      started = true;
      bot("Hi! I'm the Site Vision assistant. Ask me about security cameras, alarms, Solar Cam hire, or buying equipment.");
      chips(["How does Solar Cam hire work?", "Do you do homes and businesses?", "What are AI cameras?", "What areas do you cover?"]);
    }
    setTimeout(function () { input.focus(); }, 50);
  }
  function shut() {
    panel.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
    btn.focus();
  }
  btn.addEventListener("click", function () { panel.classList.contains("open") ? shut() : open(); });
  close.addEventListener("click", shut);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && panel.classList.contains("open")) shut(); });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var t = input.value;
    input.value = "";
    ask(t);
  });
}
})();
