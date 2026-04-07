<script>
	let { children } = $props();
	import { page } from '$app/state';

	let race = $derived(page.url.searchParams.get('race') || 1);
</script>

<nav>
	<a href="/?race={race}">home</a>
	<a href="/cashout?race={race}">$$$</a>
	<a href="/ticker?race={race}">TICKER</a>
</nav>

{@render children()}

<style>
	:global(body) {
		background-image: url('images/coins.png');
		background-size: 10%;
		animation: pan 240s linear infinite;
	}
</style>
