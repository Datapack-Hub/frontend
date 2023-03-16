<script lang="ts">
  import { onMount } from "svelte";
  import { isAuthenticated, userData, apiURL, postAuthed } from "$globals";
  import { goto } from "$app/navigation";

  let isSmallWidth: boolean;
  let cmd: string = "";
  let submitCmd = () => {};
  let cmdInput: HTMLInputElement;

  onMount(() => {
    console.log("User is " + $userData.username);
    // if($userData.role == "default"){
    //     goto("/")
    // }
    isSmallWidth = window.innerWidth < 768;
    addEventListener("resize", () => (isSmallWidth = window.innerWidth < 768));
    // alert(cmdInput);

    cmdInput.value = "your mother";
    submitCmd = async () => {
      if (cmd != "") {
        const cons = document.getElementById("cons")!;
        cons.innerHTML = cons.innerHTML + `<li>⫻ ${cmd}</li>`;
        cmdInput.value = "Loading...";
        try {
          await postAuthed(apiURL + "/moderation/console", {
            command: cmd,
          }).then((response) => {
            response.text().then((text) => {
              if (response.status == 200) {
                cons.innerHTML =
                  cons.innerHTML + `<pre class='resp'>${text}</pre>`;
                cmd = "";
              } else {
                cons.innerHTML =
                  cons.innerHTML + `<li class='pb-4 text-red-500'>${text}</li>`;
                cmd = "";
              }
            });
          });
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

<main class="dark:bg-stone-900 bg-newWhite transition-all px-4">
  {#if $userData.role != "default" && $isAuthenticated == true}
    {#if !isSmallWidth}
      <div
        class="flex-col md:items-start w-full h-screen md:pt-20 pt-10 text-lime-400 font-console"
      >
        <div id="big" class="overflow-y-scroll" style="height: 92%;">
          <span class="font-bold text-lg">Datapack Hub Console</span><br />
          <span class="font-normal text-lg">Welcome!</span>
          <ul class="list-none" id="cons" />
        </div>
        <div
          class="bottom-0 right-0 absolute bg-black p-3 w-full flex justify-around"
        >
          <p class="float-left">/</p>
          <form
            action="get"
            on:submit|preventDefault={submitCmd}
            class="w-full outline-none border-0 ml-1 bg-black"
          >
            <input
              on:submit|preventDefault={submitCmd}
              bind:value={cmd}
              bind:this={cmdInput}
              id="inpt"
              class="w-full bg-black"
            />
          </form>
        </div>
      </div>
    {:else}
      <div
        class="flex-col md:items-start w-full h-screen md:pt-20 pt-10 text-lime-400 font-console"
      >
        <h1>Console is not available on mobile at this moment.</h1>
      </div>
    {/if}
  {/if}
</main>
