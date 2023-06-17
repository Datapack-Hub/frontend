<script lang="ts">
  import { titleCase } from "$lib/globals/functions";
  import { authed, user } from "$lib/globals/stores";
  import tippy from "sveltejs-tippy";
  import IconSettings from "~icons/tabler/Settings.svelte";
  import Button from "../Button.svelte";
  import MarkdownComponent from "../MarkdownComponent.svelte";
  import type { User, Role } from "$lib/globals/schema";

  export let profile: User | undefined;
  export let profileRole: Role | undefined;

  let orangeVerifiedHover = {
    content: "Verified for being part of the Datapack Hub staff team.",
    placement: "top"
  };

  let blueVerifiedHover = {
    content:
      "Verified for being known for helping others with their datapacks.",
    placement: "top"
  };

  let emeraldVerifiedHover = {
    content:
      "Verified for their datapacks being high-quality or being active in the community.",
    placement: "top"
  };
</script>

<div class="mb-4 flex max-w-full flex-col items-center md:items-start">
  <div class="self-center">
    <img
      loading="lazy"
      src="{profile?.profile_icon}"
      alt="{profile?.username}'s profile picture"
      height="128"
      width="128"
      class="rounded-full outline outline-2 outline-offset-4 md:h-24 md:w-24 lg:h-32 lg:w-32"
      style="outline-color:{profileRole?.color};" />
  </div>

  <p
    class="mt-4 w-full text-center text-4xl font-bold text-pearl-lusta-950 dark:text-white md:text-3xl lg:text-4xl">
    {profile?.username}
    {#if ["moderator", "developer", "admin"].includes(profileRole?.name ?? "")}
      <span
        class="material-icons align-middle text-lg text-orange-500 transition-all hover:scale-125 md:text-xl lg:text-2xl"
        use:tippy="{orangeVerifiedHover}">verified</span
      >{:else if profile?.role == "helper"}<span
        class="material-icons align-middle text-lg text-blue-500 transition-all hover:scale-125 md:text-xl lg:text-2xl"
        use:tippy="{blueVerifiedHover}">verified</span
      >{:else if profile?.role == "verified"}<span
        class="material-icons align-middle text-lg text-emerald-500 transition-all hover:scale-125 md:text-xl lg:text-2xl"
        use:tippy="{emeraldVerifiedHover}"
        >verified
      </span>
    {/if}
  </p>

  <p
    class="mt-1 w-full text-center align-middle font-semibold text-pearl-lusta-950 dark:text-white sm:text-base md:text-lg">
    {#if profileRole?.name != "default"}
      <span style="color: {profileRole?.color};">
        {#if profileRole?.name == "nerd"}🤓 Nerd
        {:else if profileRole?.name == "admin"}<img
            loading="lazy"
            src="/logos/dph.svg"
            alt="logo"
            class="inline-block"
            height="24"
            width="24" /> Datapack Hub Team{:else}{titleCase(
            profileRole?.name
          )}{/if}
      </span>
    {/if}
  </p>

  <p class="mt-8 w-full rounded-xl bg-pearl-lusta-300 dark:bg-stone-800 p-6">
    <MarkdownComponent
      source="{profile?.bio.replaceAll('\\n', '\n').replaceAll('![', '[')}" />
  </p>

  {#if $authed && $user.id === profile?.id}
    <Button
      style="secondary"
      click="/user/{$user.username}/edit"
      classes="mt-4 flex w-full items-center">
      <IconSettings
        width="24"
        height="24"
        class="float-left mr-2 stroke-blue-400" />
      Profile Settings
    </Button>
  {/if}
</div>
