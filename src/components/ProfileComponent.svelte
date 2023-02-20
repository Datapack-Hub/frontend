<script lang="ts">
    import tippy from "sveltejs-tippy";

    const props = {
        content: "<span class='tooltip'>Styled tooltip text</span>",
        allowHTML: true,
        placement: "bottom"
    };
</script>

<a
href="/"
target="_self" 
class="ml-6 flex items-center justify-center"
use:tippy={props}
>
    <div>
        <!-- <p class="text-right mr-3 w-18 dark:text-white font-brand">Silabear</p> -->
        <!-- <p class="text-right mr-3 w-18 text-yellow-500 font-brand text-xs">⬤ Developer</p> -->
    </div>
    <div>
        <img src="sila.jpg" alt="user profile" height="32" width="32" class="rounded-full outline outline-2 outline-yellow-500 outline-offset-2">
    </div>
</a>