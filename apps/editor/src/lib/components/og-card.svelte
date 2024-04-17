<script lang="ts">
  import NextjsLogo from '~icons/logos/nextjs'
  import GitHubIcon from '~icons/uit/github-alt'
  import { socials } from '$lib/config/site'
  import type { OgParamsSchema } from '$lib/models/og-params'

  interface $$Props extends OgParamsSchema {}

  const backgrounds = {
    light: 'white',
    dark: 'linear-gradient(90deg, #000 0%, #111 100%)',
  }

  export let mode: $$Props['mode'] = 'dark'

  export let type: $$Props['type'] = ''

  export let heading: $$Props['heading'] = ''

  export let origin = ''

  $: paint = mode === 'dark' ? '#fff' : '#000'
  $: fontSize = heading.length > 100 ? '70px' : '100px'
  $: background = backgrounds[mode]
</script>

<div
  class="relative w-full h-full p-12 flex flex-col items-start"
  style="color: {paint}; background: {background}"
>
  <div class="flex items-center gap-4">
    <NextjsLogo width="212" height="50" fill={paint} />
    <div class="p-1 ml-4 border border-white rounded font-extrabold text-2xl">13</div>
  </div>

  <div class="flex flex-col flex-1 py-10">
    <p class="text-lg uppercase" style="font-family: Inter">
      {type}
    </p>
    <p class="font-bold" style="height: 10px; font-weight: bold; font-size: {fontSize}">
      {heading}
    </p>
  </div>

  <div class="w-full flex justify-between items-center">
    <p class="text-xl" style="font-family: Inter">
      {origin}
    </p>

    <div class="flex items-center" style="font-family: Inter">
      <GitHubIcon width="32" height="32" fill={'white'} />
      <p class="text-xl ml-2">{socials.github.url}</p>
    </div>
  </div>
</div>
