<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Role } from "$lib/globals/schema";
  import { user } from "$lib/globals/stores";
  import autoAnimate from "@formkit/auto-animate";
  import { title } from "radash";

  let rolesJson: Role[];

  async function loadStuff() {
    if ($user.role == "default") {
      goto("/");
    }
  }
</script>

<svelte:head>
  <title>Staff Team | Datapack Hub</title>
</svelte:head>

<main
  id="main-content"
  class=" bg-slate-50 px-4 transition-all dark:bg-zinc-900 lg:px-32 xl:px-64">
  <div class="h-screen w-full flex-col md:flex-row md:items-start md:pt-5">
    <h1
      class="mt-8 pb-2 text-center text-3xl font-bold text-slate-950 dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Site Roles
    </h1>
    <p class=" text-slate-950 dark:text-white">
      This page is meant for easy viewing and modifying of roles.
    </p>
    <br />
    {#await loadStuff() then}
      <table class="w-full table-auto p-2 text-left" use:autoAnimate>
        <tr class="bg-emerald-500 p-2">
          <th class="p-2 text-slate-950 dark:text-white">Role Name</th>
          <th class="p-2 text-slate-950 dark:text-white">Permissions</th>
        </tr>
        {#each rolesJson ?? [] as index}
          <tr class="odd:bg-zinc-700/5">
            <td
              ><p
                style="color: {index.color};"
                class="text-slate-950 dark:text-white">
                ⬤ {title(index.name)}
              </p></td>
            <td class="text-slate-950 dark:text-white"
              >{#if index.permissions.length > 0}{index.permissions.join(
                  " | "
                )}{:else}None{/if}</td>
          </tr>
        {/each}
      </table>
    {/await}
  </div>
</main>
