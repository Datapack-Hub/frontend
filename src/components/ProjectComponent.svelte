<script lang="ts">
  import { browser } from "$app/environment";

    export let project: Project

    let author = "";

    (async () => {
        if(!browser) return
        let res = await fetch(`https://api.datapackhub.net/user/${project.author}`)
        author = (await res.json() as User).username
    })();
</script>

<div
	class="bg-stone-800 text-white rounded-lg bg-cover flex my-1 items-center overflow-scroll"
>
	<img
		src={project.icon}
		alt="project icon"
		class="aspect-square bg-cover h-24 rounded-lg ml-4"
	/>
	<div class="p-2">
		<p class="ml-4 font-brand text-2xl">{project.title}</p>
		<p class="ml-4 text-sm text-opacity-20">
			By {author}
		</p>
		<p class="m-4">{project.description}</p>
	</div>
</div>
