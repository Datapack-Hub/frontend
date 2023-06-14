<script lang="ts">
  import {
    fetchAuthed,
    getAuthorFromID,
    titleCase
  } from "$lib/globals/functions";
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";

  import IconAlert from "~icons/tabler/AlertTriangle.svelte";
  import IconTick from "~icons/tabler/Check.svelte";
  import IconRight from "~icons/tabler/ChevronRight.svelte";
  import IconFiles from "~icons/tabler/Files.svelte";
  import IconReport from "~icons/tabler/Flag.svelte";
  import IconPencil from "~icons/tabler/Pencil.svelte";
  import IconShield from "~icons/tabler/Shield.svelte";
  import IconCross from "~icons/tabler/X.svelte";

  import { goto } from "$app/navigation";
  import CasualLine from "$lib/components/CasualLine.svelte";
  import MarkdownComponent from "$lib/components/MarkdownComponent.svelte";
  import VersionDisplay from "$lib/components/VersionDisplay.svelte";
  import Modal from "$lib/components/modals/Modal.svelte";
  import MiniProfileCard from "$lib/components/profile/MiniProfileCard.svelte";
  import { versions } from "$lib/globals/consts";
  import { user } from "$lib/globals/stores";
  import autoAnimate from "@formkit/auto-animate";
  import { onMount } from "svelte";
  import toast from "svelte-french-toast";
  import MultiSelect from "svelte-multiselect";
  import ProjectInfo from "$lib/components/project/ProjectInfo.svelte";
  import ProjectBody from "$lib/components/project/ProjectBody.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>{data.project?.title} | Datapack Hub</title>

  <meta property="title" content="{data.project?.title}" />
  <meta property="description" content="{data.project?.description}" />

  <meta property="og:title" content="{data.project?.title} | Datapack Hub" />
  <meta property="og:description" content="{data.project?.description}" />

  <meta name="og:profile:username" content="Silabear" />
  <meta name="og:image" content="{data.project?.icon}" />
  <meta name="og:image:secure_url" content="{data.project?.icon}" />
  <meta name="og:image:width" content="120" />
  <meta name="og:image:height" content="120" />
</svelte:head>

<main
  class="-translate-y-20 bg-pearl-lusta-100 px-0 pb-64 transition-all dark:bg-stone-900 sm:px-8 md:translate-y-0 md:px-16 lg:px-24">
  <div class="pt-20"></div>
  <div class="flex flex-col lg:flex-row space-x-0 lg:space-x-4 w-full">
    {#if data.project && data.versions && data.roles}
    <!--Project Meta-->
    <ProjectInfo project={data.project} />
    <!--Main-->
    <ProjectBody project={data.project} dp_versions={data.versions} roles={data.roles} />
    {/if}
  </div>
</main>

