<script lang="ts">
  import type { PageData } from "./$types";
  // Svelte imports
  import { toast } from "svelte-sonner";
  // Component imports

  import { invalidateAll } from "$app/navigation";
  import Comment from "$lib/components/Comment.svelte";
  import ProjectInfo from "$lib/components/project/ProjectInfo.svelte";
  import ProjectNav from "$lib/components/project/ProjectNav.svelte";
  import { fetchAuthed } from "$lib/globals/functions";
  import { authed, user } from "$lib/globals/stores";
  import autoAnimate from "@formkit/auto-animate";
  import { debounce, sort } from "radash";

  export let data: PageData;

  let comment: string;
  let commentSending = false;

  async function postComment() {
    commentSending = true;
    if (comment.length === 0) {
      commentSending = false;
      toast.error("Comment field is empty!");
      return;
    }
    toast.promise(
      fetchAuthed("POST", `/comments/thread/${data.project.ID}/post`, {
        data: { message: comment }
      }).then(async response => {
        if (response.ok) {
          invalidateAll();
          comment = "";
          commentSending = false;
          return;
        }
        commentSending = false;
      }),
      {
        success: "Comment posted successfully!",
        error: "Something went wrong!",
        loading: "Posting..."
      }
    );
  }
</script>

<main
  id="main-content"
  class="bg-slate-50 px-0 pb-64 transition-all dark:bg-zinc-900 sm:px-8 md:px-16 lg:px-24">
  <div class="md:pt-32"></div>
  <div class="flex w-full flex-col px-4 lg:flex-row">
    <!--Project Meta-->
    <ProjectInfo
      project="{data.project}"
      isNew="{data.new == '1' ? true : false}" />
    <!--Main-->
    <div
      id="project-content"
      use:autoAnimate
      class="mt-4 w-full lg:mt-0 lg:w-3/4">
      <!--Buttons-->
      <ProjectNav project="{data.project}" />

      <div class="mb-2 items-center space-y-2">
        <div class="rounded-xl bg-slate-200 p-3 dark:bg-zinc-800">
          <div class="space-y-2">
            {#if $authed}
              <form
                class="flex items-center space-x-2"
                on:submit|preventDefault="{debounce(
                  { delay: 500 },
                  postComment
                )}">
                <img
                  src="{$user.profile_icon}"
                  alt="Your profile icon"
                  class="h-8 rounded-full" />
                <input
                  class="input w-4/5"
                  required
                  name="comment_field"
                  placeholder="Write a comment on {data.project
                    .title} (markdown supported!)"
                  bind:value="{comment}" />
                <button
                  type="submit"
                  class="button-primary"
                  disabled="{commentSending}">Post</button>
              </form>
            {:else}
              <p class="mb-3 rounded-lg bg-zinc-900 p-3 text-white">
                <b>Sign in</b> to post a comment or reply
              </p>
            {/if}
            {#key data.comments}
              {#each sort(data.comments, c => c.sent, true) as cmt}
                <Comment comment="{cmt}" project="{data.project}" />
              {/each}
            {/key}
            <!-- <Comment /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
