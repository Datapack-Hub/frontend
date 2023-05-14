<script lang="ts">
  import CasualLine from "$lib/components/CasualLine.svelte";
</script>

<svelte:head>
  <title>Rules | Datapack Hub</title>
</svelte:head>

<main
  class="-translate-y-20 overflow-y-scroll bg-pearl-lusta-100 px-4 transition-all dark:bg-stone-900 md:translate-y-0 lg:px-32 xl:px-64">
  <div
    class="h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="mt-8 pb-2 text-center font-brand text-5xl font-bold text-pearl-lusta-900 dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Datapack Hub Rules
    </h1>
    <CasualLine />
    <p>
      We want to make sure that Datapack Hub is safe for everyone to use! To
      ensure that Datapack Hub stays clean and safe, please make sure to follow
      these simple rules!
    </p>
    <h2>Submission Rules</h2>
    <p class="mb-4">
      When you post a submission, it will be reviewed by our moderators to make
      sure it follows these rules.
    </p>
    <ul class=" list-disc">
      <li>
        Posting malware. This is self explanatory - if you post malware instead
        of an actual datapack, then you will be blocked from visiting the site.
      </li>
      <li>
        Take work from others. Please only post content that you made yourself,
        or you have permission to upload.
      </li>
      <li>
        Posting inappropriate submissions. All datapacks on Datapack Hub must be
        appropriate for all ages. NSFW content will not be tolerated.
      </li>
      <li>
        Spam. Make sure that content you post has value and has a
        description/images so people know what your datapack does.
      </li>
      <li>
        Posting solely to advertise a commercial product. You are allowed to
        promote, however it shouldn't distract users from your project.
      </li>
    </ul>
  </div>
</main>

<style lang="postcss">
  p {
    @apply font-brand text-pearl-lusta-900 dark:text-white;
  }

  li {
    @apply mb-3 font-brand text-pearl-lusta-900 dark:text-white;
  }

  h2 {
    @apply pt-2 font-brand text-3xl font-bold text-pearl-lusta-900 dark:text-white;
  }
</style>
