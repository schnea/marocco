<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	let { data }: { data: PageData } = $props();
	let tallies = $state(data.horse_tallies);

	onMount(() => {
		const interval = setInterval(async () => {
			console.log('tick');
			await invalidateAll(); // refresh load() on this page
		}, 3000);
		return () => clearInterval(interval);
	});
</script>

<div class="body">
	<h1>PFERDERENNEN 2025 — EINSÄTZE</h1>

	<table class="charts-css column show-labels datasets-spacing-3 my-chart">
		<caption> Pferderennen 2025 </caption>

		<thead>
			<tr>
				<th scope="col"> Pferd </th>
				<th scope="col"> Total </th>
				<th scope="col"> Quote </th>
			</tr>
		</thead>
		<tbody>
			{#each tallies as horse}
				<tr>
					<th scope="row">{horse.name}</th>
					<td style="--size: {horse.percent}">{horse.quote}</td>
					<!-- <td>(x{horse.quote})</td> -->
				</tr>
			{/each}
		</tbody>
	</table>

	<div class="ticker-wrap">
		<div class="ticker">
			<div class="ticker__item">
				+++ Glückszahl ermittelt: Forscher*innen entdecken starke Gewinn-Resonanzen in der Zahl 11
				+++
			</div>
			<div class="ticker__item">+++ Skandal um Dr. Klinke: Hat er SCHON WIEDER gedopet? +++</div>
			<div class="ticker__item">+++ Aktuell +++</div>
			<div class="ticker__item">+++ Bank kurz vor dem Ruin: "Wir gewinnen so gut wie nie!" +++</div>
			<div class="ticker__item">
				+++ Es ist kein Glücksspiel: Pferd mit IQ von 230 bricht Roulette-Rekorde +++
			</div>
			<div class="ticker__item">
				+++ Mathematik-Nobelpreis für neue Black-Jack-Strategie verliehen: Prof. Sagorianskij
				empfiehlt "Immer All In!" +++
			</div>
			<div class="ticker__item">
				+++ Casino kurz vor dem Ruin: Noch nie so viele Gewinne so früh im Jahr gesichtet +++
			</div>
			<div class="ticker__item">
				+++ Riesiger Rubinklunker gefunden: Bitte an der Bar abholen +++
			</div>
			<div class="ticker__item">+++ Gewinne, Gewinne, Gewinne!!! +++</div>
		</div>
	</div>
</div>

<style>
	@keyframes pan {
		0% {
			background-position: 0% 0%;
		}
		100% {
			background-position: 100% 0%;
		}
	}

	.ticker-wrap {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		height: 4rem;
		background-color: #e41b17;
		box-sizing: content-box;
	}

	.ticker-wrap .ticker {
		display: inline-block;
		height: 4rem;
		line-height: 4rem;
		white-space: nowrap;
		padding-right: 100%;
		box-sizing: content-box;
		-webkit-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
		-webkit-animation-timing-function: linear;
		animation-timing-function: linear;
		-webkit-animation-name: ticker;
		animation-name: ticker;
		-webkit-animation-duration: 30s;
		animation-duration: 30s;
	}

	.ticker-wrap .ticker__item {
		display: inline-block;
		padding: 0 2rem;
		font-size: 2rem;
		color: white;
	}

	@-webkit-keyframes ticker {
		0% {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
			visibility: visible;
		}
		100% {
			-webkit-transform: translate3d(-100%, 0, 0);
			transform: translate3d(-100%, 0, 0);
		}
	}
	@keyframes ticker {
		0% {
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
			visibility: visible;
		}
		100% {
			-webkit-transform: translate3d(-100%, 0, 0);
			transform: translate3d(-100%, 0, 0);
		}
	}

	.my-chart {
		/*--color: transparent; /* disable per-bar coloring */

		position: relative;
		color: linear-gradient(
			to top,
			hsl(160 80% 50%) 0%,
			hsl(220 80% 55%) 50%,
			hsl(260 70% 40%) 100%
		);
	}
</style>
