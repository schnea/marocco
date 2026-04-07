import { drizzle } from 'drizzle-orm/better-sqlite3';
import { horse, bet } from '$lib/server/db/schema';
import { sql, and, eq, sum, desc } from 'drizzle-orm';
import { db } from './server/db';

export interface Horse {
	id: number;
	name: string;
}

export interface Race {
	id: number;
}

export interface Bet {
	id: number;
	race: number;
	horse: number;
	amount: number;
}

export class Bookie {
	/**
	 * class to interact with db
	 */

	async add_horse(name: string): Promise<void> {
		await db.insert(horse).values({ name: name });
	}

	async add_bet(race_id: number, horse_id: number, amount: number): Promise<void> {
		await db.insert(bet).values({ race: race_id, horse: horse_id, amount: amount }).returning();
		const horse_name = await db.select().from(horse).where(eq(horse_id, horse.id));
		// console.log(horse_name[0].name);
		// try to reach printer to print ticket
		var printer_url = `http://localhost:8000/print/${race_id}/${horse_id}/${horse_name[0].name}/${amount}`;
		try {
			await fetch(printer_url);
		} catch (error) {
			console.error(printer_url);
			console.error('printer offline');
		}
	}

	async delete_bet(id: number): Promise<void> {
		await db.delete(bet).where(eq(bet.id, id));
	}

	async get_horses(): Promise<Horse[]> {
		return await db.select().from(horse);
	}

	async get_total_bet(race: number, horse: Horse): Promise<number> {
		return (
			(
				await db
					.select({ value: sum(bet.amount).mapWith(Number) })
					.from(bet)
					.where(and(eq(bet.race, race), eq(bet.horse, horse.id)))
			)[0].value ?? 0
		);
	}

	async get_last_five_bets(race: number, horse: Horse): Promise<Bet[]> {
		return await db
			.select()
			.from(bet)
			.where(and(eq(bet.race, race), eq(bet.horse, horse.id)))
			.orderBy(desc(bet.id))
			.limit(5);
	}

	async get_net_total(race: number): Promise<number> {
		var total: number =
			(
				await db
					.select({ value: sum(bet.amount).mapWith(Number) })
					.from(bet)
					.where(eq(bet.race, race))
			)[0].value ?? 0;
		return Math.floor(total / 2); // house takes 50%
	}

	async get_quote(race: number, horse: Horse) {
		var net_pool = await this.get_net_total(race);
		var total_bet = await this.get_total_bet(race, horse);
		return total_bet > 0 ? (net_pool / total_bet).toFixed(2) : 0;
	}
}
