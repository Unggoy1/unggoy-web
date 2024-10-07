<script>
	import { page } from '$app/stores';
</script>

<div class="no-results">
	<div>
		<img src="/superintendent_sad.webp" alt="Superintendent Sad" />
		<div>{$page.status} {$page.error.message}</div>
		<div>Pardon the error</div>
		<div>If you think this error is a mistake please let us know</div>
	</div>
</div>
