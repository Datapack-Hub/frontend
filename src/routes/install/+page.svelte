<script lang="ts">
  import Button from "$lib/components/decorative/Button.svelte";
  import autoAnimate from "@formkit/auto-animate";

  let activePage = "new";
</script>

<svelte:head>
  <title>Installation | Datapack Hub</title>
  <meta name="description" content="Learn how to install Datapacks" />
</svelte:head>

<main
  id="main-content"
  class=" bg-slate-50 px-4 transition-all dark:bg-stone-900 lg:px-32 xl:px-64">
  <div class="w-full flex-col items-center md:flex-row md:items-start md:pt-20">
    <h1
      class="my-3 pb-2 text-center text-5xl font-bold text-slate-950 dark:text-white md:text-start md:text-4xl lg:text-5xl">
      How to install Minecraft Data Packs
    </h1>
    <div class="mb-2 flex space-x-2">
      <Button
        style="base"
        classes="{activePage === 'new'
          ? 'bg-slate-500 dark:bg-stone-600'
          : 'bg-slate-300 dark:bg-stone-800'}"
        click="{() => (activePage = 'new')}">Installing to a new world</Button>
      <Button
        style="base"
        classes="{activePage === 'existing'
          ? 'bg-slate-500 dark:bg-stone-600'
          : 'bg-slate-300 dark:bg-stone-800'}"
        click="{() => (activePage = 'existing')}"
        >Installing to an existing world</Button>
      <Button
        style="base"
        classes="{activePage === 'server'
          ? 'bg-slate-500 dark:bg-stone-600'
          : 'bg-slate-300 dark:bg-stone-800'}"
        click="{() => (activePage = 'server')}">Installing to a server</Button>
      <Button
        style="base"
        classes="{activePage === 'realm'
          ? 'bg-slate-500 dark:bg-stone-600'
          : 'bg-slate-300 dark:bg-stone-800'}"
        click="{() => (activePage = 'realm')}">Installing to a realm</Button>
    </div>

    <div use:autoAnimate>
      {#if activePage == "new"}
        <div
          class="rounded-xl bg-slate-200 p-3 text-center align-middle dark:bg-slate-50/10 md:text-start space-y-2 dark:text-white">
          <p>
            <b>1. Go to the Create New World screen.</b> Make sure you're using the
            Minecraft Java edition and that you have the right version selected.
            Enable cheats.
          </p>
          <img
            src="https://cdn.discordapp.com/attachments/723984082853298297/1125491520963870881/image.png"
            alt="New World Screen"
            class="w-2/3" />

          <p class="pt-4">
            <b>2. Navigate to the Data Packs screen.</b> On the latest Minecraft
            versions, this is in the More tab.
          </p>
          <img
            src="https://cdn.discordapp.com/attachments/723984082853298297/1125490094598541322/image.png"
            alt="Datapacks screen on the New World Screen"
            class="w-2/3" />

          <p class="pt-4">
            <b>3. Drag the datapack ZIP file onto this screen.</b> Or, hit Open Pack
            Folder and paste the zip in the folder which opens.
          </p>
          <img
            src="https://cdn.discordapp.com/attachments/723984082853298297/1125491117048213686/image.png"
            alt="Dragging datapack in from file explorer"
            class="w-2/3" />

          <p class="pt-4">
            <b>4. Create the world.</b> Once you are in the world, run /reload in
            chat.
          </p>
          <img
            src="https://cdn.discordapp.com/attachments/723984082853298297/1125493215739527178/image.png"
            alt="New world with datapack"
            class="w-2/3" />
        </div>
      {:else if activePage == "existing"}
        <div
          class="rounded-xl bg-slate-200 p-3 text-center align-middle dark:bg-slate-50/10 md:text-start space-y-2 dark:text-white">
          <p class="font-bold">1. Find your world, and hit Edit</p>
          <img
            src="https://cdn.discordapp.com/attachments/723984082853298297/1125493410279727144/image.png"
            alt="Finding world"
            class="w-2/3" />

          <p class="pt-4"><b>2. Open the World Folder.</b></p>
          <img
            src="https://cdn.discordapp.com/attachments/723984082853298297/1125493693533650954/image.png"
            alt="World folder"
            class="w-2/3" />

          <p class="pt-4">
            <b>3. In the world folder, open the datapacks folder.</b>
          </p>
          <img
            src="https://cdn.discordapp.com/attachments/723984082853298297/1125494220589912124/image.png"
            alt="Datapack folder"
            class="w-2/3" />

          <p class="pt-4">
            <b>4. Drag the Datapack ZIP in the datapacks folder.</b> Or, paste the
            zip in the folder.
          </p>
          <img
            src="https://cdn.discordapp.com/attachments/723984082853298297/1125494742331961465/image.png"
            alt="Dragging datapack into folder"
            class="w-2/3" />

          <p class="pt-4">
            <b>5. Open the world.</b> Once you are in the world, run /reload in chat.
          </p>
          <img
            src="https://cdn.discordapp.com/attachments/723984082853298297/1125493215739527178/image.png"
            alt="Opening world"
            class="w-2/3" />
        </div>
      {:else if activePage == "server"}
        <div
          class="rounded-xl bg-slate-200 p-3 text-center align-middle dark:bg-slate-50/10 md:text-start space-y-2 dark:text-white">
          <p class="text-red-500 font-bold">
            Note - some datapacks won't be compatible with server software such
            as Bukkit, Spigot, or plugins like EssentialsX.
          </p>
          <p class="pt-2">
            <b>1. Open your server's file manager.</b> In this case, we're using
            Bisect Hosting, so we use their dashboard. Other server hosts will have
            a similar layout.
          </p>
          <img
            src="https://cdn.discordapp.com/attachments/723984082853298297/1125496274167283742/image.png"
            alt="Bisect Hosting File Manager"
            class="w-2/3" />

          <p class="pt-4">
            <b>2. Open the world folder, then open the datapacks folder.</b>
          </p>
          <img
            src="https://cdn.discordapp.com/attachments/723984082853298297/1125496614379864125/image.png"
            alt="World folder on server"
            class="w-2/3" />

          <p class="pt-4">
            <b>3. Upload the datapack.</b> Usually, you can drag and drop the file
            here, but in some cases you gotta hit an Upload button.
          </p>
          <img
            src="https://cdn.discordapp.com/attachments/723984082853298297/1125496890931286016/image.png"
            alt="Uploading datapack"
            class="w-2/3" />

          <p class="pt-4">
            <b
              >4. Run /reload (or /minecraft:reload on Bukkit based servers).</b>
            You can do this using the server console, or in the chat if you join
            the server (and have OP.)
          </p>
          <img
            src="https://cdn.discordapp.com/attachments/723984082853298297/1125493215739527178/image.png"
            alt="Reloading"
            class="w-2/3" />
        </div>
      {:else if activePage == "realm"}
        <div
          class="rounded-xl bg-slate-200 p-3 text-center align-middle dark:bg-slate-50/10 md:text-start space-y-2 dark:text-white">
          <p class="font-bold">1. Download the world from your realm</p>
        </div>
      {/if}
    </div>
  </div>
</main>
