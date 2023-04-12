<script lang="ts">
  import { isAuthenticated, userData } from "$globals";

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
</script>

<div class="flex flex-col items-center md:items-start max-w-full ms:max-w-lg">
  <div class="self-center">
    <img
      src={profileData?.profile_icon}
      alt="{profileData?.username}'s profile picture"
      height="128"
      width="128"
      class="md:h-24 md:w-24 lg:h-32 lg:w-32 rounded-full outline outline-2 {profileData?.role}-outline outline-offset-4"
    />
  </div>

  <p
    class="dark:text-white text-5xl text-center md:text-4xl lg:text-5xl font-brand font-bold mt-4 w-full"
  >
    {profileData?.username}
    {#if ["moderator","developer","admin"].includes(profileData?.role)}<span class="material-icons text-md align-middle text-orange-500">verified</span>{:else if profileData?.role == "helper"}<span class="material-icons text-md align-middle text-blue-500">verified</span>{/if}
  </p>

  <p
    class="dark:text-white sm:text-base md:text-lg font-brand font-semibold align-middle mt-1 text-center w-full"
  >
    {#if profileData?.role != "default"}
      <span class="{profileData?.role}-text">
        {#if profileData?.role == "nerd"}🤓 <!-- {:else if ["helper","moderator","developer","admin"].includes(profileData?.role)}<span class="material-icons text-md align-middle">verified</span> --> {/if}{titleCase(profileData?.role)}
      </span>
    {/if}
  </p>
  <p
    class="whitespace-pre-line dark:bg-stone-700/40 bg-white/40 rounded-xl p-2 dark:text-white text-sm md:text-lg my-3 font-brand font-light max-h-64 overflow-y-scroll w-full styled-scrollbar"
  >
    {profileData?.bio.replaceAll("\\n", "\n")}
  </p>
  {#if $isAuthenticated && $userData.id === profileData?.id}
    <a
      href="/user/{$userData.username}/edit"
      class="text-red-400 bg-red-400/10 font-brand rounded-md px-2 md:px-3 py-2 text-md md:text-lg lg:text-lg w-full hover:scale-105 transition-all border-2 border-red-400 active:brightness-75 mt-1"
    >
      <img
        src="/icons/settings.svg"
        alt="settings"
        width="24"
        height="24"
        class="float-left invert mr-2 max-w-sm stroke-red-400"
      />
      Profile Settings
    </a>
  {/if}
</div>

<style lang="postcss">
  .admin-outline {
    @apply outline-red-500;
  }

  .admin-text {
    @apply text-red-500;
  }

  .moderator-outline {
    @apply outline-orange-500;
  }

  .moderator-text {
    @apply text-orange-500;
  }

  .developer-outline {
    @apply outline-lime-500;
  }

  .developer-text {
    @apply text-lime-500;
  }

  .helper-outline {
    @apply outline-blue-500;
  }

  .helper-text {
    @apply text-blue-500;
  }

  .nerd-text {
    @apply text-yellow-500;
  }

  .nerd-outline {
    @apply outline-yellow-500;
  }

  .default-outline {
    @apply outline-yellow-500;
  }

  .default-text {
    @apply text-yellow-500;
  }
</style>
