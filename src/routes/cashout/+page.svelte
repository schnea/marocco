<script lang="ts">
	import type { PageData } from './$types';
	import 'charts.css';
	import { page } from '$app/state';

	let { data }: { data: PageData } = $props();
	let quote = $state(0);
	let stakes = $state(0);
	let raceNumber = $derived(page.url.searchParams.get('race') || 1);
</script>

<div class="cashout">
	<h1>💸💸💸 GEWINNBERECHNUNG 💸💸💸</h1>

	<h2>Rennen #{raceNumber}</h2>
	<h2>Winner:</h2>
	<select name="winner" bind:value={quote}>
		{#each data.horse_tallies as horse}
			<option value={horse.quote}>{horse.name}</option>
		{/each}
	</select>

	<h3>Gewinnquote: {quote}</h3>

	Einsatz:<input bind:value={stakes} />

	<h2>Gewinn: {Math.floor((quote * stakes) / 10) * 10}</h2>
</div>

<style>
	.cashout {
		/*margin: auto;*/
		display: flex;
		flex-direction: column;
		margin-left: auto;
		margin-right: auto;
		align-items: center;
		min-height: 100vh;
	}
</style>
