<script lang="ts">
  import * as Select from '@taxonomy/ui/select/index.js'
  import type { Selected } from 'bits-ui'

  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { messages } from '$lib/config/language'
  import { i18n } from '$lib/i18n'
  import { type AvailableLanguageTag, availableLanguageTags, languageTag } from '$paraglide/runtime'

  /**
   * After navigation, {@link languageTag} updates and this component re-renders with
   * with the latest, correct value.
   */
  let selected = {
    value: languageTag(),
    label: $messages('__name'),
  }

  async function handleSelectedChange(selected?: Selected<AvailableLanguageTag>) {
    if (selected?.value != null) {
      const untranslatedPathname = i18n.route($page.url.pathname)
      await goto(i18n.resolveRoute(untranslatedPathname, selected.value))
    }
  }
</script>

<!--
@component

A select menu that navigates to different language settings.
-->

<Select.Root {selected} onSelectedChange={handleSelectedChange}>
  <Select.Trigger>
    <Select.Value placeholder="Select a language" />
  </Select.Trigger>

  <Select.Content class="!w-auto">
    <Select.Group>
      {#each availableLanguageTags as tag}
        <Select.Item value={tag}>
          {$messages('__code', {}, { languageTag: tag })}
          {$messages('__name', {}, { languageTag: tag })}
        </Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>
