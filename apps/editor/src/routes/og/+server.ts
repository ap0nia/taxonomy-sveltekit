import { error } from '@sveltejs/kit'
import { ImageResponse } from '@vercel/og'
import { html } from 'satori-html'
import type { SvelteComponent } from 'svelte'

import OgCard from '$lib/components/og-card.svelte'
import { ogParamsSchema } from '$lib/models/og-params'

import type { RequestHandler } from './$types'

let fontRegular: ArrayBuffer

let fontBold: ArrayBuffer

export const GET: RequestHandler = async (event) => {
  const component: SvelteComponent = OgCard as any

  const ogParams = ogParamsSchema.safeParse(Object.fromEntries(event.url.searchParams))

  if (!ogParams.success) {
    return error(500, 'Invalid search params for generating Open Graph image.')
  }

  const heading =
    ogParams.data.heading.length > 140
      ? `${ogParams.data.heading.substring(0, 140)}...`
      : ogParams.data.heading

  const origin = event.url.host

  const rendered = component['render']({ ...ogParams.data, heading, origin })

  const element = html(`${rendered.html}<style>${rendered.css.code}</style>`)

  return new ImageResponse(element, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: (fontRegular ??= await event
          .fetch('/fonts/Inter-Regular.ttf')
          .then((res) => res.arrayBuffer())),
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Cal Sans',
        data: (fontBold ??= await event
          .fetch('/fonts/CalSans-SemiBold.ttf')
          .then((res) => res.arrayBuffer())),
        weight: 700,
        style: 'normal',
      },
    ],
  })
}
