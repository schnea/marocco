<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<h1>Welcome to HORSE</h1>
<div class="flex-container">
	{#each data.horse_tallies as horse}
		<div>
			<h2>#{horse.id}</h2>
			<h3>{horse.name}</h3>
			<h5>(x{horse.quote})</h5>
			{#each horse.last_bets as bet}
				<form
					method="POST"
					action="?/delete"
					onsubmit={(e) => {
						if (!confirm('Eintrag löschen?')) {
							e.preventDefault();
						}
					}}
				>
					<p>
						{bet.amount} Ω
						<button>X</button>
					</p>
					<input type="hidden" name="id" value={bet.id} />
				</form>
			{/each}
			<form method="POST" action="?/add">
				<label>
					<input type="hidden" name="horse" value={horse.id} />
					<input name="amount" type="number" autocomplete="off" placeholder="Ω" />
				</label>
			</form>
		</div>
	{/each}
</div>

<style>
	.flex-container {
		display: flex;
		background-color: DodgerBlue;
		justify-content: space-evenly;
	}
	.flex-container > div {
		background-color: #f1f1f1;
		margin: 10px;
		padding: 20px;
		flex: 1 1 0;
		width: 0;
		/* font-size: 30px; */
	}

	.flex-container > div > form > p {
		text-align: end;
		/* font-size: 30px; */
	}

	input {
		width: 80%;
		float: right;
		box-sizing: border-box;
		/* font-size: 30px; */
	}

	input[type='number'] {
		-moz-appearance: textfield;
		-moz-placeholder {
			text-align: right;
		}
	}

	h3,
	h2 {
		text-align: center;
		margin-bottom: 0;
	}
	h5 {
		text-align: center;
		margin-top: 0;
	}
</style>
