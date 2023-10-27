<script lang="ts">
  import { appendSize, fetchAuthed, timeAgo } from "$lib/globals/functions";
  import type { User } from "$lib/globals/schema";
  import { roleInfo, roles, user } from "$lib/globals/stores";
  import { toast } from "svelte-sonner";

  import IconEdit from "~icons/tabler/Edit.svelte";
  import IconDelete from "~icons/tabler/Trash.svelte";
  import RawMarkdownRenderer from "./markdown/RawMarkdownRenderer.svelte";

  export let reply: {
    id: number;
    message: string;
    author: User;
    sent: number;
  };

  let userRole = $roles.find(v => v.name == reply.author.role);

  let visible = true;

  async function deleteReply() {
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
  <li class="relative my-3 flex w-full space-x-2">
    <img
      src="{appendSize(reply.author.profile_icon, 32)}"
      alt="{reply.author}'s profile"
      class="mt-1 h-6 rounded-full"
      height="24"
      width="24" />
    <div>
      <div class="flex items-baseline space-x-1">
        <a
          class="font-bold hover:underline"
          style="color: {userRole?.color};"
          href="/user/{reply.author.username}">{reply.author.username}</a>
        <p class="text-xs dark:text-neutral-400">
          {timeAgo(reply.sent * 1000)}
        </p>
        {#if $user.id == reply.author.id || $roleInfo.permissions.includes("DELETE_CONTENT")}
          <div class="absolute right-0 p-3 text-white">
            {#if $user.id == reply.author.id || ["moderator", "admin"].includes($user.role)}
              <div
                class="absolute right-2 top-3 flex items-start space-x-2 p-1 text-sm text-zinc-400 opacity-0 hover:opacity-100">
                <button
                  class="flex items-center space-x-1"
                  aria-label="Edit comment">
                  <IconEdit />
                </button>
                <button
                  class="flex items-center space-x-1"
                  on:click="{deleteReply}"
                  aria-label="Delete comment">
                  <IconDelete />
                </button>
              </div>
            {/if}
          </div>
        {/if}
      </div>
      <RawMarkdownRenderer
        html="{reply.message}"
        classes="text-sm dark:text-neutral-200" />
    </div>
  </li>
{/if}
