<script lang="ts">
  import IconExpand from "~icons/tabler/ChevronDown.svelte";
  import IconDexpand from "~icons/tabler/ChevronUp.svelte";
  import Button from "../decorative/Button.svelte";
  import { toast } from "svelte-sonner";
  import { commentSchema, type Project } from "$lib/globals/schema";
  import { fetchAuthed } from "$lib/globals/functions";
  import { apiURL } from "$lib/globals/consts";
  import { user } from "$lib/globals/stores";

  export let comment: DPHComment;
  export let project: Project;
  let replymessage: string;

  let showReplies = false;

  async function reply() {
    if(comment.length == 0){
      return toast.error("Comment field is empty!")
    }
    const cmt = await fetchAuthed("POST",`/comments/thread/${project.ID}/post`,{
      message:replymessage,
      parent_id:comment.id
    })
    if(cmt.ok) {
      toast.success("Everything was fine!")
      let new_comment = await fetch(apiURL + "/comments/id/" + comment.id)
      let new_comment_parsed = commentSchema.parse((await new_comment.json()))
      comment = new_comment_parsed
      replymessage = ""
      return;
    }
    return toast.error("There was an error.")
  }
</script>

{#key comment}
<div class="dark:bg-pearl-lusta-100/10 p-2 rounded-xl w-full flex space-x-2">
  <img src={comment.author.profile_icon} class="rounded-full h-12"/>
  <div>
    <p class="dark:text-white font-bold">{comment.author.username}</p>
    <p class="dark:text-neutral-200 text-sm">{comment.message}</p>
    {#if !showReplies}
    <a class="text-blue-400 font-bold mt-1 flex items-center space-x-1 cursor-pointer" on:click="{() => showReplies = true}"><IconExpand /><span>Show Replies</span></a>
    {:else}
    <a class="text-blue-400 font-bold mt-1 flex items-center space-x-1 cursor-pointer" on:click="{() => showReplies = false}"><IconDexpand /><span>Hide Replies</span></a>
    <div id="replies" class="">
      {#each comment.replies ?? [] as reply}
      <div class="flex space-x-1 mt-3">
        <img src="{reply.author.profile_icon}" class="rounded-full h-6" />
        <div>
          <p class="dark:text-white font-bold">{reply.author.username}</p>
          <p class="dark:text-neutral-200 text-sm">{reply.message}</p>
        </div>
      </div>
      {/each}

      <div class="flex items-center space-x-2 mt-3">
        <img src={$user.profile_icon} class="rounded-full h-8"/>
        <input bind:value={replymessage} class="p-1 rounded-md dark:bg-stone-800 px-2 text-white focus:w-1/2 focus:transition-all" placeholder="Leave a reply"/>
        <button on:click={reply} class="rounded-lg p-1 px-2 text-white bg-dph-orange hover:scale-102">Post</button>
      </div>
    </div>
    {/if}
  </div>
</div>
{/key}
