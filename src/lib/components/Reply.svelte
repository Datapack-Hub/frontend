<script lang="ts">
  import { fetchAuthed } from "$lib/globals/functions";
  import type { User } from "$lib/globals/schema";
  import { roleInfo, roles, user } from "$lib/globals/stores";
  import { toast } from "svelte-sonner";

  import IconExpand from "~icons/tabler/ChevronDown.svelte";
  import IconDexpand from "~icons/tabler/ChevronUp.svelte";
  import IconDelete from "~icons/tabler/Trash.svelte";
  import MarkdownComponent from "./markdown/MarkdownRenderer.svelte";

  export let reply: {
    id: number;
    message: string;
    author: User;
    sent: number;
  };

  let userRole = $roles.find(v => v.name == reply.author.role);

  let expanded = false;
  let visible = true;
  let formatter = Intl.DateTimeFormat("en", {
    timeStyle: "short",
    dateStyle: "short"
  });

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
  <li class="relative mt-3 flex w-full space-x-1">
    <img
      src="{reply.author.profile_icon}&size=32"
      alt="{reply.author}'s profile"
      class="h-6 rounded-full"
      height="24"
      width="24" />
    <div>
      <div class="flex items-baseline space-x-1">
        <a
          class="font-bold hover:underline"
          style="color: {userRole?.color};"
          href="/user/{reply.author.username}">{reply.author.username}</a>
        <p class="text-xs dark:text-neutral-400">
          {formatter.format(reply.sent * 1000)}
        </p>
        {#if $user.id == reply.author.id || $roleInfo.permissions.includes("DELETE_CONTENT")}
          <div class="absolute right-0 p-3 text-white">
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
                class="absolute right-0 top-8 space-y-1 rounded-lg bg-zinc-600 p-3">
                <button
                  class="flex cursor-pointer items-center space-x-1 rounded-lg p-0.5 px-1 text-xs hover:bg-zinc-600"
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
      <MarkdownComponent
        source="{reply.message}"
        classes="text-sm dark:text-neutral-200" />
    </div>
  </li>
{/if}
