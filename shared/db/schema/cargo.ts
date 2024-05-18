import { relations } from 'drizzle-orm';
import { varchar, integer, pgTable, serial, unique, boolean, jsonb } from 'drizzle-orm/pg-core';
import { cargoesToIndustryTypes } from './cargoesToIndustryTypesRelations';
import { cargoesToStations } from './cargoesToStationsRelations';
import { saves } from './save'

export const cargoes = pgTable('cargoes', {
  id: serial('id').primaryKey(),
  saveId: integer('save_id').notNull().references(() => saves.id, {onDelete: 'cascade'}),
  cargoId: integer('cargo_id'),
  name: varchar('name', {length: 256}).notNull(),
  label: varchar('label', {length: 4}).notNull(),
  weight: integer('weight').default(0).notNull(),
  value: integer('value').default(0).notNull(),
  isPassenger: boolean('is_passenger').default(false),
  isMail: boolean('is_mail').default(false).notNull(),
  isExpress: boolean('is_express').default(false).notNull(),
  isArmoured: boolean('is_armoured').default(false).notNull(),
  isBulk: boolean('is_bulk').default(false).notNull(),
  isPieceGoods: boolean('is_piece_goods').default(false).notNull(),
  isLiquid: boolean('is_liquid').default(false).notNull(),
  isRefrigerated: boolean('is_refrigerated').default(false).notNull(),
  isCovered: boolean('is_covered').default(false).notNull(),
  isHazardous: boolean('is_hazardous').default(false).notNull(),
  townEffect: integer('town_effect').default(0).notNull(),
  grfData: jsonb('grf_data').notNull().default({})
}, (cargoes) => {
  return {
    unique_cargo: unique('unique_cargo_game').on(cargoes.saveId, cargoes.cargoId)
  }
})

export const cargoesRelations = relations(cargoes, ({ many, one }) => ({
  // many cargoes to many industry types
  cargoesToIndustryTypes: many(cargoesToIndustryTypes, {
    relationName: 'cargoes_to_industry_types'
  }),
  // many cargoes to many stations
  cargoesToStations: many(cargoesToStations, {
    relationName: 'cargo_type_of_waiting'
  }),
  // many cargoes to one save game
  cargoesToSave: one(saves, {
    fields: [cargoes.saveId],
    references: [saves.id],
    relationName: 'cargoes_in_save'
  }),
}));


export type Cargo = typeof cargoes.$inferSelect;
