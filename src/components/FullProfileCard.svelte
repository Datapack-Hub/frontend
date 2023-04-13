<script lang="ts">
  import { isAuthenticated, userData } from "$globals";
  import tippy from 'sveltejs-tippy'

  export let profileData: User;

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
    content: "Verified Admin",
    placement: "right"
  }

  let blueVerifiedHover = {
    content: "Verified Helper",
    placement: "right"
  }

  let emeraldVerifiedHover = {
    content: "Verified",
    placement: "right"
  }
</script>

<div class="ms:max-w-lg flex max-w-full flex-col items-center md:items-start">
  <div class="self-center">
    <img
      src="{profileData?.profile_icon}"
      alt="{profileData?.username}'s profile picture"
      height="128"
      width="128"
      class="rounded-full outline outline-2 md:h-24 md:w-24 lg:h-32 lg:w-32 {profileData?.role}-outline outline-offset-4" />
  </div>

  <p
    class="mt-4 w-full text-center font-brand text-5xl font-bold dark:text-white md:text-4xl lg:text-5xl">
    {profileData?.username}
    {#if ["moderator", "developer", "admin"].includes(profileData?.role)}<span
        class="material-icons text-md align-middle text-orange-500 hover:scale-105 transition-all"
        use:tippy={orangeVerifiedHover}
        >verified</span
      >{:else if profileData?.role == "helper"}<span
        class="material-icons text-md align-middle text-blue-500 hover:scale-105 transition-all"
        use:tippy={blueVerifiedHover}>verified</span
      >{:else if profileData?.role == "verified"}<span
        class="material-icons text-md align-middle text-emerald-500 hover:scale-105 transition-all"
        use:tippy={emeraldVerifiedHover}
        >verified</span
      >{/if}
  </p>

  <p
    class="mt-1 w-full text-center align-middle font-brand font-semibold dark:text-white sm:text-base md:text-lg">
    {#if profileData?.role != "default"}
      <span class="{profileData?.role}-text">
        {#if profileData?.role == "nerd"}🤓 <!-- {:else if ["helper","moderator","developer","admin"].includes(profileData?.role)}<span class="material-icons text-md align-middle">verified</span> -->
        {/if}{titleCase(profileData?.role)}
      </span>
    {/if}
  </p>
  <p
    class="styled-scrollbar my-3 max-h-64 w-full overflow-y-scroll whitespace-pre-line rounded-xl bg-white/40 p-2 font-brand text-sm font-light dark:bg-stone-700/40 dark:text-white md:text-lg">
    {profileData?.bio.replaceAll("\\n", "\n")}
  </p>
  {#if $isAuthenticated && $userData.id === profileData?.id}
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
