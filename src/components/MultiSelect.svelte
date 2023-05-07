<script lang="ts">
  import { browser } from "$app/environment";

  export let options: string[];
  export let labelName: string | undefined;

  let selected: string[] = [];

  function onSelect() {
    if (browser) {
      let select = document.getElementById(
        labelName ?? "ms_id"
      ) as HTMLSelectElement;
      selected = [...selected, select.value];
      selected.sort()
      select.selectedIndex = 0;
      console.log(selected);
    }
  }

  function remove(i: number) {
    if (browser) {
      selected = [...selected.filter(v => selected[i] !== v)]
      console.log(selected);
    }
  }
</script>

<div>
  <div class="bg-stone-800 rounded-lg flex h-12 px-1">
    {#each selected as selectedElem, i}
      <span
        class="text-white bg-stone-700 px-3 py-1 mr-1 rounded-md place-self-center hover:bg-dph-orange transition-colors select-none cursor-pointer"
        on:keyup="{() => remove(i)}"
        on:click="{() => remove(i)}">{selectedElem}</span>
    {/each}
    <select
      name="{labelName ?? 'ms'}"
      id="{labelName ?? 'ms_id'}"
      class="bg-transparent invert"
      on:change="{onSelect}">
      <option
        hidden
        selected
        disabled
        value
        class="after:text-white after:content-none selected-style"></option>
      {#each options as option}
        {#if !selected.includes(option)}
          <option value="{option}">{option}</option>
        {/if}
      {/each}
    </select>
  </div>
</div>
