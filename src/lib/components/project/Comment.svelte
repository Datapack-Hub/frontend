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
  import IconDelete from "~icons/tabler/Trash.svelte";
  import IconEdit from "~icons/tabler/Edit.svelte";
  import Button from "../decorative/Button.svelte";
  import autoAnimate from "@formkit/auto-animate";
  import Reply from "./Reply.svelte";

  export let comment: DPHComment;
  export let project: Project;

  let replymessage: string;
  let showReplies = false;
  let expanded = false;
  let wait = false
  let visible = true

  async function reply() {
    wait = true
    if (replymessage.length == 0) {
      wait = false
      return toast.error("Comment field is empty!");
    }
    const cmt = await fetchAuthed(
      "POST",
      `/comments/thread/${project.ID}/post`,
      {
        message: replymessage,
        parent_id: comment.id
      }
    );
    if (cmt.ok) {
      toast.success("Comment posted!");
      let newComment = await fetch(apiURL + "/comments/id/" + comment.id);
      let parsedComments = commentSchema.parse(await newComment.json());
      comment = parsedComments;
      replymessage = "";
      wait = false
      return;
    }
    wait = false
    return toast.error("There was an error.");
  }

  async function del() {
    visible = false
    const cmt = await fetchAuthed(
      "DELETE",
      `/comments/id/${comment.id}`
    );
    if (cmt.ok) {
      return toast.success("Comment removed!");
    }
    visible = true
    return toast.error("There was an error.");
  }
</script>

{#if visible}
{#key comment}
<div class="dark:bg-stone-800 p-2 rounded-xl w-full flex space-x-2 relative">
  <img src={comment.author.profile_icon} class="rounded-full h-12"/>
  <div>
    <div class="flex items-baseline space-x-1">
      <a class="dark:text-white font-bold hover:underline" href="/user/{comment.author.username}">{comment.author.username}</a>
      <p class="text-xs dark:text-neutral-400">{new Date(comment.sent * 1000).toLocaleDateString()}</p>
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
              <Reply reply={reply} />
            {/each}

        <div class="flex items-center space-x-2 mt-3">
          <img src={$user.profile_icon} class="rounded-full h-8"/>
          <input bind:value={replymessage} class="p-1 rounded-md dark:bg-stone-900 px-2 text-white focus:transition-all" placeholder="Leave a reply"/>
          <button on:click={reply} class="rounded-lg p-1 px-2 text-white bg-dph-orange hover:scale-102 disabled:bg-opacity-50" disabled={wait}>Post</button>
        </div>
      </div>
      {/if}
    {:else}
      <div class="flex items-center space-x-2 mt-3">
        <img src={$user.profile_icon} class="rounded-full h-8"/>
        <input bind:value={replymessage} class="p-1 rounded-md dark:bg-stone-900 px-2 text-white focus:transition-all" placeholder="Leave the first reply"/>
        <button on:click={reply} class="rounded-lg p-1 px-2 text-white bg-dph-orange hover:scale-102 disabled:bg-opacity-50" disabled={wait}>Post</button>
      </div>
    {/if}
  </div>
  {#if $user.id == comment.author.id || ["admin","moderator"].includes($user.role)}
  <div class="absolute right-0 top-0 p-2 text-white">
    <a class="cursor-pointer" on:click={() => expanded = !expanded}>
      {#if !expanded}
      <IconExpand class="ml-auto" on:keypress={() => expanded = true}/>
      {:else}
      <IconDexpand class="ml-auto" on:keypress={() => expanded = true}/>
      {/if}
    </a>
    {#if expanded}
    <div class="p-2 bg-stone-500 rounded-lg space-y-1">
      <a class="flex items-center space-x-1 cursor-pointer" on:click={del}>
        <IconDelete />
        <p>Delete</p>
      </a>
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
