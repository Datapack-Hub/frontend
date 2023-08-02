<script lang="ts">
  import { API } from "$lib/globals/consts";
  import { fetchAuthed } from "$lib/globals/functions";
  import {
    commentSchema,
    type DPHComment,
    type Project
  } from "$lib/globals/schema";
  import { roleInfo, roles, user } from "$lib/globals/stores";
  import { toast } from "svelte-sonner";
  import IconExpand from "~icons/tabler/ChevronDown.svelte";
  import IconDexpand from "~icons/tabler/ChevronUp.svelte";
  import IconDelete from "~icons/tabler/Trash.svelte";
  import MarkdownComponent from "../markdown/MarkdownRenderer.svelte";
  import Reply from "./Reply.svelte";

  export let comment: DPHComment;
  export let project: Project;

  let userRole = $roles.find(v => v.name == comment.author.role);

  let replyMessage: string;
  let showReplies = false;
  let expanded = false;
  let wait = false;
  let visible = true;
  let formatter = Intl.DateTimeFormat("en", {
    timeStyle: "short",
    dateStyle: "short"
  });

  async function reply() {
    wait = true;
    if (replyMessage.length === 0) {
      wait = false;
      return toast.error("Comment field is empty!");
    }
    const cmt = await fetchAuthed(
      "POST",
      `/comments/thread/${project.ID}/post`,
      {
        message: replyMessage,
        parent_id: comment.id
      }
    );
    if (cmt.ok) {
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
    return toast.error("There was an error.");
  }

  async function del() {
    visible = false;
    const cmt = await fetchAuthed("DELETE", `/comments/id/${comment.id}`);
    if (cmt.ok) {
      return toast.success("Comment removed!");
    }
    visible = true;
    return toast.error("There was an error.");
  }
</script>

{#if visible}
  {#key comment}
    <div
      class="dark:bg-stone-800 p-2 rounded-xl w-full flex space-x-2 relative">
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
                {#each comment.replies ?? [] as reply}
                  <Reply {reply} />
                {/each}
              </ul>

              <form
                class="flex items-center space-x-2 mt-3"
                on:submit="{reply}">
                <img
                  src="{$user.profile_icon}"
                  alt="Your profile"
                  class="rounded-full h-8" />
                <input
                  bind:value="{replyMessage}"
                  type="text"
                  required
                  class="p-1 rounded-md dark:bg-stone-900 px-2 text-white focus:transition-all"
                  placeholder="Leave a reply" />
                <input
                  on:click="{reply}"
                  type="submit"
                  class="rounded-lg p-1 px-2 text-white bg-dph-orange hover:scale-102 disabled:bg-opacity-50"
                  disabled="{wait}"
                  value="Post" />
              </form>
            </div>
          {/if}
        {:else}
          <div class="flex items-center space-x-2 mt-3">
            <img
              src="{$user.profile_icon}"
              alt="Your profile"
              class="rounded-full h-8" />
            <input
              bind:value="{replyMessage}"
              type="text"
              required
              class="p-1 rounded-md dark:bg-stone-900 px-2 text-white focus:transition-all"
              placeholder="Leave the first reply" />
            <button
              on:click="{reply}"
              class="rounded-lg p-1 px-2 text-white bg-dph-orange hover:scale-102 disabled:bg-opacity-50"
              disabled="{wait}">Post</button>
          </div>
        {/if}
      </div>
      {#if $user.id == comment.author.id || $roleInfo.permissions.includes("DELETE_CONTENT")}
        <div class="relative right-0 p-2 text-white">
          <button
            role="checkbox"
            aria-checked="{expanded}"
            class="cursor-pointer"
            on:click="{() => (expanded = !expanded)}">
            {#if !expanded}
              <IconExpand
                class="ml-auto"
                on:keypress="{() => (expanded = true)}" />
            {:else}
              <IconDexpand
                class="ml-auto"
                on:keypress="{() => (expanded = true)}" />
            {/if}
          </button>
          {#if expanded}
            <div
              class="absolute right-0 top-8 p-2 bg-stone-600 rounded-lg space-y-1">
              <button
                class="flex items-center space-x-1 p-0.5 px-1 cursor-pointer rounded-lg hover:bg-stone-600 text-xs"
                on:click="{del}">
                <IconDelete />
                <p>Delete</p>
              </button>
              <!-- <div class="flex items-center space-x-1">
        <IconEdit />
        <p>Edit</p>
      </div> -->
            </div>
          {/if}
        </div>
      {/if}
    </div>
  {/key}
{/if}
