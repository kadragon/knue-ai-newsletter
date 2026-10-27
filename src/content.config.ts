import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const TOOLS = ['chatgpt', 'claude'] as const;

const issues = defineCollection({
  loader: glob({ base: './src/content/issues', pattern: '**/*.mdx' }),
  schema: z.object({
    tool: z.enum(TOOLS),
    vol: z.number().int().positive(),
    year: z.number().int(),
    title: z.string(),
    description: z.string(),
    emailIntro: z.string(),
    lastVerified: z.coerce.date(),
    sources: z.array(z.string().url()),
    // YouTube video ID of the issue's intro video, shown at the top of the guide page.
    video: z.string().regex(/^[\w-]{11}$/).optional(),
  }),
});

export const collections = { issues };
