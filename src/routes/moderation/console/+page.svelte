<script lang="ts">
  import { fetchAuthed } from "$lib/globals/functions";
  import { authed, user, windowWidth } from "$lib/globals/stores";
  import { onMount } from "svelte";

  let submitCmd: () => Promise<void> | undefined;
  let commandInput: HTMLInputElement;
  let command = "";
  let consoleIn = "";
  let objectDiv: HTMLDivElement;

  $: isSmallWidth = $windowWidth < 768;

  onMount(async () => {
    consoleIn = document.querySelector("#cons")?.innerHTML ?? "";
    submitCmd = async () => {
      if (command) {
        if (command.split(" ")[0] == "clear") {
          consoleIn = `<p>Cleared the console</p>`;
          return;
        }

        consoleIn += `<li>⫻ ${command}</li>`;
        commandInput.value = "Loading...";

        try {
          let response = await fetchAuthed("post", "/moderation/console", {
            command: command
          });

          let text = await response.text();

          text.replace("\\n", "\n");

          if (response.ok) {
            consoleIn += `<pre class='resp'>${text}</pre>`;
            command = "";
            return;
          }

          consoleIn += `<li class='pb-4 text-red-500'>${text}</li>`;
          command = "";
        } catch (error) {
          consoleIn += `<li class='resp err'>${error}</li>`;
          command = "";
        }

        objectDiv.scrollTop = objectDiv.scrollHeight;
      }
    };
  });
</script>

<svelte:head>
  <title>Datapack Hub Console</title>
</svelte:head>

<main id="main-content" class="bg-zinc-900 px-4 transition-all">
  {#if $user.role != "default" && $authed}
    {#if !isSmallWidth}
      <div
        class="h-screen w-full flex-col font-console text-lime-400 md:items-start md:pt-20">
        <div
          id="big"
          bind:this="{objectDiv}"
          class="overflow-y-scroll"
          style="height: 92%;">
          <span class="text-lg font-bold">Datapack Hub Console</span><br />
          <span class="text-lg font-normal">Welcome!</span>
          <!-- refactor this to not require a @html tag in the future -->
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          <ul class="list-none" id="cons">{@html consoleIn}</ul>
        </div>
        <div
          class="absolute bottom-0 right-0 flex w-full justify-around bg-black p-3">
          <p class="float-left">/</p>
          <form
            action="get"
            on:submit|preventDefault="{submitCmd}"
            class="ml-1 w-full border-0 bg-black outline-none">
            <input
              on:submit|preventDefault="{submitCmd}"
              bind:value="{command}"
              bind:this="{commandInput}"
              id="inpt"
              class="w-full border-none bg-black" />
          </form>
        </div>
      </div>
    {:else}
      <div
        class="h-screen w-full flex-col pt-10 font-console text-lime-400 md:items-start md:pt-20">
        <h1>Console is not available on mobile at this moment.</h1>
      </div>
    {/if}
  {/if}
</main>
