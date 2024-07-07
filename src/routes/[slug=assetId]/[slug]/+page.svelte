<script lang="ts">
	/** @type {import('./$types').PageLoad} */
	import type { PageData } from './$types';
	import AssetKind from '../../../components/assetKind.svelte';
	import { user } from '../../../stores/user';

	export let data: PageData;
	$: previewImage = data.map.files.fileRelativePaths[0];
	const thumbnailPNG = data.map.files.fileRelativePaths.find(
		(item) => item === 'images/thumbnail.png'
	);
	const thumbnailJPG = data.map.files.fileRelativePaths.find(
		(item) => item === 'images/thumbnail.jpg'
	);

	const thumbnail = thumbnailJPG || thumbnailPNG;
	const updatePreview = (image) => {
		previewImage = image;
	};

	const groups = [[{ text: `Edit` }], [{ text: `Private` }], [{ text: `Delete` }]];
</script>

<svelte:head>
	<title>{data.map.name}</title>
	<meta name="description" content={data.map.description} />
	<meta property="og:title" content={data.map.name} /><meta
		name="twitter:card"
		content="summary_large_image"
	/><meta name="twitter:title" content={data.map.name} /><meta
		name="twitter:description"
		content={data.map.Description}
	/><meta property="og:image" content={data.map.thumbnailUrl} /><meta
		property="og:image:alt"
		content={'Thumbnail:' + data.map.name}
	/><meta name="twitter:img:src" content={data.map.thumbnailUrl} />
</svelte:head>

