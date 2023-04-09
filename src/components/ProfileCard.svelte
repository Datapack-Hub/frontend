<script lang="ts">
  import { isAuthenticated, userData } from "$globals";

  export let profileData: User | undefined;

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

<div class="flex flex-col items-center md:items-start">
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
    class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-4"
  >
    {profileData?.username}
  </p>

  <p
    class="dark:text-white sm:text-base md:text-lg font-brand font-semibold mt-4"
  >
    {#if profileData?.role != "default"}
      <span class="{profileData?.role}-text">
        {#if profileData?.role != "nerd"}⬤{:else}🤓{/if}
        {titleCase(profileData?.role)}
      </span>
    {/if}
  </p>
  <p
    class="whitespace-pre-line dark:bg-stone-700 dark:bg-opacity-40 bg-opacity-40 bg-white mb-2 rounded-xl p-2 dark:text-white text-lg mt-4 font-brand font-light"
  >
    {profileData?.bio.replaceAll("\\n", "\n")}
  </p>
  {#if $isAuthenticated && $userData.id === profileData?.id}
    <a
      href="edit"
      class="text-red-400 bg-red-400 bg-opacity-10 font-brand rounded-md px-2 md:px-3 py-2 text-md md:text-lg lg:text-xl hover:scale-105 transition-all border-2 border-red-400 active:brightness-75 mt-2"
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
