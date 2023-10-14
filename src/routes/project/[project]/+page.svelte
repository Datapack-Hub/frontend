<script lang="ts">
  import ProjectInfo from "$lib/components/project/ProjectInfo.svelte";
  import type { PageData } from "./$types";
  // Svelte imports
  import autoAnimate from "@formkit/auto-animate";
  // Component imports
  import MarkdownComponent from "$lib/components/markdown/MarkdownRenderer.svelte";

  import ProjectNav from "$lib/components/project/ProjectNav.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.project?.title} | Datapack Hub</title>
  <meta property="title" content="{data.project?.title}" />
  <meta property="description" content="{data.project?.description}" />
  <meta property="og:title" content="{data.project?.title} | Datapack Hub" />
  <meta property="og:description" content="{data.project?.description}" />
  <meta name="og:image" content="{data.project?.icon}" />
  <meta name="og:image:secure_url" content="{data.project?.icon}" />
  <meta name="og:image:width" content="120" />
  <meta name="og:image:height" content="120" />
</svelte:head>

<main
  id="main-content"
  class="bg-slate-50 px-0 pb-64 transition-all dark:bg-zinc-900 sm:px-8 md:px-16 lg:px-24">
  <div class="md:pt-20"></div>
  <div class="flex w-full flex-col px-4 lg:flex-row">
    <!--Project Meta-->
    <ProjectInfo
      project="{data.project}"
      isNew="{data.new == '1' ? true : false}" />
    <!--Main-->
    <div
      id="project-content"
      use:autoAnimate
      class="mt-4 w-full lg:mt-0 lg:w-3/4">
      <!--Buttons-->
      <ProjectNav project="{data.project}" />

      <div class="w-full rounded-xl bg-slate-200 p-3 dark:bg-zinc-800">
        <p class="w-full break-words leading-tight">
          <MarkdownComponent
            source="{data.project.body ?? 'No body specified!'}"
            classes="prose-headings:mb-2 prose-p:my-0 prose-ul:my-3 prose-img:my-0" />
        </p>
      </div>
    </div>
  </div>
</main>

<style lang="postcss">
  :root {
    --sms-bg: theme(colors.zinc.700);
    --sms-border: 0px solid theme(colors.zinc.700);
    --sms-selected-bg: theme(colors.zinc.700);
    --sms-remove-btn-hover-bg: theme(colors.dph-orange);
    --sms-options-bg: theme(colors.zinc.700);
    --sms-text-color: theme(colors.white);
    --sms-selected-bg: theme(colors.dph-orange/25);
  }
</style>
