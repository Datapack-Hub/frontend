<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import ColorSchemeSelector from "./buttons/ColorSchemeSelector.svelte";
  import ProfileComponent from "./ProfileComponent.svelte";
  let isSmallWidth: boolean;

  onMount(() => {
    isSmallWidth = window.innerWidth < 768;
    addEventListener("resize", () => (isSmallWidth = window.innerWidth < 768));
  });
</script>

<main class=" dark:bg-footer bg-newWhite w-screen {isSmallWidth ? '' : 'sticky'} {!isSmallWidth ? '' : 'fixed hidden'} {!isSmallWidth ? '' : 'bottom-0'} transition-all p-5">
  <p class="text-white font-medium font-brand">Datapack Hub is not affiliated with Minecraft or Mojang Studios.</p>
</main>