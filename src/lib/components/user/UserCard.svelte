<script lang="ts">
  import { appendSize } from "$lib/globals/functions";
  import type { Role, User } from "$lib/globals/schema";
  import { title } from "radash";
  import RawMarkdownRenderer from "../markdown/RawMarkdownRenderer.svelte";

  export let person: User;
  export let role: Role | undefined;
</script>

<a href="/user/{person.username.toLowerCase()}">
  <div
    class="my-2 flex w-full rounded-xl bg-slate-200 p-4 transition-all hover:brightness-90 dark:bg-zinc-800">
    <img
      loading="lazy"
      src="{appendSize(person.profile_icon, 128)}"
      alt="{person?.username}'s profile picture"
      class="float-left mr-2 h-16 w-16 rounded-full"
      width="64"
      height="64" />
    <div class="max-w-[calc(100%-4.5rem)]">
      <h1 class="text-xl font-bold text-zinc-950 dark:text-white">
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
      <span class="line-clamp-2 max-h-72">
        <RawMarkdownRenderer html="{person?.bio}" classes="{'line-clamp-2'}" />
      </span>
    </div>
  </div>
</a>
