<script lang="ts">
	export let recommended: boolean;
</script>

{#if !recommended}
	<svg class={$$props.class} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
		><path
			d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z"
		></path>
	</svg>
{:else}
	<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 64 67.2"
		><path
			fill="#cee7ee"
			d="M54.634 22.152v-3.727l-9.45-9.25h-3.81l-9.37-9.176-9.374 9.175h-3.81l-9.445 9.25v3.728L0 31.334l9.374 9.169v3.727l8.712 8.531v14.435l9.388-8.966 4.522 4.426 4.523-4.426 9.387 8.966V52.76l8.72-8.53v-3.725L64 31.328l-9.374-9.176zM32 56.037 6.76 31.327 32 6.619l25.237 24.71z"
		/><path
			fill="#cee7ee"
			d="m35.333 41.477-6.666-2.492V21.489l6.666 2.493zm1.112-.054v-17.55l4.413-2.31c.548-.286 1.142.24 1.142 1.012v15.202c0 .445-.208.844-.524 1.012l-5.031 2.63zm-13.92-17.245 5.03-2.63v17.546l-4.413 2.31c-.548.287-1.142-.24-1.142-1.012V25.19c0-.445.208-.844.524-1.012"
		/></svg
	>
{/if}
