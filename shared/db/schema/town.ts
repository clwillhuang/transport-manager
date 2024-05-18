import { varchar, integer, pgTable, serial, unique, boolean } from 'drizzle-orm/pg-core';
import { saves } from './save'


export const towns = pgTable('towns', {
  id: serial('id').primaryKey(),
  saveId: integer('save_id').notNull().references(() => saves.id, {onDelete: 'cascade'}),
  name: varchar('name', {length: 256}).default('My Town').notNull(),
  townId: integer('town_id'),
  population: integer('population').notNull().default(0),
  isCity: boolean('is_city').notNull().default(false),
  x: integer('x').notNull(),
  y: integer('y').notNull()
}, (towns) => {
  return {
    unique_town: unique('unique_town_game').on(towns.saveId, towns.townId)
  }
})

// export const townsRelations = relations(towns, ({ many, one }) => ({
//   // many towns to many industry types
//   townsToIndustryTypes: many(townsToIndustryTypes),
//   // many towns to one save game
//   townsToSave: one(saves, {
//     fields: [towns.saveId],
//     references: [saves.id],
//   }),
// }));


export type Town = typeof towns.$inferSelect;
