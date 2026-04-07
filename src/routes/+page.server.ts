import { Bookie } from '$lib/bookie';
import { horse } from '$lib/server/db/schema';
import type { Horse, Race } from '$lib/bookie';
import type { PageServerLoad } from './$types';

const bookie = new Bookie();

export const load: PageServerLoad = async ({ url }) => {
	var race: number = url.searchParams.get('race') ?? 1;
	var horses = await bookie.get_horses();
	var tallies = await Promise.all(
		horses.map(async (h: Horse) => ({
			name: h.name,
			id: h.id,
			total: await bookie.get_total_bet(race, h),
			quote: await bookie.get_quote(race, h),
			last_bets: (await bookie.get_last_five_bets(race, h)).reverse()
		}))
	);
	console.log(tallies);
	return {
		horse_tallies: tallies
	};
};

export const actions = {
	add: async ({ request }) => {
		const data = await request.formData();
		bookie.add_bet(data.get('race'), data.get('horse'), data.get('amount'));
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		bookie.delete_bet(data.get('id'));
	}
};
