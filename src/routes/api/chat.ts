import { createFileRoute } from "@tanstack/react-router";
import Anthropic from "@anthropic-ai/sdk";
import { ASSISTANT_SYSTEM } from "../../lib/assistant.server";

// POST /api/chat — the website chat assistant.
// Body: { messages: { role: "user" | "assistant"; content: string }[] }
// Needs ANTHROPIC_API_KEY set as a server secret; without it this returns 503
// and the widget falls back to answering from the FAQ.

const MAX_TURNS = 12;
const MAX_CHARS_PER_MESSAGE = 800;

type ChatTurn = { role: "user" | "assistant"; content: string };

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

function parseTurns(body: unknown): ChatTurn[] | null {
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_TURNS) return null;
  const turns: ChatTurn[] = [];
  for (const [i, m] of raw.entries()) {
    const role = (m as ChatTurn)?.role;
    const content = (m as ChatTurn)?.content;
    const expected = i % 2 === 0 ? "user" : "assistant"; // must alternate, starting with the visitor
    if (role !== expected || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_CHARS_PER_MESSAGE);
    if (!text) return null;
    turns.push({ role, content: text });
  }
  return turns[turns.length - 1].role === "user" ? turns : null;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Only accept calls from this site's own pages.
        const origin = request.headers.get("origin");
        if (origin && new URL(origin).host !== new URL(request.url).host) {
          return json({ error: "forbidden" }, 403);
        }

        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) return json({ error: "not_configured" }, 503);

        let turns: ChatTurn[] | null = null;
        try {
          turns = parseTurns(await request.json());
        } catch {
          turns = null;
        }
        if (!turns) return json({ error: "bad_request" }, 400);

        const client = new Anthropic({ apiKey });
        try {
          const response = await client.beta.messages.create({
            model: "claude-opus-5-5",
            max_tokens: 1024, // replies are deliberately short (2–4 sentences)
            output_config: { effort: "low" },
            betas: ["server-side-fallback-2026-07-01"],
            fallbacks: "default",
            system: [{ type: "text", text: ASSISTANT_SYSTEM, cache_control: { type: "ephemeral" } }],
            messages: turns,
          });

          if (response.stop_reason === "refusal") {
            return json({ reply: "Sorry, I can't help with that one. For anything security-related, give our team a call or request a free quote." });
          }
          const reply = response.content
            .flatMap((b) => (b.type === "text" ? [b.text] : []))
            .join("\n")
            .trim();
          return json({ reply: reply || "Sorry, I didn't catch that — could you rephrase?" });
        } catch (error) {
          if (error instanceof Anthropic.RateLimitError) return json({ error: "busy" }, 429);
          if (error instanceof Anthropic.APIError) {
            console.error(`Chat API error ${error.status}:`, error.message);
            return json({ error: "upstream" }, 502);
          }
          console.error("Chat error:", error);
          return json({ error: "upstream" }, 502);
        }
      },
    },
  },
});
