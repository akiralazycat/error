"use client";

import { useEffect, useMemo, useState } from "react";
import { HouseBar } from "@/components/house-bar";
import {
  ERROR_PRESETS,
  LAYOUTS,
  TONES,
  createInitialState,
  getPreset,
  type StudioState,
} from "@/lib/presets";

type Device = "desktop" | "mobile";
type ExportMode = "next" | "html" | "json";

type IconName =
  | "arrow-left"
  | "arrow-right"
  | "check"
  | "code"
  | "copy"
  | "desktop"
  | "moon"
  | "refresh"
  | "spark"
  | "sun"
  | "mobile";

function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    "arrow-left": <><path d="m15 18-6-6 6-6" /><path d="M21 12H9" /></>,
    "arrow-right": <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    code: <><path d="m8 9-3 3 3 3" /><path d="m16 9 3 3-3 3" /><path d="m14 5-4 14" /></>,
    copy: <><rect width="13" height="13" x="9" y="9" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>,
    desktop: <><rect width="20" height="14" x="2" y="3" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></>,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />,
    refresh: <><path d="M20 11a8.1 8.1 0 0 0-15.5-2M4 4v5h5" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2M20 20v-5h-5" /></>,
    spark: <path d="m12 3-1.7 4.3L6 9l4.3 1.7L12 15l1.7-4.3L18 9l-4.3-1.7L12 3Z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></>,
    mobile: <><rect width="12" height="20" x="6" y="2" rx="2" /><path d="M11 18h2" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      {paths[name]}
    </svg>
  );
}

function Toggle({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="toggle-row">
      <span>{label}</span>
      <input
        checked={checked}
        className="sr-only"
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <span aria-hidden="true" className={`toggle ${checked ? "is-on" : ""}`}>
        <span />
      </span>
    </label>
  );
}

function ErrorPreview({ state }: { state: StudioState }) {
  const preset = getPreset(state.presetId);
  const technical = state.tone === "technical";
  const warm = state.tone === "warm";

  return (
    <article
      className={`error-canvas layout-${state.layout} tone-${state.tone} ${state.dark ? "theme-dark" : "theme-light"}`}
      style={{ "--error-accent": preset.accent } as React.CSSProperties}
    >
      <div className="canvas-noise" />
      <div className="error-topline">
        <span className="preview-brand">northstar</span>
        <span className="status-pill">
          <span className="status-dot" />
          {preset.code}
        </span>
      </div>

      <div className="error-composition">
        {state.layout === "signal" ? (
          <div aria-hidden="true" className="signal-orbit">
            <span />
            <span />
            <span />
          </div>
        ) : null}

        {state.layout === "terminal" ? (
          <div className="terminal-line" aria-hidden="true">
            <span>system/error</span>
            <span>{preset.code}</span>
            <span>{state.reference || "NO-REF"}</span>
          </div>
        ) : null}

        <div className="error-copy">
          <p className="error-eyebrow">{technical ? `HTTP / ${preset.code}` : preset.eyebrow}</p>
          <h1>{state.title}</h1>
          <p className="error-body">
            {state.body}
            {warm ? " We’ll help you find a way forward." : ""}
          </p>

          <div className="error-actions">
            <button className="preview-primary" type="button">
              {state.primary}
              <Icon name="arrow-right" size={15} />
            </button>
            {state.showSecondary ? (
              <button className="preview-secondary" type="button">
                {state.secondary}
              </button>
            ) : null}
          </div>

          {state.showNote || state.showReference ? (
            <div className="error-meta">
              {state.showNote ? <span>{state.note}</span> : <span />}
              {state.showReference ? <code>{state.reference}</code> : null}
            </div>
          ) : null}
        </div>

        <div className="error-code-mark" aria-hidden="true">
          {preset.code}
        </div>
      </div>

      <div className="error-footer">
        <span>Help</span>
        <span>Status</span>
        <span>© 2026 Northstar</span>
      </div>
    </article>
  );
}

function jsx(value: string) {
  return JSON.stringify(value);
}

