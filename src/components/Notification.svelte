<script lang="ts">
    import { isAuthenticated, userData } from "$globals";
  
    export let notification: Notif | undefined;

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
  </script>

<div class="w-full {notification?.type}-background rounded-xl my-2 p-4">
    <h1 class="font-brand font-bold text-xl {notification?.type}-text">
        {#if notification?.read == false}• {/if}{notification?.message}
    </h1>
    <p class="dark:text-white font-brand">{notification?.description}</p>
</div>
  
  <style lang="postcss">
    /* @HoodieRocks can you fix this so it works on light mode too */
    .default-text {
        @apply text-white
    }
    .default-background {
        @apply bg-stone-800
    }

    .warn-text {
        @apply text-orange-500;
    }
    .warn-background {
        @apply bg-orange-500/20
    }

    .ban-text {
        @apply text-red-500;
    }
    .ban-background {
        @apply bg-red-500/20
    }
  </style>
  