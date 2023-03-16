<script lang="ts">
  import { onMount } from "svelte";
  import { isAuthenticated, userData, apiURL, postAuthed } from "$globals";
  import { error } from "@sveltejs/kit";

  let isSmallWidth: boolean;

  onMount(() => {
    if(!$isAuthenticated) throw error(401)

    console.log("User is " + $userData.username);
    // if($userData.role == "default"){
    //     window.location.replace("/")
    // }
    isSmallWidth = window.innerWidth < 768;
    addEventListener("resize", () => (isSmallWidth = window.innerWidth < 768));


    let inpu: HTMLInputElement = document.getElementById(
      "inpt"
    )! as HTMLInputElement;
    alert(inpu);
    
    inpu.value = "your mother";
    inpu.addEventListener("keydown", async (e) => {
      let keyCode = e.key;
      if (keyCode == "Enter") {
        if (inpu.value != "") {
          const cons = document.getElementById("cons")!;
          let cmd = inpu.value;
          cons.innerHTML = cons.innerHTML + `<li>⫻ ${cmd}</li>`;
          inpu.value = "Loading...";
          try {
            await postAuthed(apiURL + "/moderation/console", {
              command: cmd,
            }).then((response) => {
              response.text().then((text) => {
                if (response.status == 200) {
                  cons.innerHTML =
                    cons.innerHTML + `<pre class='resp'>${text}</pre>`;
                  inpu.value = "";
                } else {
                  cons.innerHTML =
                    cons.innerHTML +
                    `<li class='pb-4 text-red-500'>${text}</li>`;
                  inpu.value = "";
                }
              });
            });
          } catch (err) {
            cons.innerHTML =
              cons.innerHTML + `<li class='resp err'>${err}</li>`;
            inpu.value = "";
          }
          let objDiv = document.getElementById("big")!;
          objDiv.scrollTop = objDiv.scrollHeight;
        }
      }
    });
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
          <input on:submit|preventDefault id="inpt" class="w-full outline-none border-0 ml-1 bg-black" />
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
