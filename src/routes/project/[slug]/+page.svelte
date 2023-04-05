<script lang="ts">
  import type { PageData } from "./$types";
    export let data: PageData

</script>

<main class="dark:bg-stone-900 bg-new-white transition-all px-0 sm:px-8 md:px-16 lg:px-24">
    <div class="pt-16"></div>
    <div class="bg-new-white bg-opacity-10 p-4 rounded-xl">
        <h1 class="dark:text-white text-5xl font-brand">{data.project?.title}</h1>
        <h2>By {data.project?.author}</h2>
    </div>
</main>