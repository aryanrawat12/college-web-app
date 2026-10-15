// Site colour themes, switchable from /admin → Site Settings → Theme.
// The palettes themselves live in app/globals.css under [data-theme="…"];
// "default" uses the :root tokens (navy & warm gold).

export const themes = [
  { value: "default", label: "Classic Navy & Gold (default)", themeColor: "#16335f" },
  { value: "royal-purple", label: "Royal Purple & Gold", themeColor: "#5c0099" },
  { value: "ocean-blue", label: "Ocean Blue & Gold", themeColor: "#00509d" },
] as const;

export type ThemeName = (typeof themes)[number]["value"];

export function resolveTheme(value: string | null | undefined): ThemeName {
  return themes.find((t) => t.value === value)?.value ?? "default";
}
