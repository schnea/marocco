import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { flip } from 'svelte/animate';

export const horse = sqliteTable('horse', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull()
});

export const race = sqliteTable('race', {
	id: integer('id').primaryKey({ autoIncrement: true })
});

export const bet = sqliteTable('bet', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	race: integer('race')
		.references(() => race.id)
		.notNull(),
	horse: integer('horse')
		.references(() => horse.id)
		.notNull(),
	amount: real('amount').notNull()
});
