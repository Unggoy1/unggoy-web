<script lang="ts">
	import type { PageData } from './$types';
	import AssetGroup from '$lib/components/AssetGroup.svelte';
	import { ChevronRight } from '$lib/components/icons';
	// import BlogCarousel from '$lib/components/BlogCarousel.svelte';
	import { Map, Gamepad, Play, Crown } from '$lib/components/icons';
	export let data: PageData;
</script>

<svelte:head>
	<title>Unggoy - UGC Browser</title>
	<meta name="description" content="Halo Infinite UGC browser. Halo Infinite playlist maker." />
</svelte:head>

<style>
.welcome-banner {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(135deg, var(--container-bg) 0%, var(--button-bg) 100%);
	position: relative;
	overflow: hidden;
}

.welcome-banner::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: url('/placeholder.webp') center/cover;
	opacity: 0.1;
	z-index: 0;
}

.welcome-content {
	position: relative;
	z-index: 1;
	padding: 30px 40px;
	max-width: 1200px;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 330px;
}

.welcome-title {
	font-size: 32px;
	font-weight: 700;
	margin-bottom: 12px;
	color: var(--container-color);
	line-height: 1.2;
}

.welcome-description {
	font-size: 15px;
	line-height: 1.5;
	color: var(--container-color);
	margin-bottom: 24px;
	max-width: 700px;
	margin-left: auto;
	margin-right: auto;
	opacity: 0.9;
}

.features-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 20px;
	margin-top: 20px;
	max-width: 1000px;
	margin-left: auto;
	margin-right: auto;
}

.feature-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	padding: 20px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 12px;
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.1);
	transition: all 0.3s ease;
}

.feature-item:hover {
	background: rgba(255, 255, 255, 0.08);
	transform: translateY(-2px);
}

.feature-item :global(svg) {
	width: 32px;
	height: 32px;
	fill: var(--button-color);
	margin-bottom: 12px;
}

.feature-text h3 {
	font-size: 16px;
	font-weight: 600;
	margin-bottom: 4px;
	color: var(--container-color);
}

.feature-text p {
	font-size: 13px;
	color: var(--container-color);
	opacity: 0.8;
	line-height: 1.4;
}

/* Mobile responsive adjustments */
@media screen and (max-width: 900px) {
	.features-grid {
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		max-width: 500px;
	}
}

@media screen and (max-width: 769px) {
	.welcome-title {
		font-size: 26px;
	}

	.welcome-description {
		font-size: 14px;
	}

	.welcome-content {
		padding: 20px 24px;
		min-height: 280px;
	}

	.feature-item {
		padding: 16px 12px;
	}

	.feature-item :global(svg) {
		width: 28px;
		height: 28px;
	}

	.feature-text h3 {
		font-size: 14px;
	}

	.feature-text p {
		font-size: 12px;
	}
}

@media screen and (max-width: 500px) {
	.welcome-title {
		font-size: 24px;
	}

	.welcome-content {
		padding: 16px 20px;
		min-height: 250px;
	}

	.features-grid {
		max-width: 400px;
		gap: 12px;
	}

	.feature-item {
		padding: 14px 10px;
	}
}
</style>

<div class="main-container">
	<div class="main-blogs">
		<div class="main-blog">
			<!-- Carousel commented out for future use -->
			<!-- <BlogCarousel posts={data.posts}></BlogCarousel> -->

			<!-- Welcome Banner -->
			<div class="welcome-banner">
				<div class="welcome-content">
					<h1 class="welcome-title">Welcome to Unggoy</h1>
					<p class="welcome-description">
						The premier Halo Infinite community hub for discovering, creating, and sharing custom content.
						Browse thousands of community-created maps, game modes, and prefabs, or build your perfect playlist.
					</p>

					<div class="features-grid">
						<div class="feature-item">
							<Map active={false}></Map>
							<div class="feature-text">
								<h3>Browse Maps</h3>
								<p>Discover community-created battlegrounds</p>
							</div>
						</div>

						<div class="feature-item">
							<Gamepad active={false}></Gamepad>
							<div class="feature-text">
								<h3>Game Modes</h3>
								<p>Find unique gameplay experiences</p>
							</div>
						</div>

						<div class="feature-item">
							<Play active={false}></Play>
							<div class="feature-text">
								<h3>Custom Playlists</h3>
								<p>Create and share your collections</p>
							</div>
						</div>

						<div class="feature-item">
							<Crown active={false}></Crown>
							<div class="feature-text">
								<h3>Browse Forgers</h3>
								<p>Discover talented creators and their work</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<AssetGroup assets={data.newMaps}>
		<a href="/browse?assetKind=Map">
			<div class="small-header">
				New Maps
				<ChevronRight></ChevronRight>
			</div>
		</a>
	</AssetGroup>
	<AssetGroup assets={data.trendingMaps}>
		<a href="/browse?assetKind=Map&sort=playsRecent&order=desc&hide343Assets=true">
			<div class="small-header">
				Trending Maps
				<ChevronRight></ChevronRight>
			</div>
		</a>
	</AssetGroup>
	<AssetGroup assets={data.newModes}>
		<a href="/browse?assetKind=UgcGameVariant">
			<div class="small-header">
				New Modes
				<ChevronRight></ChevronRight>
			</div>
		</a>
	</AssetGroup>
	<AssetGroup assets={data.trendingModes}>
		<a href="/browse?assetKind=UgcGameVariant&sort=playsRecent&order=desc&hide343Assets=true">
			<div class="small-header">
				Trending Modes
				<ChevronRight></ChevronRight>
			</div>
		</a>
	</AssetGroup>
	<AssetGroup assets={data.newPlaylists}>
		<a href="/browse/playlist">
			<div class="small-header">
				New Playlists
				<ChevronRight></ChevronRight>
			</div>
		</a>
	</AssetGroup>
	<AssetGroup assets={data.topFavoritedPlaylists}>
		<a href="/browse/playlist?&sort=favorites&order=desc">
			<div class="small-header">
				Top Playlists
				<ChevronRight></ChevronRight>
			</div>
		</a>
	</AssetGroup>
</div>
