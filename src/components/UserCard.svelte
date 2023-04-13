<script lang="ts">
    import { isAuthenticated, userData } from "$globals";
  
    export let person: User | undefined;

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
  <a href="/user/{person?.username.toLowerCase()}">
    <div class="flex w-full bg-dark-white dark:bg-stone-800 rounded-xl my-2 p-2">
    <img src={person?.profile_icon} alt="person" class="w-16 h-16 float-left mr-2 rounded-full" />
    <div>
        <a href="/user/{person?.username.toLowerCase()}"><h1 class="font-brand font-bold text-xl dark:text-white mr-2">{person?.username}</h1></a>
        <span class="{person?.role}-text font-bold font-brand">{titleCase(person?.role)}</span>
        <p class="one-lines font-brand dark:text-stone-300">{person?.bio}</p>
    </div>
    </div>
</a>
