<script lang="ts">
    let visible = false
    export function open(){
        visible = true;
    }

    export function close(){
        visible = false;
    }

</script>

{#if visible}
<div class="fixed top-0 left-0 flex backdrop-blur-sm w-screen h-screen">
    <div class="relative m-auto align-middle justify-self-center p-3 dark:bg-stone-800 rounded-xl w-1/3">
        <button class="float-right font-black dark:text-white select-none cursor-pointer" on:click={() => close()}>X</button>
        <slot />
    </div>
</div>
{/if}