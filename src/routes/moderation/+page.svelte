<script lang="ts">
import { apiURL, fetchAuthed, userData } from "$globals";
import { goto } from "$app/navigation";
  import { browser } from "$app/environment";

let rolesJson: Role[];
let activePage = "dashboard"

  function titleCase(str: string | undefined): string {
    if (!str) return "null";
    return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

  (async () => {
    if(browser) {
    if ($userData.role == "default") {
        goto("/");  
    }

    let logs = await fetchAuthed("get", `${apiURL}/user/staff/roles`);
    rolesJson = (await logs.json())["roles"];
    }
  })();
</script>

<svelte:head>
    <title>Moderation | Datapack Hub</title>
</svelte:head>

<main
  class="bg-new-white-200 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64 -translate-y-20 md:translate-y-0">
  <div
    class=" h-screen w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="my-3 pb-2 text-center font-brand text-5xl font-bold dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Moderation Dashboard
    </h1>
    <div class="mb-2 flex space-x-2">
        <button class="rounded-xl {activePage === 'dashboard' ? 'bg-stone-600' : 'bg-stone-800'} hover:scale-102 p-1 px-3 font-brand dark:text-white cursor-pointer" on:click={() => activePage = 'dashboard'}
        >Dashboard</button>
        <button class="rounded-xl {activePage === 'roles' ? 'bg-stone-600' : 'bg-stone-800'} hover:scale-102 p-1 px-3 font-brand dark:text-white cursor-pointer" on:click={() => activePage = 'roles'}
        >Roles</button>
        <a href="/moderation/console"><button class="rounded-xl bg-stone-800 hover:scale-102 p-1 px-3 font-brand dark:text-white cursor-pointer"
        >Console</button></a>
    </div>

    {#if activePage == "dashboard"}
    <div class="text-center align-middle md:text-start">
      <div class="flex rounded-xl bg-stone-800 p-2 py-3 space-x-2">
        <label for="icon" class="max-w-100">
          <span
            class="p-2 bg-green-600 font-brand font-bold rounded-xl dark:text-white cursor-pointer"
            >Upload datapack ZIP</span>
        </label>
        <span class="align-center dark:text-white font-brand">(Supported: *.zip)</span>
        <!-- <p class="align-middle font-brand dark:text-new-white-200">No versions yet!</p> -->
        
      </div>
    </div>

    {:else if activePage == "roles"}
    <div class="text-center align-middle md:text-start flex flex-col rounded-xl bg-stone-800 p-2 py-3 space-x-2">
        <h1
            class="m-2 text-center font-brand text-2xl font-bold dark:text-white md:text-start">
            Site Roles
        </h1>
        <table class="table-auto p-2 text-left font-brand rounded-xl">
            <tr class="bg-emerald-500 p-2">
                <th class="p-2 dark:text-white">Role Name</th>
                <th class="p-2 dark:text-white">Permissions</th>
            </tr>
            {#each rolesJson ?? [] as i}
            <tr class="odd:bg-stone-700/25">
                <td
                ><p style="color: {i.color};" class="dark:text-white">
                    ⬤ {titleCase(i.name)}
                </p></td>
                <td class="dark:text-white"
                >{#if i.permissions.length != 0}{i.permissions.join(
                    " | "
                    )}{:else}None{/if}</td>
            </tr>
            {/each}
        </table>
    </div>
    {/if}
  </div>
</main>
