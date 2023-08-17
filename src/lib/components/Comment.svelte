<script lang="ts">
  import { API } from "$lib/globals/consts";
  import { fetchAuthed } from "$lib/globals/functions";
  import {
    commentSchema,
    type DPHComment,
    type Project
  } from "$lib/globals/schema";
  import { roles, user, authed } from "$lib/globals/stores";
  import { sort } from "radash";
  import { toast } from "svelte-sonner";
  import IconExpand from "~icons/tabler/ChevronDown.svelte";
  import IconDexpand from "~icons/tabler/ChevronUp.svelte";
  import IconDelete from "~icons/tabler/Trash.svelte";
  import IconEdit from "~icons/tabler/Edit.svelte";
  import MarkdownComponent from "./markdown/MarkdownRenderer.svelte";
  import Reply from "./Reply.svelte";

  export let comment: DPHComment;
  export let project: Project;

  let userRole = $roles.find(v => v.name == comment.author.role);

  let replyMessage: string;
  let showReplies = false;
  let wait = false;
  let visible = true;
  let formatter = Intl.DateTimeFormat("en", {
    timeStyle: "short",
    dateStyle: "short"
  });

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
        message: replyMessage,
        parent_id: comment.id
      }
    );
    if (commentPost.ok) {
      toast.success("Comment posted!");
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

  async function deleteReply() {
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
      class="group dark:bg-zinc-900 p-2 rounded-xl w-full flex space-x-2 relative">
      <img
        src="{comment.author.profile_icon}&size=64"
        alt="{comment.author.username}'s profile"
        class="rounded-full h-12" />
      <div class="w-full">
        <div class="flex items-baseline space-x-1">
          <a
            class="font-bold hover:underline"
            style="color: {userRole?.color};"
            href="/user/{comment.author.username}">{comment.author.username}</a>
          <p class="text-xs dark:text-neutral-400">
            {formatter.format(comment.sent * 1000)}
          </p>
        </div>

        <MarkdownComponent
          limitedMode="{true}"
          source="{comment.message}"
          classes="text-sm" />
        {#if comment.replies.length > 0}
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
            <div>
              <ul class="w-full">
                {#each sort(comment.replies, r => r.sent) ?? [] as reply}
                  <Reply {reply} />
                {/each}
              </ul>
              {#if $authed}
                <form
                  class="flex items-center space-x-2 mt-3"
                  on:submit|preventDefault="{sendReply}">
                  <img
                    src="{$user.profile_icon}"
                    alt="Your profile"
                    class="rounded-full h-8" />
                  <input
                    bind:value="{replyMessage}"
                    type="text"
                    required
                    class="p-1 rounded-md dark:bg-zinc-800 px-2 dark:text-white focus:transition-all w-1/2 md:w-full text-sm md:text-base"
                    placeholder="Leave a reply" />
                  <button
                    type="submit"
                    class="rounded-lg p-1 px-2 text-white bg-dph-orange hover:scale-102 disabled:bg-opacity-50"
                    disabled="{wait}">Post</button>
                </form>
              {/if}
            </div>
          {/if}
        {:else if $authed}
          <form
            class="flex items-center space-x-2 mt-3"
            on:submit|preventDefault="{sendReply}">
            <img
              src="{$user.profile_icon}"
              alt="Your profile"
              class="rounded-full h-8" />
            <input
              bind:value="{replyMessage}"
              type="text"
              required
              class="p-1 rounded-md dark:bg-zinc-800 px-2 dark:text-white focus:transition-all w-1/2 md:w-full text-sm md:text-base"
              placeholder="Leave the first reply" />
            <button
              type="submit"
              class="rounded-lg p-1 px-2 text-white bg-dph-orange hover:scale-102 disabled:bg-opacity-50"
              disabled="{wait}">Post</button>
          </form>
        {/if}
      </div>
      {#if $user.id == comment.author.id || ["moderator", "admin"].includes($user.role)}
        <div
        class="right-2 top-2 p-1 text-zinc-400 opacity-0 hover:opacity-100 text-sm flex space-x-2 items-start absolute">
          <button class="flex space-x-1 items-center" aria-label="Edit comment">
            <IconEdit />
          </button>
          <button class="flex space-x-1 items-center" on:click="{deleteReply}" aria-label="Delete comment">
            <IconDelete />
          </button>
        </div>
      {/if}
    </div>
  {/key}
{/if}
