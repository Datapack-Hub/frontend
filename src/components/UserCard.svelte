<script lang="ts">
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
  <div
    class="my-2 flex w-full rounded-xl bg-new-white-300 p-2 dark:bg-stone-800">
    <img
      src="{person?.profile_icon}"
      alt="{person?.username}'s profile picture"
      class="float-left mr-2 h-16 w-16 rounded-full" />
    <div>
      <a href="/user/{person?.username.toLowerCase()}"
        ><h1 class="mr-2 font-brand text-xl font-bold dark:text-white">
          {person?.username}
        </h1></a>
      <span class="{person?.role}-text font-brand font-bold"
        >{titleCase(person?.role)}</span>
      <p class="line-clamp-1 font-brand dark:text-stone-300">{person?.bio}</p>
    </div>
  </div>
</a>
