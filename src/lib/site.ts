export const TOOL_LABEL = { chatgpt: 'ChatGPT', claude: 'Claude' } as const;
export type Tool = keyof typeof TOOL_LABEL;

/** Prefix an internal path with the configured base so links work under GitHub Pages. */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/** Entry ids are `<tool>/<slug>`; the folder must match the `tool` frontmatter. */
export function slugOf(id: string, tool: string): string {
  const [folder, slug] = id.split('/');
  if (folder !== tool || !slug) throw new Error(`Issue "${id}" must live in src/content/issues/${tool}/`);
  return slug;
}

export const volLabel = (vol: number, year: number) => `VOL. ${String(vol).padStart(2, '0')} / ${year}`;

// Literal class names so Tailwind's scanner picks them up.
export const TOOL_TEXT = { chatgpt: 'text-chatgpt', claude: 'text-claude' } as const;
