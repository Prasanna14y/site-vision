import { createFileRoute } from "@tanstack/react-router";
import { ASSISTANT_SYSTEM } from "../../lib/assistant.server";

// Build-time only: the static (HostGator) build pre-renders this so the PHP
// chat endpoint can use the same instructions. scripts/finish-static.mjs moves
// it into the private api/lib/ folder. Not served anywhere else.
export const Route = createFileRoute("/api/assistant-prompt.txt")({
  server: {
    handlers: {
      GET: async () =>
        process.env.STATIC === "1"
          ? new Response(ASSISTANT_SYSTEM, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
          : new Response("Not found", { status: 404 }),
    },
  },
});
