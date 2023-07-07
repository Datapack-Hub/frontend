<script lang="ts">
  import { apiURL } from "$lib/globals/consts";
  import { fetchAuthed } from "$lib/globals/functions";
  import {
    commentSchema,
    type DPHComment,
    type Project
  } from "$lib/globals/schema";
  import { user } from "$lib/globals/stores";
  import { toast } from "svelte-sonner";
  import IconExpand from "~icons/tabler/ChevronDown.svelte";
  import IconDexpand from "~icons/tabler/ChevronUp.svelte";
  import Button from "../decorative/Button.svelte";

  export let comment: DPHComment;
  export let project: Project;

  let replyMsg: string;
  let showReplies = false;

  async function reply() {
    if (replyMsg.length == 0) {
      return toast.error("Comment field is empty!");
    }
    const cmt = await fetchAuthed(
      "POST",
      `/comments/thread/${project.ID}/post`,
      {
        message: replyMsg,
        parent_id: comment.id
      }
    );
    if (cmt.ok) {
      toast.success("Comment posted!");
      let newComment = await fetch(apiURL + "/comments/id/" + comment.id);
      let parsedComments = commentSchema.parse(await newComment.json());
      comment = parsedComments;
      replyMsg = "";
      return;
    }
    return toast.error("There was an error.");
  }
</script>

{#key comment}
  <div class="dark:bg-pearl-lusta-100/10 p-2 rounded-xl w-full flex space-x-2">
    <img
      src="{comment.author.profile_icon}"
      alt="{comment.author.username}'s profile"
      class="rounded-full h-12" />
    <div>
      <div class="flex items-baseline space-x-1">
        <a
          class="dark:text-white font-bold hover:underline"
          href="/user/{comment.author.username}">{comment.author.username}</a>
        <p class="text-xs dark:text-neutral-400">
          {new Date(comment.sent * 1000).toLocaleDateString()}
        </p>
      </div>

      <p class="dark:text-neutral-200 text-sm">{comment.message}</p>
      {#if comment.replies.length != 0}
        {#if !showReplies}
          <button
            class="text-blue-400 font-bold mt-1 flex items-center space-x-1 cursor-pointer"
            on:click="{() => (showReplies = true)}"
            ><IconExpand /><span>Show Replies</span></button>
        {:else}
          <button
            class="text-blue-400 font-bold mt-1 flex items-center space-x-1 cursor-pointer"
            on:click="{() => (showReplies = false)}"
            ><IconDexpand /><span>Hide Replies</span></button>
          <div id="replies" class="">
            {#each comment.replies ?? [] as reply}
              <div class="flex space-x-1 mt-3">
                <img
                  src="{reply.author.profile_icon}"
                  alt="{reply.author}'s profile"
                  class="rounded-full h-6" />
                <div>
                  <div class="flex items-baseline space-x-1">
                    <a
                      class="dark:text-white font-bold hover:underline"
                      href="/user/{reply.author.username}"
                      >{reply.author.username}</a>
                    <p class="text-xs dark:text-neutral-400">
                      {new Date(reply.sent * 1000).toLocaleDateString()}
                    </p>
                  </div>
                  <p class="dark:text-neutral-200 text-sm">{reply.message}</p>
                </div>
              </div>
            {/each}

            <div class="flex items-center space-x-2 mt-3">
              <img
                src="{$user.profile_icon}"
                alt="Your profile"
                class="rounded-full h-8" />
              <input
                bind:value="{replyMsg}"
                class="p-1 rounded-md dark:bg-stone-800 px-2 text-white focus:transition-all"
                placeholder="Leave a reply" />
              <Button wait="{true}" click="{reply}">Post</Button>
            </div>
          </div>
        {/if}
      {:else}
        <div class="flex items-center space-x-2 mt-3">
          <img
            src="{$user.profile_icon}"
            alt="Your profile"
            class="rounded-full h-8" />
          <input
            bind:value="{replyMsg}"
            class="p-1 rounded-md dark:bg-stone-800 px-2 text-white focus:transition-all"
            placeholder="Leave the first reply" />
          <Button wait="{true}" click="{reply}">Post</Button>
        </div>
      {/if}
    </div>
  </div>
{/key}
