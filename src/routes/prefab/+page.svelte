<script lang="ts">
	/** @type {import('./$types').PageLoad} */
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="main-container show">
	<div class="stream-area">
		<div class="video-stream">
			<img
				id="my_video_1"
				class="map-img anim"
				width="640px"
				height="267px"
				src={data.prefab.Files.Prefix + data.prefab.Files.FileRelativePaths[0]}
				alt={data.prefab.PublicName}
			/>
			<div class="video-detail">
				<div class="video-content">
					<!-- <div class="video-p-wrapper anim" style="--delay: .1s"> -->
					<!-- 	<div class="author-img__wrapper video-author video-p"> -->
					<!-- 		<svg -->
					<!-- 			viewBox="0 0 24 24" -->
					<!-- 			fill="none" -->
					<!-- 			stroke="currentColor" -->
					<!-- 			stroke-width="3" -->
					<!-- 			stroke-linecap="round" -->
					<!-- 			stroke-linejoin="round" -->
					<!-- 			class="feather feather-check" -->
					<!-- 		> -->
					<!-- 			<path d="M20 6L9 17l-5-5" /> -->
					<!-- 		</svg> -->
					<!-- 		<img -->
					<!-- 			class="author-img" -->
					<!-- 			src="https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" -->
					<!-- 		/> -->
					<!-- 	</div> -->
					<!-- 	<div class="video-p-detail"> -->
					<!-- 		<div class="video-p-name">Andy William</div> -->
					<!-- 		<div class="video-p-sub">1,980,893 subscribers</div> -->
					<!-- 	</div> -->
					<!-- 	<div class="button-wrapper"> -->
					<!-- 		<button class="like"> -->
					<!-- 			<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> -->
					<!-- 				<path -->
					<!-- 					d="M21.435 2.582a1.933 1.933 0 00-1.93-.503L3.408 6.759a1.92 1.92 0 00-1.384 1.522c-.142.75.355 1.704 1.003 2.102l5.033 3.094a1.304 1.304 0 001.61-.194l5.763-5.799a.734.734 0 011.06 0c.29.292.29.765 0 1.067l-5.773 5.8c-.428.43-.508 1.1-.193 1.62l3.075 5.083c.36.604.98.946 1.66.946.08 0 .17 0 .251-.01.78-.1 1.4-.634 1.63-1.39l4.773-16.075c.21-.685.02-1.43-.48-1.943z" -->
					<!-- 				/> -->
					<!-- 			</svg> -->
					<!-- 			Share -->
					<!-- 		</button> -->
					<!-- 		<button class="like red"> -->
					<!-- 			<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> -->
					<!-- 				<path -->
					<!-- 					fill-rule="evenodd" -->
					<!-- 					clip-rule="evenodd" -->
					<!-- 					d="M15.85 2.5c.63 0 1.26.09 1.86.29 3.69 1.2 5.02 5.25 3.91 8.79a12.728 12.728 0 01-3.01 4.81 38.456 38.456 0 01-6.33 4.96l-.25.15-.26-.16a38.093 38.093 0 01-6.37-4.96 12.933 12.933 0 01-3.01-4.8c-1.13-3.54.2-7.59 3.93-8.81.29-.1.59-.17.89-.21h.12c.28-.04.56-.06.84-.06h.11c.63.02 1.24.13 1.83.33h.06c.04.02.07.04.09.06.22.07.43.15.63.26l.38.17c.092.05.195.125.284.19.056.04.107.077.146.1l.05.03c.085.05.175.102.25.16a6.263 6.263 0 013.85-1.3zm2.66 7.2c.41-.01.76-.34.79-.76v-.12a3.3 3.3 0 00-2.11-3.16.8.8 0 00-1.01.5c-.14.42.08.88.5 1.03.64.24 1.07.87 1.07 1.57v.03a.86.86 0 00.19.62c.14.17.35.27.57.29z" -->
					<!-- 				/> -->
					<!-- 			</svg> -->
					<!-- 			Liked -->
					<!-- 		</button> -->
					<!-- 	</div> -->
					<!-- </div> -->

					<div class="chat-vid__container">
						{#each data.prefab.Files.FileRelativePaths as imageUrl}
							<div class="chat-vid anim" style="--delay: .4s">
								<div class="chat-vid__wrapper">
									<img class="chat-vid__img" src={data.prefab.Files.Prefix + imageUrl} />
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div class="chat-stream">
				<div class="chat">
					<div class="chat-header anim">Map Details</div>
					<div class="message-container">
						<div class="message anim" style="--delay: .1s">
							<div class="map-details-icon video-p">
								<svg xmlns="http://www.w3.org/2000/svg" height="20" width="15" viewBox="0 0 384 512"
									><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
										fill="#808191"
										d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
									/></svg
								>
							</div>
							<div class="msg-wrapper">
								<div class="msg__name video-p-name">
									{data.prefab.AssetStats.PlaysAllTime} Total Plays
								</div>
							</div>
						</div>
						<div class="message anim" style="--delay: .1s">
							<div class="map-details-icon video-p">
								<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"
									><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
										fill="#808191"
										d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"
									/></svg
								>
							</div>
							<div class="msg-wrapper">
								<div class="msg__name video-p-name">
									{data.prefab.AssetStats.PlaysRecent} Recent Plays
								</div>
							</div>
						</div>
						<div class="message anim" style="--delay: .1s">
							<div class="map-details-icon video-p">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="20"
									width="22.5"
									viewBox="0 0 576 512"
									><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
										fill="#808191"
										d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
									/></svg
								>
							</div>
							<div class="msg-wrapper">
								<div class="msg__name video-p-name">
									{data.prefab.AssetStats.Favorites} Favorites
								</div>
							</div>
						</div>
						<div class="message anim" style="--delay: .1s">
							<div class="map-details-icon video-p">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="20"
									width="17.5"
									viewBox="0 0 448 512"
									><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
										fill="#808191"
										d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"
									/></svg
								>
							</div>
							<div class="msg-wrapper">
								<div class="msg__name video-p-name">{data.prefab.PublishedDate.ISO8601Date}</div>
							</div>
						</div>
						<div class="message anim" style="--delay: .1s">
							<div class="map-details-icon video-p">
								<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"
									><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
										fill="#808191"
										d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
									/></svg
								>
							</div>
							<div class="msg-wrapper">
								<div class="msg__name video-p-name">Version {data.prefab.VersionNumber}</div>
							</div>
						</div>
						<div class="message anim" style="--delay: .1s">
							<div class="map-details-icon video-p">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="20"
									width="22.5"
									viewBox="0 0 576 512"
									><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
										fill="#808191"
										d="M248 0H208c-26.5 0-48 21.5-48 48V160c0 35.3 28.7 64 64 64H352c35.3 0 64-28.7 64-64V48c0-26.5-21.5-48-48-48H328V80c0 8.8-7.2 16-16 16H264c-8.8 0-16-7.2-16-16V0zM64 256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H224c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H184v80c0 8.8-7.2 16-16 16H120c-8.8 0-16-7.2-16-16V256H64zM352 512H512c35.3 0 64-28.7 64-64V320c0-35.3-28.7-64-64-64H472v80c0 8.8-7.2 16-16 16H408c-8.8 0-16-7.2-16-16V256H352c-15 0-28.8 5.1-39.7 13.8c4.9 10.4 7.7 22 7.7 34.2V464c0 12.2-2.8 23.8-7.7 34.2C323.2 506.9 337 512 352 512z"
									/></svg
								>
							</div>
							<div class="msg-wrapper">
								<div class="msg__name video-p-name">
									{data.prefab.CustomData.NumOfObjectsOnMap} Objects
								</div>
							</div>
						</div>
						<div class="message anim" style="--delay: .1s">
							<div class="map-details-icon video-p">
								<svg xmlns="http://www.w3.org/2000/svg" height="20" width="25" viewBox="0 0 640 512"
									><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
										fill="#808191"
										d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
									/></svg
								>
							</div>
							<div class="msg-wrapper">
								<div class="msg__name video-p-name">
									{data.prefab.CustomData.HasNodeGraph ? 'Scripting' : 'No Scripting'}
								</div>
							</div>
						</div>
						<div class="message anim" style="--delay: .1s">
							<div class="map-details-icon video-p">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="20"
									width="17.5"
									viewBox="0 0 448 512"
									><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
										fill="#808191"
										d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
									/></svg
								>
							</div>
							<div class="msg-wrapper">
								<div class="msg__name video-p-name">{data.prefab.Tags.join(', ')}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
