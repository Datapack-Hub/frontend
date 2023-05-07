<script lang="ts">
  import MultiSelect from '$components/MultiSelect.svelte'

  let options = ["1.12", "1.13", "1.14", "1.15", "1.16", "1.17", "1.18", "1.19"]
</script>

<div class="flex h-screen w-screen items-center justify-center">
  <MultiSelect options={options}/>
</div>