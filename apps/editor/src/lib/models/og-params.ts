/**
 * Validation models related to Open Graph.
 */
import { z } from 'zod'

/**
 * URLSearchParams for dynamically generating Open Graph images.
 */
export const ogParamsSchema = z.object({
  heading: z.string().default('Taxonomy'),
  type: z.string().default('Welcome'),
  mode: z.enum(['light', 'dark']).default('dark'),
})

export type OgParamsSchema = z.infer<typeof ogParamsSchema>
