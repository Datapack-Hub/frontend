<script>
  import { browser } from "$app/environment";
  import { invalidateAll } from "$app/navigation";
  import { removeCookie } from "$lib/globals/functions";
  import { windowWidth } from "$lib/globals/stores";

  function acceptCookies() {
    if (browser) {
      localStorage.setItem("acceptedCookies", "1");
      invalidateAll();
    }
  }

  // prob still a violation
  function denyCookies() {
    if (browser) {
      removeCookie("dph_token");
      localStorage.setItem("acceptedCookies", "1");
      invalidateAll();
    }
  }
</script>

<div
  class="fixed z-50 {$windowWidth > 768
    ? 'bottom-0'
    : 'top-0'} left-0 grid w-full grid-cols-2 rounded-lg bg-white p-3">
  <div>
    <p class="text-base font-bold md:text-lg lg:text-xl">
      Hey there, we've got some news—we use cookies on our site.
    </p>
    <p class="text-xs md:text-sm lg:text-base">
      They make this site tick. If you're cool with that, awesome—hit 'Accept.'
      Not your thing? That's cool too, hit 'Decline.' Check out our <a
        href="/privacy"
        class="underline">privacy policy</a> for details. Thanks!
    </p>
  </div>
  <div class="flex items-center justify-end gap-3">
    <button class="button-alt" on:click="{() => acceptCookies()}"
      >Accept</button>
    <button class="button-alt" on:click="{() => denyCookies()}">Decline</button>
    {#if $windowWidth > 768}
      <a href="/privacy" class="button-alt">Privacy Policy</a>
    {/if}
  </div>
</div>
