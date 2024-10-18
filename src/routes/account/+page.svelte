<script>
	import { userDelete } from '$lib/api/user';

	let isDeleting = false;

	async function handleDeleteAccount() {
		isDeleting = true;
		// Simulating an API call
		await userDelete();
		isDeleting = false;
	}
</script>

<div class="main-container">
	<h1>Account Settings</h1>

	<div class="bg-white shadow rounded-lg delete-container">
		<h2 class="text-xl font-semibold mb-4">Delete Account</h2>
		<p class="mb-4 text-gray-600">
			Warning: This action cannot be undone. All of your data will be permanently deleted.
		</p>

		<button
			class=""
			on:click={() => {
				if (
					confirm(
						'Are you absolutely sure? This action cannot be undone. This will permanently delete your account and remove your data from our servers.'
					)
				) {
					handleDeleteAccount();
				}
			}}
			disabled={isDeleting}
		>
			{isDeleting ? 'Deleting...' : 'Delete Account'}
		</button>
	</div>
</div>

<style>
	.delete-container {
		padding: 16px 24px 24px;
		background-color: var(--container-bg);
		border-radius: 8px;
	}

	.delete-container h2 {
		font-size: 20px;
		line-height: 28px;
		font-weight: 600;
	}
	button {
		background-color: #e23636;
		color: #fff;
		border-radius: 6px;
		font-weight: 600;
		font-size: 14px;
		padding: 10px 16px;
	}
	button:hover {
		background-color: #7a3838;
	}
</style>
