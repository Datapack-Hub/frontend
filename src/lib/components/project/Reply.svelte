<script lang="ts">
  import { fetchAuthed } from "$lib/globals/functions";
  import type { User } from "$lib/globals/schema";
  import { role, user } from "$lib/globals/stores";
  import { toast } from "svelte-sonner";

  import IconExpand from "~icons/tabler/ChevronDown.svelte";
  import IconDexpand from "~icons/tabler/ChevronUp.svelte";
  import IconDelete from "~icons/tabler/Trash.svelte";
  import MarkdownComponent from "../MarkdownComponent.svelte";

  let expanded = false;
  let visible = true;

  export let reply: {
    id: number;
    message: string;
    author: User;
    sent: number;
  };

  async function del() {
    visible = false;
    const cmt = await fetchAuthed("DELETE", `/comments/id/${reply.id}`);
    if (cmt.ok) {
      return toast.success("Comment removed!");
    }
    visible = true;
    return toast.error("There was an error.");
  }
</script>

{#if visible}
  <div class="flex space-x-1 mt-3 group relative max-w-fit">
    <img
      src="{reply.author.profile_icon}"
      alt="{reply.author}'s profile"
      class="rounded-full h-6" />
    <div>
      <div class="flex items-baseline space-x-1">
        <a
          class="dark:text-white font-bold hover:underline"
          href="/user/{reply.author.username}">{reply.author.username}</a>
        <p class="text-xs dark:text-neutral-400">
          {new Date(reply.sent * 1000).toLocaleDateString()}
        </p>
        {#if $user.id == reply.author.id || $role.permissions.includes("DELETE_CONTENT")}
          <button
            role="checkbox"
            aria-checked="{expanded}"
            class="cursor-pointer justify-self-bottom dark:text-neutral-400 h-4"
            on:click="{() => (expanded = !expanded)}">
            {#if !expanded}
              <IconExpand />
            {:else}
              <IconDexpand />
            {/if}
          </button>
        {/if}
      </div>
      <MarkdownComponent
        source="{reply.message}"
        classes="dark:text-neutral-200 text-sm" />
    </div>
    {#if expanded}
      <div class="absolute -right-4 top-4 p-2 text-white">
        <div class="p-2 bg-stone-600 rounded-lg space-y-1">
          <button
            class="flex items-center space-x-1 cursor-pointer text-xs"
            on:click="{del}">
            <IconDelete />
            <p>Delete</p>
          </button>
          <!-- <div class="flex items-center space-x-1">
        <IconEdit />
        <p>Edit</p>
      </div> -->
        </div>
      </div>
    {/if}
  </div>
{/if}
