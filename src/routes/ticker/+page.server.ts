import { Bookie } from "$lib/bookie";
import { horse } from "$lib/server/db/schema";
import type { Horse } from "$lib/bookie";
import type { PageServerLoad } from './$types';

const bookie = new Bookie();

export const load: PageServerLoad = async () => {
    var horses = await bookie.get_horses();
    var tallies = await Promise.all(horses.map(async (h: Horse) => ({
        name: h.name,
        id: h.id,
        percent: await bookie.get_total_bet(h) / await bookie.get_net_total(),
        quote: await bookie.get_quote(h)
    })));


    return {
        horse_tallies: tallies
    };
}