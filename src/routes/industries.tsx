import { createFileRoute, redirect } from "@tanstack/react-router";

// The old Industries overview now lives on the Services page.
export const Route = createFileRoute("/industries")({
  beforeLoad: () => {
    throw redirect({ to: "/services", statusCode: 301 });
  },
});
