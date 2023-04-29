<script lang="ts">
  import { isAuthenticated, userData } from "$globals";
  import tippy from "sveltejs-tippy";

  export let profile: User | undefined;
  export let profileRole: Role | undefined;

  function titleCase(str: string | undefined): string {
    if (str == undefined) return "null";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  let orangeVerifiedHover = {
    content:
      "This user is verified because they are part of the Datapack Hub staff team.",
    placement: "top",
  };

  let blueVerifiedHover = {
    content:
      "This person is verified because they are known for helping others with their datapacks.",
    placement: "top",
  };

  let emeraldVerifiedHover = {
    content:
      "This user is verified because we found their datapacks to be high-quality or they are active in the community.",
    placement: "top",
  };
</script>

<div class="ms:max-w-lg flex max-w-full flex-col items-center md:items-start">
  <div class="self-center">
    <img
      src="{profile?.profile_icon}"
      alt="{profile?.username}'s profile picture"
      height="128"
      width="128"
      class="rounded-full outline outline-2 outline-offset-4 md:h-24 md:w-24 lg:h-32 lg:w-32"
      style="outline-color:{profileRole?.color};" />
  </div>

  <p
    class="mt-4 w-full text-center font-brand text-5xl font-bold dark:text-white md:text-4xl lg:text-5xl">
    {profile?.username}
    {#if ["moderator", "developer", "admin"].includes(profileRole?.name)}<span
        class="material-icons text-md align-middle text-orange-500 transition-all hover:scale-125"
        use:tippy="{orangeVerifiedHover}">verified</span
      >{:else if profile?.role == "helper"}<span
        class="material-icons text-md align-middle text-blue-500 transition-all hover:scale-125"
        use:tippy="{blueVerifiedHover}">verified</span
      >{:else if profile?.role == "verified"}<span
        class="material-icons text-md align-middle text-emerald-500 transition-all hover:scale-125"
        use:tippy="{emeraldVerifiedHover}">verified</span
      >{/if}
  </p>

  <p
    class="mt-1 w-full text-center align-middle font-brand font-semibold dark:text-white sm:text-base md:text-lg">
    {#if profileRole?.name != "default"}
      <span style="color:{profileRole?.color};">
        {#if profileRole?.name == "nerd"}🤓 Nerd
        {:else if profileRole?.name == "admin"}<img
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
    class="styled-scrollbar my-3 max-h-64 w-full overflow-y-scroll whitespace-pre-line rounded-xl bg-white/40 p-2 font-brand text-sm font-light dark:bg-stone-700/40 dark:text-white md:text-lg">
    {profile?.bio.replaceAll("\\n", "\n")}
  </p>
  {#if $isAuthenticated && $userData.id === profile?.id}
    <a
      href="/user/{$userData.username}/edit"
      class="text-md mt-1 w-full rounded-md border-2 border-red-400 bg-red-400/10 px-2 py-2 font-brand text-red-400 transition-all hover:scale-105 active:brightness-75 md:px-3 md:text-lg lg:text-lg">
      <img
        src="/icons/settings.svg"
        alt="settings"
        width="24"
        height="24"
        class="float-left mr-2 max-w-sm stroke-red-400 invert" />
      Profile Settings
    </a>
  {/if}
</div>
