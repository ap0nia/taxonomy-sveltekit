import { html } from 'satori-html'

import { ImageResponse, type ImageResponseOptions } from './image-response'

export type RequiredArgIfNotEmptyObject<T> = {} extends T ? [] : [T]

export class SvelteImageResponse<
  T extends SvelteComponentConstructor<any, any>,
  TProps extends NonNullable<ConstructorParameters<T>[0]['props']>,
> extends ImageResponse {
  constructor(
    component: T,
    ...args: [...RequiredArgIfNotEmptyObject<TProps>, ImageResponseOptions?]
  ) {
    const props = args[0]

    const options = args[1]

    /**
     * FIXME: find the type definitions for server-side Svelte components.
     *
     * @see https://svelte.dev/docs/server-side-component-api
     */
    const rendered = (component as any)['render'](props)

    const element = html(`${rendered.html}<style>${rendered.css.code}</style>`)

    super(element, options)
  }
}
