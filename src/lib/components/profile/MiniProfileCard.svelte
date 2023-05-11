<script lang="ts">
  import { titleCase } from "$lib/globals/functions";

  export let person: User | undefined;
  export let role: Role | undefined;
</script>

<a href="/user/{person?.username.toLowerCase()}">
  <div
    class="my-2 flex w-full rounded-xl bg-new-white-300 p-2 dark:bg-stone-800">
    <img
      src="{person?.profile_icon}"
      alt="{person?.username}'s profile picture"
      class="float-left mr-2 h-16 w-16 rounded-full" />
    <div>
      <a href="/user/{person?.username.toLowerCase()}"
        ><h1 class="mr-2 font-brand text-xl font-bold dark:text-white">
          {person?.username}
        </h1></a>
      <span class="font-brand font-bold" style="color:{role?.color};"
        >{#if person?.role != "admin"}{titleCase(person?.role)}{:else}<img
            src="/logos/dph.svg"
            alt="logo"
            class="inline-block"
            height="18"
            width="18" /> Datapack Hub Team{/if}</span>
      <p class="line-clamp-1 font-brand dark:text-stone-300">{person?.bio}</p>
    </div>
  </div>
</a>
