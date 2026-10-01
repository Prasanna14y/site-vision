import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import {
  higgsfieldDesignInspectorVitePlugin,
  higgsfieldDesignSourceBabelPlugin,
} from "./src/module/design-inspector/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";


// Every public page (and the generated text files) for the static build.
const STATIC_PAGES = [
  "/", "/services", "/products", "/solar-cam", "/about", "/contact", "/quote", "/privacy",
  "/industries/residential", "/industries/commercial", "/industries/construction", "/industries/farm",
  "/sitemap.xml", "/robots.txt",
  "/api/assistant-prompt.txt", // moved into api/lib/ (private) by scripts/finish-static.mjs
];

export default defineConfig(({ mode, command }) => {
  const designInspectorEnabled = process.env.HF_DESIGN_INSPECTOR === "1" || mode === "design";

  return {
    // true in the HostGator build — the site then talks to the PHP endpoints.
    define: { __STATIC_BUILD__: JSON.stringify(process.env.STATIC === "1") },
    // The server bundle runs as a Cloudflare Worker — there is no node_modules
    // at runtime. Vite's default SSR build leaves npm deps as bare external
    // imports (h3, react, @tanstack/*, seroval, …), which resolve on a Node
    // server but throw "No such module" in a Worker. Bundle them all in.
    // (node: builtins stay external — nodejs_compat provides them.)
    // Local dev runs SSR in Node, where bundling CJS deps (react) breaks — only
    // force-bundle for the Worker build.
    ssr: {
      noExternal: command === "build" ? true : undefined,
      // `cloudflare:workers` is a workerd runtime built-in that exposes the Worker
      // env / bindings (D1 `DB`, R2 `STORAGE`). Like node: builtins it must NOT be
      // bundled; the runtime provides it. (`ssr.external` is typed string[].)
      external: ["cloudflare:workers"],
    },
    build: {
      // Keep `cloudflare:*` external in the SSR rollup pass too — `noExternal`
      // above would otherwise try to resolve+bundle it and fail.
      rollupOptions: { external: [/^cloudflare:/] },
    },
    plugins: [
      // TanStack Start plugin must run before React's plugin.
      //
      // SSR build: `vite build` emits a Workers-shaped server bundle
      // (dist/server/server.js — `export default { fetch }`) plus dist/client
      // (hashed static assets). The platform publishes that as a per-tenant
      // Worker on Workers for Platforms, served at <sub>.higgsfield.app/ (host
      // root, so Vite's default base "/" — no base-path juggling).
      //
      // Rendering happens on the server per request, so site code must be
      // SSR-safe: never touch browser-only globals (window, document,
      // localStorage, navigator) during render or at module top level — only
      // inside effects/handlers, or guarded with `typeof window !== "undefined"`.
      tanstackStart({
        server: { entry: "server" },
        // STATIC=1 (npm run build:static): pre-render every page to plain HTML
        // for shared hosting such as HostGator — upload dist/client to public_html.
        ...(process.env.STATIC === "1"
          ? {
              pages: STATIC_PAGES.map((path) => ({ path })),
              prerender: {
                enabled: true,
                crawlLinks: false,
                autoSubfolderIndex: true,
                failOnError: true,
              },
            }
          : {}),
      }),
      higgsfieldDesignInspectorVitePlugin(designInspectorEnabled),
      react({
        babel: {
          plugins: designInspectorEnabled ? [higgsfieldDesignSourceBabelPlugin] : [],
        },
      }),
      tailwindcss(),
      tsconfigPaths(),
    ],
  };
});
