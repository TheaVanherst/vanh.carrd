<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    import client from "$lib/settings/sanityClient.js";

    import imageUrlBuilder from "@sanity/image-url";

    export let
		image = null,
		width = 1000;

    let loadCheck,
		loaded = false;

    const urlFor = (source) => imageUrlBuilder(client).image(source);

    onMount(() => loadCheck.onload = () => loaded = true);
</script>

{#if browser && !!image?.asset}
	<div class:loaded>
		<img loading="lazy"
			 src =   { urlFor(image).width(width)}
			 alt =   { image?.alt }
			 bind:this={ loadCheck }/>
	</div>
{/if}

<style lang="scss">
	$backgroundSize: 800px;

	div {
		height:     100%;
		width:      100%;

		display:    flex; // fixes an issue with the padding at the bottom of images
		position:   relative;

		&:not(.loaded) { // this needs to be removed or cleaned up to fix lag.
			animation-duration: 2s;
			animation-fill-mode: forwards;
			animation-iteration-count: infinite;
			animation-name: placeHolderShimmer;
			animation-timing-function: linear;

			background: linear-gradient(to right,
					var(--backgroundAccent2) 8%,
					var(--backgroundAccent1) 18%,
					var(--backgroundAccent2) 33%);
			background-size: $backgroundSize 104px;}

		img {
			margin:     0;
			opacity:    0;
			width:      100%;
			height:     100%;
			object-fit: cover;
			transition: .3s cubic-bezier(0.33, 1, 0.68, 1);}

		&.loaded img {
				opacity: 1!important;}}

	@keyframes placeHolderShimmer {
		0% {    background-position:    0 0}
		100% {  background-position:    $backgroundSize 0}}
</style>