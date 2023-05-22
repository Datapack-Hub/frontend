<script lang="ts">
  import { titleCase } from "$lib/globals/functions";
  import { isAuthenticated, user } from "$lib/globals/stores";
  import tippy from "sveltejs-tippy";
  import IconSettings from "~icons/tabler/Settings.svelte";
  import MarkdownComponent from "../MarkdownComponent.svelte";

  export let profile: User | undefined;
  export let profileRole: Role | undefined;

  let userProfile = profile;
  let role = profileRole;

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

<div class="ms:max-w-lg flex max-w-full flex-col items-center md:items-start">
  <div class="self-center">
    <img
      loading="lazy"
      src="{userProfile?.profile_icon}"
      alt="{userProfile?.username}'s profile picture"
      height="128"
      width="128"
      class="rounded-full outline outline-2 outline-offset-4 md:h-24 md:w-24 lg:h-32 lg:w-32"
      style="outline-color:{role?.color};" />
  </div>

  <p
    class="mt-4 w-full text-center font-brand text-5xl font-bold text-pearl-lusta-950 dark:text-white md:text-4xl lg:text-5xl">
    {profile?.username}
    {#if ["moderator", "developer", "admin"].includes(role?.name ?? "")}
      <span
        class="material-icons align-middle text-base text-orange-500 transition-all hover:scale-125 md:text-lg lg:text-xl"
        use:tippy="{orangeVerifiedHover}">verified</span
      >{:else if userProfile?.role == "helper"}<span
        class="material-icons align-middle text-base text-blue-500 transition-all hover:scale-125 md:text-lg lg:text-xl"
        use:tippy="{blueVerifiedHover}">verified</span
      >{:else if userProfile?.role == "verified"}<span
        class="material-icons align-middle text-base text-emerald-500 transition-all hover:scale-125 md:text-lg lg:text-xl"
        use:tippy="{emeraldVerifiedHover}"
        >verified
      </span>
    {/if}
  </p>

  <p
    class="mt-1 w-full text-center align-middle font-brand font-semibold text-pearl-lusta-950 dark:text-white sm:text-base md:text-lg">
    {#if role?.name != "default"}
      <span style="color:{role?.color};">
        {#if role?.name == "nerd"}🤓 Nerd
        {:else if role?.name == "admin"}<img
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
  <p
    class="prose prose-stone my-2 w-full rounded-xl bg-stone-800 p-2 font-brand leading-tight dark:prose-invert">
    <MarkdownComponent
      source="{profile?.bio.replaceAll('\\n', '\n').replaceAll('![', '[')}" />
  </p>
  {#if $isAuthenticated && $user.id === userProfile?.id}
    <a
      href="/user/{$user.username}/edit"
      class="button-alt mb-2 flex w-full items-center">
      <IconSettings
        width="24"
        height="24"
        class="float-left mr-2 stroke-blue-400" />
      Profile Settings
    </a>
  {/if}
</div>
