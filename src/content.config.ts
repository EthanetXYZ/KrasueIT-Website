import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    sector: z.string(),
    date: z.string(),
    summary: z.string(),
    challenge: z.string(),
    approach: z.string(),
    outcome: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  })
});

export const collections = {
  'case-studies': caseStudies,
};
