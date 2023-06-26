<script lang="ts">
  import autoAnimate from "@formkit/auto-animate";
  import tippy from "sveltejs-tippy";

  let licenses = [
    {
      name: "CC0 NoDerivs",
      description:
        "This license lets others distribute, remix, adapt, and build upon your work, even commercially, as long as they credit you for the original creation. This is the most accommodating of licenses offered. Recommended for maximum dissemination and use of licensed materials. ",
      licenseLink: ""
    },
    { name: "CC1 NoDerivs", description: "Lorem Ipsum", licenseLink: "" },
    { name: "CC2 NoDerivs", description: "Lorem Ipsum", licenseLink: "" },
    { name: "CC3 NoDerivs", description: "Lorem Ipsum", licenseLink: "" },
    { name: "CC4 NoDerivs", description: "Lorem Ipsum", licenseLink: "" },
    { name: "CC5 NoDerivs", description: "Lorem Ipsum", licenseLink: "" },
    { name: "CC6 NoDerivs", description: "Lorem Ipsum", licenseLink: "" },
    { name: "CC7 NoDerivs", description: "Lorem Ipsum", licenseLink: "" },
    { name: "CC8 NoDerivs", description: "Lorem Ipsum", licenseLink: "" }
  ];

  let selectedLicense = licenses[0].name;
  $: selectedObject = licenses.find(v => v.name == selectedLicense);

  // let cat = document.getElementById("cat") as HTMLSelectElement

  // async function create() {
  //   let projData: Project = {
  //     icon: iconB64?.toString(),
  //     type: "datapack",
  //     url: titleVal.trim().toLowerCase().replaceAll(" ", "-"),
  //     title: titleVal,
  //     description: descVal,
  //     body: bodyVal,
  //     category: catVal,
  //     author: $user.id,
  //     status: "draft"
  //   };

  //   toast.promise(
  //     fetchAuthed("post", `/projects/create`, projData).then(res => {
  //       if (res.ok) {
  //         goto("/project/" + titleVal.toLowerCase().replaceAll(" ", "-"));
  //       }
  //     }),
  //     {
  //       success: "Created project! Redirecting...",
  //       loading: "Creating project...",
  //       error: "Something went wrong!"
  //     }
  //   );
  // }

  // function uploadIcon() {
  //   if (iconVal[0].size > 256000) {
  //     return toast.error("Icon must be less than 256kb");
  //   }
  //   let reader = new FileReader();

  //   iconElem.src = URL.createObjectURL(iconVal[0]);
  //   reader.addEventListener("load", e => {
  //     iconB64 = e.target?.result;
  //   });
  //   reader.readAsDataURL(iconVal[0]);
  // }
</script>

<svelte:head>
  <title>Create Project | Datapack Hub</title>
</svelte:head>

<main class="pt-20 grid grid-cols-3 gap-3 px-8 sm:px-16 md:px-32 lg:px-64">
  <h1 class="col-span-3 text-pearl-lusta-100 text-2xl">WARNING, THIS NEW PAGE DOES NOT WORK YET, SORRY FOR THE INCONVENIENCE</h1>
  <p class="text-pearl-lusta-100 col-span-3">Datapack Name</p>
  <input type="text" maxlength="35" class="input" />
  <p class="text-pearl-lusta-100 col-span-3 pt-3">Summary</p>
  <textarea maxlength="200" class="input resize-none h-32"></textarea>
  <p class="text-pearl-lusta-100 col-span-3 pt-3">Description</p>
  <textarea maxlength="2000" class="input resize-none h-64 col-span-2"
  ></textarea>
  <p class="text-pearl-lusta-100 col-span-3 pt-3">Description</p>
  <select
    class="input"
    use:autoAnimate
    use:tippy="{{ content: selectedObject?.description, placement: 'top' }}"
    bind:value="{selectedLicense}">
    {#each licenses as license}
      <option value="{license.name}">
        {license.name}
      </option>
    {/each}
  </select>
</main>

<style lang="postcss">
  .input {
    @apply bg-stone-800 rounded-lg border-2 border-stone-700 p-2 focus:border-dph-orange outline-none text-opacity-60 focus:text-opacity-100 text-pearl-lusta-100 transition-all;
  }
</style>
