<script lang="ts">
  import { API } from "$lib/globals/consts";
  import { appendSize, fetchAuthed, timeAgo } from "$lib/globals/functions";
  import {
    commentSchema,
    type DPHComment,
    type Project
  } from "$lib/globals/schema";
  import { authed, roles, user } from "$lib/globals/stores";
  import { sort } from "radash";
  import { toast } from "svelte-sonner";
  import IconRetract from "~icons/tabler/ChevronUp.svelte";
  import IconDelete from "~icons/tabler/Trash.svelte";
  import Reply from "./Reply.svelte";
  import RawMarkdownRenderer from "./markdown/RawMarkdownRenderer.svelte";
  import MarkdownRenderer from "./markdown/MarkdownRenderer.svelte";

  export let comment: DPHComment;
  export let project: Project;

  let userRole = $roles.find(v => v.name == comment.author.role);

  let replyMessage: string;
  let showReplies = false;
  let wait = false;
  let visible = true;
  let usingRawRenderer = true;

  async function sendReply() {
    wait = true;
    if (replyMessage.length === 0) {
      wait = false;
      toast.error("Comment field is empty!");
      return;
    }
    const commentPost = await fetchAuthed(
      "POST",
      `/comments/thread/${project.ID}/post`,
      {
        data: {
          message: replyMessage,
          parent_id: comment.id
        }
      }
    );
    if (commentPost.ok) {
      toast.success("Comment posted!");
      usingRawRenderer = false;
      let newComment = await fetch(API + "/comments/id/" + comment.id);
      let parsedComments = await commentSchema.parseAsync(
        await newComment.json()
      );
      comment = parsedComments;
      replyMessage = "";
      wait = false;
      return;
    }
    wait = false;
    toast.error("There was an error.");
  }

  async function deleteComment() {
    visible = false;
    const cmt = await fetchAuthed("DELETE", `/comments/id/${comment.id}`);
    if (cmt.ok) {
      toast.success("Comment removed!");
      return;
    }
    visible = true;
    toast.error("There was an error.");
  }
</script>

{#if visible}
  {#key comment}
    <div
      class="group relative flex w-full space-x-4 overflow-x-auto rounded-lg bg-slate-300 p-3 dark:bg-zinc-900">
      <img
        src="{appendSize(comment.author.profile_icon, 64)}"
        alt="{comment.author.username}'s profile"
        class="mt-1 h-12 rounded-full" />
      <div class="w-full">
        <div class="flex items-baseline space-x-2">
          <a
            class="font-bold hover:underline"
            style="color: {userRole?.color || '#777'};"
            href="/user/{comment.author.username}">{comment.author.username}</a>
        </div>

        <p class="mb-1 text-xs dark:text-neutral-400">
          {timeAgo(comment.sent * 1000)}
        </p>
        {#if usingRawRenderer}
          <RawMarkdownRenderer
            html="{comment.message}"
            classes="max-h-96 overflow-y-auto text-sm" />
        {:else}
          <MarkdownRenderer
            source="{comment.message}"
            classes="max-h-96 overflow-y-auto text-sm" />
        {/if}
        {#if comment.replies.length > 0}
          {#if !showReplies}
            <button
              class="mt-1 flex cursor-pointer items-center space-x-1 font-bold text-blue-400"
              on:click="{() => (showReplies = true)}"
              ><IconRetract class="rotate-180" /><span>Show Replies</span
              ></button>
          {:else}
            <button
              class="mt-1 flex cursor-pointer items-center space-x-1 font-bold text-blue-400"
              on:click="{() => (showReplies = false)}"
              ><IconRetract /><span>Hide Replies</span></button>
            <div>
              <ul class="w-full">
                {#each sort(comment.replies, r => r.sent) ?? [] as reply}
                  <Reply {reply} />
                {/each}
              </ul>
              {#if $authed}
                <form
                  class="mt-3 flex items-center space-x-2"
                  on:submit|preventDefault="{sendReply}">
                  <img
                    src="{$user.profile_icon}"
                    alt="Your profile"
                    class="h-8 rounded-full" />
                  <input
                    bind:value="{replyMessage}"
                    type="text"
                    required
                    name="reply_msg"
                    class="w-1/2 rounded-md p-1 px-2 text-sm focus:transition-all dark:bg-zinc-800 dark:text-white md:w-full md:text-base"
                    placeholder="Leave a reply" />
                  <button
                    type="submit"
                    class="rounded-lg bg-dph-orange p-1 px-2 text-white hover:scale-102 disabled:bg-opacity-50"
                    disabled="{wait}">Post</button>
                </form>
              {/if}
            </div>
          {/if}
        {:else if $authed}
          <form
            class="mt-3 flex items-center space-x-2"
            on:submit|preventDefault="{sendReply}">
            <img
              src="{$user.profile_icon}"
              alt="Your profile"
              class="h-8 rounded-full" />
            <input
              bind:value="{replyMessage}"
              type="text"
              required
              name="reply_msg"
              class="w-1/2 rounded-md p-1 px-2 text-sm focus:transition-all dark:bg-zinc-800 dark:text-white md:w-full md:text-base"
              placeholder="Leave the first reply" />
            <button
              type="submit"
              class="rounded-lg bg-dph-orange p-1 px-2 text-white hover:scale-102 disabled:bg-opacity-50"
              disabled="{wait}">Post</button>
          </form>
        {/if}
      </div>
      {#if $user.id == comment.author.id || ["moderator", "admin"].includes($user.role)}
        <div
          class="absolute right-2 top-3 flex items-start space-x-2 p-1 text-sm text-zinc-400 opacity-0 group-hover:opacity-100">
          <!-- <button class="flex items-center space-x-1" aria-label="Edit comment">
            <IconEdit />
          </button> -->
          <button
            class="flex items-center space-x-1"
            on:click="{deleteComment}"
            aria-label="Delete comment">
            <IconDelete />
          </button>
        </div>
      {/if}
    </div>
  {/key}
{/if}
