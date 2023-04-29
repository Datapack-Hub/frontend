<script lang="ts">
  import { apiURL, fetchAuthed, userData } from "$globals";
  import { goto } from "$app/navigation";

  let rolesJson: Role[];

  function titleCase(str: string | undefined): string {
    if (str == undefined) return "null";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  async function loadStuff() {
    if ($userData.role == "default") {
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
  class="overflow-y-scroll bg-new-white-200 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div class="h-screen w-full flex-col md:flex-row md:items-start md:pt-5">
    <h1
      class="mt-8 pb-2 text-center font-brand text-3xl font-bold dark:text-white md:text-start md:text-4xl lg:text-5xl">
      Site Roles
    </h1>
    <p class="font-brand dark:text-white">
      This page is meant for easy viewing and modifying of roles.
    </p>
    <br />
    {#await loadStuff() then}
      <table class="w-full table-auto p-2 text-left font-brand">
        <tr class="bg-emerald-500 p-2">
          <th class="p-2 dark:text-white">Role Name</th>
          <th class="p-2 dark:text-white">Permissions</th>
        </tr>
        {#each rolesJson ?? [] as i}
          <tr>
            <td><p style="color: {i.color};">{titleCase(i.name)}</p></td>
            <td style="color: {i.color};">{i.permissions[0]}</td>
          </tr>
        {/each}
      </table>
    {/await}
  </div>
</main>