<div class="main-container show">
	<div class="asset-area">
		<div class="asset-container">
			<div class="asset-container">
				<img
					class="asset-img-lg"
					width="640px"
					height="267px"
					src={previewImage ? data.map.files.prefix + previewImage : '/unknown.webp'}
					alt={data.map.name}
				/>
				{#if $user}
					<button class="playlist-button">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
						>
							<path
								d="M13.9999 26.6667C13.9999 27.1971 14.2106 27.7058 14.5857 28.0809C14.9608 28.456 15.4695 28.6667 15.9999 28.6667C16.5304 28.6667 17.0391 28.456 17.4141 28.0809C17.7892 27.7058 17.9999 27.1971 17.9999 26.6667V18H26.6666C27.197 18 27.7057 17.7893 28.0808 17.4143C28.4559 17.0392 28.6666 16.5305 28.6666 16C28.6666 15.4696 28.4559 14.9609 28.0808 14.5858C27.7057 14.2108 27.197 14 26.6666 14H17.9999V5.33337C17.9999 4.80294 17.7892 4.29423 17.4141 3.91916C17.0391 3.54409 16.5304 3.33337 15.9999 3.33337C15.4695 3.33337 14.9608 3.54409 14.5857 3.91916C14.2106 4.29423 13.9999 4.80294 13.9999 5.33337V14H5.33325C4.80282 14 4.29411 14.2108 3.91904 14.5858C3.54397 14.9609 3.33325 15.4696 3.33325 16C3.33325 16.5305 3.54397 17.0392 3.91904 17.4143C4.29411 17.7893 4.80282 18 5.33325 18H13.9999V26.6667Z"
								fill="#CEE7EE"
							/>
						</svg>
					</button>
				{/if}
				<AssetKind assetKind={data.map.assetKind} lg={true} featured={data.map.featured}
				></AssetKind>
			</div>

			<div class="asset-detail">
				<div class="asset-content">
					<div class="preview-img-container">
						{#if data.map.files.fileRelativePaths.length > 0}
							{#each data.map.files.fileRelativePaths as imageUrl}
								<div class="asset-preview" on:click={() => updatePreview(imageUrl)}>
									<div class="asset-preview-wrapper">
										<img
											class="asset-preview-img"
											alt="preview 1"
											src={data.map.files.prefix + imageUrl}
											class:active-img={imageUrl === previewImage}
										/>
									</div>
								</div>
							{/each}
						{:else}
							<div class="asset-preview">
								<div class="asset-preview-wrapper">
									<img
										class="asset-preview-img"
										alt="preview 1"
										src={'/unknown.webp'}
										class:active-img={true}
									/>
								</div>
							</div>
						{/if}
					</div>

					<div class="asset-title">{data.map.name}</div>
					<div class="asset-description">
						{data.map.description}
					</div>
				</div>
			</div>
		</div>
		<div class="asset-aside">
			<div class="asset-details">
				<div class="asset-header-container">
					<div class="asset-header">Map Details</div>
				</div>
				<div class="aside-text">
					<div class="detail-icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
							><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
								d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
							/></svg
						>
					</div>
					<div class="detail-text">
						{data.map.playsAllTime} Total Plays
					</div>
				</div>
				<div class="aside-text">
					<div class="detail-icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
							><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
								d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"
							/></svg
						>
					</div>
					<div class="detail-text">
						{data.map.playsRecent} Recent Plays
					</div>
				</div>
				<div class="aside-text">
					<div class="detail-icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
							><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
								d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
							/></svg
						>
					</div>
					<div class="detail-text">{data.map.favorites} Favorites</div>
				</div>
				<div class="aside-text">
					<div class="detail-icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
							><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
								d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"
							/></svg
						>
					</div>
					<div class="detail-text">{new Date(data.map.publishedAt).toLocaleDateString()}</div>
				</div>
				<div class="aside-text">
					<div class="detail-icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
							><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
								d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
							/></svg
						>
					</div>
					<div class="detail-text">Version {data.map.version}</div>
				</div>
				<div class="aside-text">
					<div class="detail-icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
							><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
								d="M32 119.4C12.9 108.4 0 87.7 0 64C0 28.7 28.7 0 64 0c23.7 0 44.4 12.9 55.4 32H456.6C467.6 12.9 488.3 0 512 0c35.3 0 64 28.7 64 64c0 23.7-12.9 44.4-32 55.4V392.6c19.1 11.1 32 31.7 32 55.4c0 35.3-28.7 64-64 64c-23.7 0-44.4-12.9-55.4-32H119.4c-11.1 19.1-31.7 32-55.4 32c-35.3 0-64-28.7-64-64c0-23.7 12.9-44.4 32-55.4V119.4zM456.6 96H119.4c-5.6 9.7-13.7 17.8-23.4 23.4V392.6c9.7 5.6 17.8 13.7 23.4 23.4H456.6c5.6-9.7 13.7-17.8 23.4-23.4V119.4c-9.7-5.6-17.8-13.7-23.4-23.4zM128 160c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V160zM256 320h32c35.3 0 64-28.7 64-64V224h64c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V320z"
							/></svg
						>
					</div>
					<div class="detail-text">
						{data.map.numberOfObjects} Objects
					</div>
				</div>
				{#if data.map.hasNodeGraph}
					<div class="aside-text">
						<div class="detail-icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
								><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
									d="M418.4 157.9c35.3-8.3 61.6-40 61.6-77.9c0-44.2-35.8-80-80-80c-43.4 0-78.7 34.5-80 77.5L136.2 151.1C121.7 136.8 101.9 128 80 128c-44.2 0-80 35.8-80 80s35.8 80 80 80c12.2 0 23.8-2.7 34.1-7.6L259.7 407.8c-2.4 7.6-3.7 15.8-3.7 24.2c0 44.2 35.8 80 80 80s80-35.8 80-80c0-27.7-14-52.1-35.4-66.4l37.8-207.7zM156.3 232.2c2.2-6.9 3.5-14.2 3.7-21.7l183.8-73.5c3.6 3.5 7.4 6.7 11.6 9.5L317.6 354.1c-5.5 1.3-10.8 3.1-15.8 5.5L156.3 232.2z"
								/></svg
							>
						</div>
						<div class="detail-text">Scripting</div>
					</div>
				{/if}
				{#if !data.map.readOnlyClones}
					<div class="aside-text">
						<div class="detail-icon">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
								><path
									d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"
								/></svg
							>
						</div>
						<div class="detail-text">Cloneable</div>
					</div>
				{/if}
			</div>

			{#if data.map.tags.length}
				<div class="aside-container">
					<div class="aside-title">Tags</div>
					<div class="tag-wrapper">
						{#each data.map.tags as tag}
							<div class="tag">
								<a href="/browse?tags={tag}">
									<div class="tag-info">{tag}</div>
								</a>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<div class="aside-container">
				<div class="aside-title">Contributors</div>
				{#each data.map.contributors as contributor}
					<div class="contributor-container">
						<div class="contributor-text">
							<img class="contributor-img" alt="emblem name here" src={contributor.emblemPath} />
							<a href="/browse?gamertag={contributor.gamertag}">
								<div class="contributor-name">{contributor.gamertag}</div>
								<div class="contributor-tag">{contributor.serviceTag}</div>
							</a>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
