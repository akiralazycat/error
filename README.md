# Error Studio

A recovery-first error page design tool. Error Studio treats failure states as part of the product rather than a dead end: choose the failure, shape the message, decide what technical context is safe to expose, preview the result, then export a portable implementation.

## What makes it different

- **Failure-aware presets** — 404, 403, 500, 503, offline and rate-limit states start with different recovery copy instead of one generic template.
- **Recovery-first editing** — primary and secondary actions are designed alongside the message.
- **Exposure controls** — deliberately choose whether reassurance, support references and secondary recovery are public.
- **Four compositions** — Quiet, Signal, Editorial and Terminal cover product, service-status and technical contexts without becoming novelty error pages.
- **Live desktop/mobile + light/dark preview** — the page is evaluated as an actual state, not a thumbnail.
- **Recovery Score** — a lightweight check for message clarity, action presence and useful support context.
- **Portable export** — copy Next.js, standalone HTML or a structured JSON manifest. The generated page does not depend on Error Studio.
- **Local persistence** — edits are kept in localStorage; no account or backend is required.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Design principle

A useful error page should answer three questions, in order:

1. What happened?
2. What is still safe?
3. What can I do next?

Avoid leaking stack traces, internal service names, filesystem paths, personal data or opaque diagnostic blobs. A short support-safe reference ID is usually more useful to the person seeing the page and to the team investigating the incident.

## Stack

Next.js 16 · React 19 · TypeScript · plain CSS. No UI runtime dependency.
