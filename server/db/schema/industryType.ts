import { relations } from 'drizzle-orm';
import { varchar, pgTable, serial, unique, boolean, integer } from 'drizzle-orm/pg-core';
import { cargoesToIndustryTypes } from './cargoesToIndustryTypesRelations';
import { saves } from './save';
import { industries } from './industry';

export const industryTypes = pgTable('industry_types', {
  id: serial('id').primaryKey(),
  industryTypeId: integer('industry_type_id'),
  saveId: integer('save_id').notNull().references(() => saves.id, {onDelete: 'cascade'}),
  name: varchar('name', {length: 256}).notNull().default("My Industry"),
  hasHeliport: boolean('has_heliport').default(false).notNull(),
  hasDock: boolean('has_dock').default(false).notNull(),
  hex: varchar('hex', {length: 8}).notNull().default("000000ff"),
}, (industryTypes) => {
  return {
    uniquePerGame: unique('unique_per_game').on(industryTypes.saveId, industryTypes.industryTypeId)
  }
})

export const industryTypesRelation = relations(industryTypes, ({ many, one }) => ({
  // many cargoes to many industry types
  cargoesToIndustryTypes: many(cargoesToIndustryTypes, {
    relationName: 'industry_types_to_cargo'
  }),
  // many industries to one type 
  industries: many(industries),
  // many types to one save game
  industryTypesToSave: one(saves, {
    fields: [industryTypes.saveId],
    references: [saves.id],
  })
}));

export type IndustryType = typeof industryTypes.$inferSelect;