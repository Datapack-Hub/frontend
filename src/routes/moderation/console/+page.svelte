<script lang="ts">
  import { onMount } from "svelte";
  import { isAuthenticated, userData, apiURL, postAuthed } from "$globals";
  import { goto } from "$app/navigation";

  let isSmallWidth: boolean;
  let submitCmd = () => {};
  let cmdInput: HTMLInputElement;
  let cmd = "";

  onMount(() => {
    if ($userData.role == "default") {
      goto("/");
    }
    isSmallWidth = window.innerWidth < 768;
    addEventListener("resize", () => (isSmallWidth = window.innerWidth < 768));

    submitCmd = async () => {
      if (cmd != "") {
        const cons = document.getElementById("cons")!;
        cons.innerHTML = cons.innerHTML + `<li>⫻ ${cmd}</li>`;
        cmdInput.value = "Loading...";
        try {
          let res = await postAuthed(apiURL + "/moderation/console", {
            command: cmd,
          });
          let text = await res.text();

          if (res.status == 200) {
            cons.innerHTML = cons.innerHTML + `<pre class='resp'>${text}</pre>`;
            cmd = "";
          } else {
            cons.innerHTML =
              cons.innerHTML + `<li class='pb-4 text-red-500'>${text}</li>`;
            cmd = "";
          }
        } catch (err) {
          cons.innerHTML = cons.innerHTML + `<li class='resp err'>${err}</li>`;
          cmd = "";
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

<main class="bg-new-white px-4 transition-all dark:bg-stone-900">
  {#if $userData.role != "default" && $isAuthenticated == true}
    {#if !isSmallWidth}
      <div
        class="h-screen w-full flex-col pt-10 font-console text-lime-400 md:items-start md:pt-20">
        <div id="big" class="overflow-y-scroll" style="height: 92%;">
          <span class="text-lg font-bold">Datapack Hub Console</span><br />
          <span class="text-lg font-normal">Welcome!</span>
          <ul class="list-none" id="cons"></ul>
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
              bind:value="{cmd}"
              bind:this="{cmdInput}"
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
