<script>
	let { children } = $props();
</script>

<nav>
	<a href="/">home</a>
	<a href="/cashout">$$$</a>
	<a href="/ticker">TICKER</a>
</nav>

{@render children()}

<style>
	:global(body) {
		background-image: url('images/coins.png');
		background-size: 10%;
		animation: pan 240s linear infinite;
	}
</style>
