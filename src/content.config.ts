import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
	loader: glob({ base: './src/content/notes', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		category: z.string().default('未分类'),
		tags: z.array(z.string()).default([]),
		pubDate: z.coerce.date(),
		description: z.string(),
		source: z.string().optional(),
	}),
});

export const collections = { notes };
