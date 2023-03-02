<script>
  import { page } from '$app/stores';
</script>

<p>You've encountered an error</p>
<p>{$page.error?.message}</p>