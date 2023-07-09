<script lang="ts">
  import { apiURL } from "$lib/globals/consts";
  import { fetchAuthed } from "$lib/globals/functions";
  import {
    commentSchema,
    type DPHComment,
    type Project
  } from "$lib/globals/schema";
  import { role, user } from "$lib/globals/stores";
  import { toast } from "svelte-sonner";
  import IconExpand from "~icons/tabler/ChevronDown.svelte";
  import IconDexpand from "~icons/tabler/ChevronUp.svelte";
  import IconDelete from "~icons/tabler/Trash.svelte";
  import MarkdownComponent from "../MarkdownComponent.svelte";
  import Reply from "./Reply.svelte";

  export let comment: DPHComment;
  export let project: Project;

  let replyMsg: string;
  let showReplies = false;
  let expanded = false;
  let wait = false;
  let visible = true;

  async function reply() {
    wait = true;
    if (replyMsg.length == 0) {
      wait = false;
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
        src="{comment.author.profile_icon}"
        alt="{comment.author.username}'s profile"
        class="rounded-full h-12" />
      <div class="w-full">
        <div class="flex items-baseline space-x-1">
          <a
            class="dark:text-white font-bold hover:underline"
            href="/user/{comment.author.username}">{comment.author.username}</a>
          <p class="text-xs dark:text-neutral-400">
            {new Date(comment.sent * 1000).toLocaleDateString()}
          </p>
        </div>

        <MarkdownComponent source="{comment.message}" classes="text-sm" />
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
                <Reply reply="{reply}" />
              {/each}

              <div class="flex items-center space-x-2 mt-3">
                <img
                  src="{$user.profile_icon}"
                  alt="Your profile"
                  class="rounded-full h-8" />
                <input
                  bind:value="{replyMsg}"
                  class="p-1 rounded-md dark:bg-stone-900 px-2 text-white focus:transition-all"
                  placeholder="Leave a reply" />
                <button
                  on:click="{reply}"
                  class="rounded-lg p-1 px-2 text-white bg-dph-orange hover:scale-102 disabled:bg-opacity-50"
                  disabled="{wait}">Post</button>
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
              class="p-1 rounded-md dark:bg-stone-900 px-2 text-white focus:transition-all"
              placeholder="Leave the first reply" />
            <button
              on:click="{reply}"
              class="rounded-lg p-1 px-2 text-white bg-dph-orange hover:scale-102 disabled:bg-opacity-50"
              disabled="{wait}">Post</button>
          </div>
        {/if}
      </div>
      {#if $user.id == comment.author.id || $role.permissions.includes("DELETE_CONTENT")}
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
