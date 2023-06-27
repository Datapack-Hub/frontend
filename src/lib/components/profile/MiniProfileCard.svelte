<script lang="ts">
  import type { Role, User } from "$lib/globals/schema";
  import { title } from "radash";
  import MarkdownComponent from "../markdown/MarkdownComponent.svelte";

  export let person: User | undefined;
  export let role: Role | undefined;
</script>

<a href="/user/{person?.username.toLowerCase()}">
  <div
    class="my-2 flex w-full rounded-xl bg-pearl-lusta-200 p-2 dark:bg-stone-800">
    <img
      loading="lazy"
      src="{person?.profile_icon}?size=64"
      alt="{person?.username}'s profile picture"
      class="float-left mr-2 h-16 w-16 rounded-full" />
    <div>
      <a href="/user/{person?.username.toLowerCase()}"
        ><h1
          class="mr-2 text-xl font-bold text-pearl-lusta-950 dark:text-white">
          {person?.username}
        </h1></a>
      <span class=" font-bold" style="color:{role?.color};"
        >{#if person?.role != "admin"}{title(person?.role)}{:else}<img
            loading="lazy"
            src="/logos/dph.svg"
            alt="logo"
            class="inline-block"
            height="18"
            width="18" />Datapack Hub Team{/if}</span>
      <MarkdownComponent source="{person?.bio}" classes="{'line-clamp-1'}" />
    </div>
  </div>
</a>
