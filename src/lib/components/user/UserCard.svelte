<script lang="ts">
  import type { Role, User } from "$lib/globals/schema";
  import { title } from "radash";
  import MarkdownComponent from "../markdown/MarkdownRenderer.svelte";

  export let person: User | undefined;
  export let role: Role | undefined;
</script>

<a href="/user/{person?.username.toLowerCase()}">
  <div class="my-2 flex w-full rounded-xl bg-slate-200 p-2 dark:bg-stone-800 hover:brightness-90 transition-all">
    <img
      loading="lazy"
      src="{person?.profile_icon}?size=64"
      alt="{person?.username}'s profile picture"
      class="float-left mr-2 h-16 w-16 rounded-full"
      width="64"
      height="64" />
    <div>
      <h1 class="text-xl font-bold text-slate-950 dark:text-white">
        {person?.username}
      </h1>
      <span class="font-bold" style="color:{role?.color};">
        {#if person?.role != "admin"}
          {title(person?.role)}
        {:else}
          <img
            loading="lazy"
            src="/logos/dph.svg"
            alt="logo"
            class="inline-block"
            height="18"
            width="18" />Datapack Hub Team
        {/if}
      </span>
      <MarkdownComponent source="{person?.bio}" classes={""} />
    </div>
  </div>
</a>
