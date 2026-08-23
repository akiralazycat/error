export type ErrorPreset = {
  id: string;
  code: string;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  primary: string;
  secondary: string;
  note: string;
  accent: string;
};

export const ERROR_PRESETS: ErrorPreset[] = [
  {
    id: "404",
    code: "404",
    label: "Not found",
    eyebrow: "Page not found",
    title: "This page slipped out of view.",
    body: "The address may have changed, or the page may no longer exist. You can return home or retrace your last step.",
    primary: "Go home",
    secondary: "Go back",
    note: "Nothing is wrong with your account.",
    accent: "#5f6cff",
  },
  {
    id: "403",
    code: "403",
    label: "Restricted",
    eyebrow: "Access restricted",
    title: "You don’t have access to this space.",
    body: "This area is limited to people with the right permission. Switch accounts or ask the owner for access.",
    primary: "Switch account",
    secondary: "Request access",
    note: "Your current session is still active.",
    accent: "#9b6bff",
  },
  {
    id: "500",
    code: "500",
    label: "Server error",
    eyebrow: "Something went wrong",
    title: "We hit an unexpected problem.",
    body: "Your request could not be completed. Try again in a moment; if the problem continues, use the reference below when contacting support.",
    primary: "Try again",
    secondary: "Status page",
    note: "Your data has not been changed.",
    accent: "#ff725c",
  },
  {
    id: "503",
    code: "503",
    label: "Maintenance",
    eyebrow: "Briefly unavailable",
    title: "We’re making a few things better.",
    body: "The service is temporarily unavailable while maintenance is in progress. Check status for the latest update.",
    primary: "Check status",
    secondary: "Try again",
    note: "No action is required from you.",
    accent: "#f0a636",
  },
  {
    id: "offline",
    code: "OFF",
    label: "Offline",
    eyebrow: "No connection",
    title: "You appear to be offline.",
    body: "Reconnect to the internet and try again. Anything already saved on this device will stay here.",
    primary: "Try again",
    secondary: "View offline data",
    note: "Local changes are safe on this device.",
    accent: "#39a887",
  },
  {
    id: "429",
    code: "429",
    label: "Rate limit",
    eyebrow: "Too many requests",
    title: "That was a little too fast.",
    body: "You’ve reached the current request limit. Wait a short while before trying again, or review your usage limits.",
    primary: "Try again later",
    secondary: "View limits",
    note: "The limit resets automatically.",
    accent: "#cf62a5",
  },
];

export const LAYOUTS = [
  { id: "quiet", name: "Quiet", description: "Calm, product-first recovery" },
  { id: "signal", name: "Signal", description: "Status-forward system message" },
  { id: "editorial", name: "Editorial", description: "Large type, human tone" },
  { id: "terminal", name: "Terminal", description: "Technical without looking broken" },
] as const;

export type LayoutId = (typeof LAYOUTS)[number]["id"];

export const TONES = [
  { id: "neutral", name: "Neutral" },
  { id: "warm", name: "Warm" },
  { id: "technical", name: "Technical" },
] as const;

export type ToneId = (typeof TONES)[number]["id"];

export type StudioState = {
  presetId: string;
  layout: LayoutId;
  tone: ToneId;
  title: string;
  body: string;
  primary: string;
  secondary: string;
  note: string;
  reference: string;
  statusUrl: string;
  showReference: boolean;
  showSecondary: boolean;
  showNote: boolean;
  dark: boolean;
};

export const getPreset = (id: string) =>
  ERROR_PRESETS.find((preset) => preset.id === id) ?? ERROR_PRESETS[0];

export const createInitialState = (): StudioState => {
  const preset = ERROR_PRESETS[0];
  return {
    presetId: preset.id,
    layout: "quiet",
    tone: "neutral",
    title: preset.title,
    body: preset.body,
    primary: preset.primary,
    secondary: preset.secondary,
    note: preset.note,
    reference: "ERR-7F3A9C",
    statusUrl: "/status",
    showReference: true,
    showSecondary: true,
    showNote: true,
    dark: false,
  };
};
