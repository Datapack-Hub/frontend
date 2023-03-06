<script>
  import { page } from '$app/stores';
</script>

<p>Well, well, well. Looks like silly Cobblestone did an oopsie. Let's blame him and then make him fix the bug, even though it's very likely not their fault and more the fault of sillybear not adding cors to some dumb api route. Anyway, here is your probably undescriptive and useless error (it probably says Internal Error or smth dumb like that idfk):</p>
<p>{$page.error?.message}</p>