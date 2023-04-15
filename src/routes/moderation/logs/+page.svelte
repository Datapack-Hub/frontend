<script lang="ts">
    import type { PageData } from "./$types";
    import UserCard from "$components/UserCard.svelte";
  import { apiURL, fetchAuthed, userData } from "$globals";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { json } from "@sveltejs/kit";

  let logsJson: [{username: string, action: string, time: number}]
    
    async function loadStuff() {
        if ($userData.role == "default") {
            goto("/");
        }

        let logs = await fetchAuthed("get",`${apiURL}/moderation/logs?page=1`)
        logsJson = (await logs.json())["result"]
    }

  </script>
  
  <svelte:head>
    <title>Staff Team | Datapack Hub</title>
  </svelte:head>
  
  <main
    class="overflow-y-scroll bg-new-white px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
    <div
      class="h-screen w-full flex-col pt-5 md:flex-row md:items-start md:pt-5">
      <h1
        class="mt-8 pb-2 text-center font-brand text-3xl font-bold dark:text-white md:text-start md:text-4xl lg:text-5xl">
        Moderation logs
      </h1>
      <br />
      {#await loadStuff() then }
      <table class="w-full p-2 text-left dark:text-white table-auto font-brand">
        <tr class="bg-emerald-500 p-2">
            <th class="p-2">User</th>
            <th>Action</th>
            <th>When</th>
        </tr>
        {#each logsJson ?? [] as i}
        <tr>
            <td>{i.username}</td>
            <td>{i.action}</td>
            <td>{i.time}</td>
        </tr><h1>hello</h1>
        {/each}
      </table>
      {/await}
    </div>
  </main>
  