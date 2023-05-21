<script lang="ts">
  import { user } from "$lib/globals/stores";
  import { goto } from "$app/navigation";
  import { fetchAuthed, titleCase } from "$lib/globals/functions";
  import { apiURL } from "$lib/globals/consts";
  import autoAnimate from '@formkit/auto-animate'

  let rolesJson: Role[];

  async function loadStuff() {
    if ($user.role == "default") {
      goto("/");
    }

    let logs = await fetchAuthed("get", `${apiURL}/user/staff/roles`);
    rolesJson = (await logs.json())["roles"];
  }
</script>

<svelte:head>
  <title>Staff Team | Datapack Hub</title>
</svelte:head>

<main
  class=" bg-pearl-lusta-100 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div class="h-screen w-full flex-col md:flex-row md:items-start md:pt-5">
    <h1
      class="mt-8 pb-2 text-center font-brand text-3xl font-bold text-pearl-lusta-950 dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Site Roles
    </h1>
    <p class="font-brand text-pearl-lusta-950 dark:text-white">
      This page is meant for easy viewing and modifying of roles.
    </p>
    <br />
    {#await loadStuff() then}
      <table class="w-full table-auto p-2 text-left font-brand" use:autoAnimate>
        <tr class="bg-emerald-500 p-2">
          <th class="p-2 text-pearl-lusta-950 dark:text-white">Role Name</th>
          <th class="p-2 text-pearl-lusta-950 dark:text-white">Permissions</th>
        </tr>
        {#each rolesJson ?? [] as i}
          <tr class="odd:bg-stone-700/5">
            <td
              ><p
                style="color: {i.color};"
                class="text-pearl-lusta-950 dark:text-white">
                ⬤ {titleCase(i.name)}
              </p></td>
            <td class="text-pearl-lusta-950 dark:text-white"
              >{#if i.permissions.length != 0}{i.permissions.join(
                  " | "
                )}{:else}None{/if}</td>
          </tr>
        {/each}
      </table>
    {/await}
  </div>
</main>