function html(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildNextCode(state: StudioState) {
  const preset = getPreset(state.presetId);
  return `"use client";

export default function ErrorPage() {
  return (
    <main style={styles.page}>
      <nav style={styles.nav}>
        <strong>northstar</strong>
        <span>${preset.code}</span>
      </nav>
      <section style={styles.content}>
        <p style={styles.eyebrow}>${html(preset.eyebrow)}</p>
        <h1 style={styles.title}>{${jsx(state.title)}}</h1>
        <p style={styles.body}>{${jsx(state.body)}}</p>
        <div style={styles.actions}>
          <button style={styles.primary} onClick={() => location.assign("/")}>
            {${jsx(state.primary)}}
          </button>${state.showSecondary ? `
          <button style={styles.secondary} onClick={() => history.back()}>
            {${jsx(state.secondary)}}
          </button>` : ""}
        </div>${state.showNote ? `
        <p style={styles.note}>{${jsx(state.note)}}</p>` : ""}${state.showReference ? `
        <code style={styles.reference}>{${jsx(state.reference)}}</code>` : ""}
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100dvh",
    padding: "32px clamp(24px, 5vw, 72px)",
    display: "grid",
    gridTemplateRows: "auto 1fr",
    background: ${jsx(state.dark ? "#0b0c0f" : "#f6f6f3")},
    color: ${jsx(state.dark ? "#f5f5f2" : "#151518")},
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
  },
  nav: { display: "flex", justifyContent: "space-between", fontSize: 14 },
  content: { alignSelf: "center", maxWidth: 680, paddingBottom: "8vh" },
  eyebrow: { color: ${jsx(preset.accent)}, fontSize: 13, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" as const },
  title: { margin: "18px 0", fontSize: "clamp(42px, 7vw, 88px)", lineHeight: .98, letterSpacing: "-.055em" },
  body: { maxWidth: 560, fontSize: 17, lineHeight: 1.65, opacity: .68 },
  actions: { display: "flex", gap: 10, marginTop: 32, flexWrap: "wrap" as const },
  primary: { border: 0, borderRadius: 999, padding: "13px 20px", background: ${jsx(state.dark ? "#f5f5f2" : "#151518")}, color: ${jsx(state.dark ? "#151518" : "#fff")}, fontWeight: 650, cursor: "pointer" },
  secondary: { border: ${jsx(state.dark ? "1px solid #323238" : "1px solid #d8d8d2")}, borderRadius: 999, padding: "13px 20px", background: "transparent", color: "inherit", fontWeight: 650, cursor: "pointer" },
  note: { marginTop: 28, fontSize: 13, opacity: .54 },
  reference: { display: "inline-block", marginTop: 10, fontSize: 12, opacity: .46 },
} satisfies Record<string, React.CSSProperties>;
`;
}

function buildHtmlCode(state: StudioState) {
  const preset = getPreset(state.presetId);
  const bg = state.dark ? "#0b0c0f" : "#f6f6f3";
  const fg = state.dark ? "#f5f5f2" : "#151518";
  const secondaryBorder = state.dark ? "#323238" : "#d8d8d2";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${html(preset.code)} · ${html(state.title)}</title>
  <style>
    *{box-sizing:border-box}body{margin:0;min-height:100vh;background:${bg};color:${fg};font-family:Inter,ui-sans-serif,system-ui,sans-serif;padding:32px clamp(24px,5vw,72px);display:grid;grid-template-rows:auto 1fr}nav{display:flex;justify-content:space-between;font-size:14px}.content{align-self:center;max-width:680px;padding-bottom:8vh}.eyebrow{color:${preset.accent};font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}h1{margin:18px 0;font-size:clamp(42px,7vw,88px);line-height:.98;letter-spacing:-.055em}p.body{max-width:560px;font-size:17px;line-height:1.65;opacity:.68}.actions{display:flex;gap:10px;margin-top:32px;flex-wrap:wrap}a{display:inline-block;border-radius:999px;padding:13px 20px;text-decoration:none;font-weight:650}.primary{background:${fg};color:${bg}}.secondary{border:1px solid ${secondaryBorder};color:inherit}.note{margin-top:28px;font-size:13px;opacity:.54}code{display:inline-block;margin-top:10px;font-size:12px;opacity:.46}
  </style>
</head>
<body>
  <nav><strong>northstar</strong><span>${html(preset.code)}</span></nav>
  <main class="content">
    <p class="eyebrow">${html(preset.eyebrow)}</p>
    <h1>${html(state.title)}</h1>
    <p class="body">${html(state.body)}</p>
    <div class="actions">
      <a class="primary" href="/">${html(state.primary)}</a>${state.showSecondary ? `
      <a class="secondary" href="${html(state.statusUrl || "/status")}">${html(state.secondary)}</a>` : ""}
    </div>${state.showNote ? `
    <p class="note">${html(state.note)}</p>` : ""}${state.showReference ? `
    <code>${html(state.reference)}</code>` : ""}
  </main>
</body>
</html>`;
}

export function ErrorStudio() {
  const [state, setState] = useState<StudioState>(() => createInitialState());
  const [device, setDevice] = useState<Device>("desktop");
  const [exportMode, setExportMode] = useState<ExportMode>("next");
  const [copied, setCopied] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("error-studio:v1");
      if (saved) setState({ ...createInitialState(), ...JSON.parse(saved) });
    } catch {
      // A corrupted or unavailable local store should never block the studio.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("error-studio:v1", JSON.stringify(state));
    } catch {
      // Persistence is a convenience, not a requirement.
    }
  }, [hydrated, state]);

  const preset = getPreset(state.presetId);
  const score = useMemo(() => {
    let value = 100;
    if (state.title.trim().length < 12) value -= 8;
    if (state.body.trim().length < 48) value -= 8;
    if (!state.primary.trim()) value -= 20;
    if (state.showReference && !state.reference.trim()) value -= 6;
    if (state.body.length > 220) value -= 5;
    return Math.max(0, value);
  }, [state]);

  const exportCode = useMemo(() => {
    if (exportMode === "next") return buildNextCode(state);
    if (exportMode === "html") return buildHtmlCode(state);
    return JSON.stringify(
      {
        status: preset.code,
        kind: preset.label,
        layout: state.layout,
        tone: state.tone,
        theme: state.dark ? "dark" : "light",
        message: {
          title: state.title,
          body: state.body,
          note: state.showNote ? state.note : null,
        },
        recovery: {
          primary: state.primary,
          secondary: state.showSecondary ? state.secondary : null,
          statusUrl: state.statusUrl,
        },
        reference: state.showReference ? state.reference : null,
      },
      null,
      2,
    );
  }, [exportMode, preset.code, preset.label, state]);

  function patch(patchState: Partial<StudioState>) {
    setState((current) => ({ ...current, ...patchState }));
  }

  function applyPreset(id: string) {
    const next = getPreset(id);
    patch({
      presetId: id,
      title: next.title,
      body: next.body,
      primary: next.primary,
      secondary: next.secondary,
      note: next.note,
    });
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(exportCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  function reset() {
    setState(createInitialState());
    setDevice("desktop");
    setExportMode("next");
  }

  return (
    <>
      <HouseBar product="Error Studio" />
      <div className="app-shell">
      <header className="app-header">
        <a className="wordmark" href="#top" aria-label="Error Studio home">
          error<span>/</span>
        </a>
        <div className="header-center">
          <span className="live-dot" />
          Recovery page studio
        </div>
        <button className="header-action" onClick={reset} type="button">
          <Icon name="refresh" size={14} />
          Reset
        </button>
      </header>

      <main className="studio-grid" id="top">
        <aside className="control-panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">01 / State</span>
              <h2>What happened?</h2>
            </div>
            <span className="panel-count">{preset.code}</span>
          </div>

          <div className="preset-grid">
            {ERROR_PRESETS.map((item) => (
              <button
                aria-pressed={state.presetId === item.id}
                className={`preset-card ${state.presetId === item.id ? "is-active" : ""}`}
                key={item.id}
                onClick={() => applyPreset(item.id)}
                style={{ "--item-accent": item.accent } as React.CSSProperties}
                type="button"
              >
                <span className="preset-code">{item.code}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="control-section">
            <span className="section-kicker">02 / Composition</span>
            <div className="layout-list">
              {LAYOUTS.map((layout) => (
                <button
                  aria-pressed={state.layout === layout.id}
                  className={`layout-option ${state.layout === layout.id ? "is-active" : ""}`}
                  key={layout.id}
                  onClick={() => patch({ layout: layout.id })}
                  type="button"
                >
                  <span className={`layout-thumb thumb-${layout.id}`} aria-hidden="true"><i /><i /><i /></span>
                  <span>
                    <strong>{layout.name}</strong>
                    <small>{layout.description}</small>
                  </span>
                  <span className="radio-mark" />
                </button>
              ))}
            </div>
          </div>

          <div className="control-section">
            <span className="section-kicker">03 / Voice</span>
            <div className="segmented-control" role="group" aria-label="Message tone">
              {TONES.map((tone) => (
                <button
                  aria-pressed={state.tone === tone.id}
                  className={state.tone === tone.id ? "is-active" : ""}
                  key={tone.id}
                  onClick={() => patch({ tone: tone.id })}
                  type="button"
                >
                  {tone.name}
                </button>
              ))}
            </div>

            <label className="field-label">
              <span>Headline</span>
              <input value={state.title} onChange={(event) => patch({ title: event.target.value })} />
            </label>
            <label className="field-label">
              <span>Explanation</span>
              <textarea rows={4} value={state.body} onChange={(event) => patch({ body: event.target.value })} />
              <small>{state.body.length} / 220 recommended</small>
            </label>
            <div className="field-split">
              <label className="field-label">
                <span>Primary action</span>
                <input value={state.primary} onChange={(event) => patch({ primary: event.target.value })} />
              </label>
              <label className="field-label">
                <span>Secondary</span>
                <input value={state.secondary} onChange={(event) => patch({ secondary: event.target.value })} />
              </label>
            </div>
            <label className="field-label">
              <span>Reassurance</span>
              <input value={state.note} onChange={(event) => patch({ note: event.target.value })} />
            </label>
          </div>

          <div className="control-section compact-section">
            <span className="section-kicker">04 / Exposure</span>
            <Toggle checked={state.showSecondary} label="Secondary recovery" onChange={(checked) => patch({ showSecondary: checked })} />
            <Toggle checked={state.showNote} label="Reassurance note" onChange={(checked) => patch({ showNote: checked })} />
            <Toggle checked={state.showReference} label="Support reference" onChange={(checked) => patch({ showReference: checked })} />
            {state.showReference ? (
              <label className="field-label inline-field">
                <span>Reference</span>
                <input value={state.reference} onChange={(event) => patch({ reference: event.target.value.toUpperCase() })} />
              </label>
            ) : null}
          </div>
        </aside>

        <section className="workspace" aria-label="Error page preview">
          <div className="workspace-toolbar">
            <div className="toolbar-title">
              <span className="section-kicker">Live preview</span>
              <strong>{preset.label}</strong>
            </div>
            <div className="toolbar-actions">
              <div className="icon-segment" role="group" aria-label="Preview width">
                <button aria-label="Desktop preview" aria-pressed={device === "desktop"} className={device === "desktop" ? "is-active" : ""} onClick={() => setDevice("desktop")} type="button"><Icon name="desktop" /></button>
                <button aria-label="Mobile preview" aria-pressed={device === "mobile"} className={device === "mobile" ? "is-active" : ""} onClick={() => setDevice("mobile")} type="button"><Icon name="mobile" /></button>
              </div>
              <button aria-label={state.dark ? "Use light preview" : "Use dark preview"} className="theme-button" onClick={() => patch({ dark: !state.dark })} type="button">
                <Icon name={state.dark ? "sun" : "moon"} />
                {state.dark ? "Light" : "Dark"}
              </button>
            </div>
          </div>

          <div className={`browser-frame device-${device}`}>
            <div className="browser-bar">
              <span className="browser-lights"><i /><i /><i /></span>
              <span className="address-bar">northstar.example/{state.presetId === "404" ? "missing-page" : "error"}</span>
              <span className="browser-menu">•••</span>
            </div>
            <div className="preview-viewport">
              <ErrorPreview state={state} />
            </div>
          </div>

          <div className="diagnostic-grid">
            <div className="diagnostic-card score-card">
              <div className="score-ring" style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties}>
                <span>{score}</span>
              </div>
              <div>
                <span className="diag-label">Recovery score</span>
                <strong>{score >= 90 ? "Ready to ship" : score >= 75 ? "Almost there" : "Needs attention"}</strong>
                <small>Clarity, recovery path and information density.</small>
              </div>
            </div>
            <div className="diagnostic-card">
              <span className="diag-icon good"><Icon name="check" /></span>
              <div>
                <span className="diag-label">Accessibility</span>
                <strong>Semantic structure</strong>
                <small>One H1, visible focus and non-color status cues.</small>
              </div>
            </div>
            <div className="diagnostic-card">
              <span className="diag-icon"><Icon name="spark" /></span>
              <div>
                <span className="diag-label">Privacy</span>
                <strong>{state.showReference ? "Safe reference only" : "No diagnostics exposed"}</strong>
                <small>Avoid stack traces, paths, emails and internal service names.</small>
              </div>
            </div>
          </div>
        </section>

        <aside className="export-panel">
          <div className="export-heading">
            <div>
              <span className="section-kicker">05 / Export</span>
              <h2>Ship the recovery.</h2>
            </div>
            <span className="export-icon"><Icon name="code" /></span>
          </div>
          <p className="export-intro">Portable output with no Error Studio runtime. Copy it into the product that actually owns the failure.</p>

          <div className="export-tabs" role="tablist" aria-label="Export format">
            {(["next", "html", "json"] as const).map((mode) => (
              <button
                aria-selected={exportMode === mode}
                className={exportMode === mode ? "is-active" : ""}
                key={mode}
                onClick={() => setExportMode(mode)}
                role="tab"
                type="button"
              >
                {mode === "next" ? "Next.js" : mode.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="code-window">
            <div className="code-toolbar">
              <span>{exportMode === "next" ? "app/not-found.tsx" : exportMode === "html" ? "404.html" : "error-page.json"}</span>
              <button onClick={copyCode} type="button">
                <Icon name={copied ? "check" : "copy"} size={14} />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre><code>{exportCode}</code></pre>
          </div>

          <div className="export-checklist">
            <div><Icon name="check" size={14} /><span>No external UI dependency</span></div>
            <div><Icon name="check" size={14} /><span>Responsive by default</span></div>
            <div><Icon name="check" size={14} /><span>Editable recovery actions</span></div>
            <div><Icon name="check" size={14} /><span>Support-safe reference ID</span></div>
          </div>

          <div className="studio-principle">
            <span>Principle 01</span>
            <p>An error page should answer three things in order: what happened, what is safe, and what the person can do next.</p>
          </div>
        </aside>
      </main>
      </div>
    </>
  );
}
