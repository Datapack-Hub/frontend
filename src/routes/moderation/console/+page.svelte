<script lang="ts">
  import { onMount } from "svelte";
  import { isAuthenticated, role, user } from "$lib/globals/stores";
  import { goto } from "$app/navigation";
  import { fetchAuthed } from "$lib/globals/functions";
  import { apiURL } from "$lib/globals/consts";

  let submitCmd: () => Promise<void> | undefined;
  let commandInput: HTMLInputElement;
  let command = "";
  let consoleIn = "";
  let innerWidth = 0;
  $: isSmallWidth = innerWidth < 768;

  onMount(() => {
    if (!$role.permissions.includes("USE_CONSOLE")) {
      goto("/");
    }

    consoleIn = document.getElementById("cons")?.innerHTML!;

    submitCmd = async () => {
      if (command) {
        consoleIn = consoleIn + `<li>⫻ ${command}</li>`;
        commandInput.value = "Loading...";

        try {
          let res = await fetchAuthed("post", `${apiURL}/moderation/console`, {
            command: command,
          });

          let text = await res.text();

          if (res.ok) {
            consoleIn = consoleIn + `<pre class='resp'>${text}</pre>`;
            command = "";
            return;
          }

          consoleIn = consoleIn + `<li class='pb-4 text-red-500'>${text}</li>`;
          command = "";
        } catch (err) {
          consoleIn = consoleIn + `<li class='resp err'>${err}</li>`;
          command = "";
        }

        let objDiv = document.getElementById("big")!;
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    };
  });
</script>

<svelte:head>
  <title>Datapack Hub Console</title>
</svelte:head>

<svelte:window bind:innerWidth="{innerWidth}" />

<main class="bg-new-white-200 px-4 transition-all dark:bg-stone-900">
  {#if $user.role != "default" && $isAuthenticated == true}
    {#if !isSmallWidth}
      <div
        class="h-screen w-full flex-col font-console text-lime-400 md:items-start md:pt-20">
        <div id="big" class="overflow-y-scroll" style="height: 92%;">
          <span class="text-lg font-bold">Datapack Hub Console</span><br />
          <span class="text-lg font-normal">Welcome!</span>
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
