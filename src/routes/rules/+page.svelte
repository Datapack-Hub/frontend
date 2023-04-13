<script lang="ts">
  // import type { PageData } from "./$types";
  import CasualLine from "$components/CasualLine.svelte";

  // export let data: PageData;
</script>

<svelte:head>
  <title>Rules | Datapack Hub</title>
</svelte:head>

<main
  class="dark:bg-stone-900 bg-new-white transition-all px-4 lg:px-32 xl:px-64 overflow-y-scroll"
>
  <div
    class="flex-col items-center md:items-start md:flex-row w-full h-screen md:pt-20 pt-10"
  >
    <h1
      class="dark:text-white text-5xl text-center md:text-start md:text-4xl lg:text-5xl font-brand font-bold mt-8 pb-2"
    >
      Datapack Hub Rules
    </h1>
    <CasualLine />
    <p>
      We want to make sure that Datapack Hub is safe for everyone to use! To
      ensure that Datapack Hub stays clean and safe, please make sure to follow
      these simple rules!
    </p>
    <h2>Submission Rules</h2>
    <p>
      When you post a submission, it will be reviewed by our moderators to make
      sure it follows these rules.
    </p>
    <ul>
      <li>
        Post malware. This is self explanatory - if you post malware instead of
        an actual datapack, then you will be blocked from visiting the site.
      </li>
      <li>
        Take work from others. Please only post content that you made yourself,
        or you have permission to upload.
      </li>
      <li>
        Post inappropriate submissions. All datapacks on Datapack Hub must be
        appropriate for all ages. NSFW content will not be tolerated.
      </li>
      <li>
        Post inappropriate submissions. All datapacks on Datapack Hub must be
        appropriate for all ages. NSFW content will not be tolerated.
      </li>
      <li>
        Spam. Make sure that content you post has value and has a
        description/images so people know what your datapack does.
      </li>
      <li>
        Post solely to advertise a commercial product. You are allowed to
        promote, however it shouldn't distract users from your project.
      </li>
    </ul>
  </div>
</main>

<style lang="postcss">
  p {
    @apply dark:text-white font-brand;
  }

  li {
    @apply dark:text-white font-brand;
  }

  h2 {
    @apply text-xl pt-2 font-brand dark:text-white font-bold;
  }
</style>
