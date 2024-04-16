<script lang="ts">
  import * as Select from '@taxonomy/ui/select/index.js'

  import { language, messages } from '$lib/config/language'
  import { availableLanguageTags } from '$paraglide/runtime'
</script>

<!--
@component

A select menu that can dynamically change the website's theme.
-->

<Select.Root bind:selected={$language}>
  <Select.Trigger class="w-36">
    <Select.Value placeholder="Select a language" />
  </Select.Trigger>

  <Select.Content>
    <Select.Group>
      {#each availableLanguageTags as languageTag}
        <Select.Item value={languageTag}>
          <span>{$messages('__code', {}, { languageTag })} </span>
          <span>{$messages('__name', {}, { languageTag })} </span>
        </Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>
