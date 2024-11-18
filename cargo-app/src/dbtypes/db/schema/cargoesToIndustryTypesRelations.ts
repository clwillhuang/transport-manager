import { relations } from 'drizzle-orm';
import { cargoes } from './cargo';
import { industryTypes } from './industryType';
import { primaryKey, pgTable, integer, boolean } from 'drizzle-orm/pg-core';

// many cargoes to many industry types
export const cargoesToIndustryTypes = pgTable('cargos_to_industry_types', {
  cargoId: integer('cargo_id').notNull().references(() => cargoes.id, {onDelete: 'cascade'}),
  industryTypeId: integer('industrytype_id').notNull().references(() => industryTypes.id, {onDelete: 'cascade'}),
  accepts: boolean('accepts'),
}, (t) => ({
  pk: primaryKey(t.cargoId, t.industryTypeId),
}));

export type CargoToIndustryType = typeof cargoesToIndustryTypes.$inferSelect;

// many cargoes to many industry types
export const cargoesToIndustryTypesRelations = relations(cargoesToIndustryTypes, ({ one }) => ({
  industryType: one(industryTypes, {
    fields: [cargoesToIndustryTypes.industryTypeId],
    references: [industryTypes.id],
    relationName: 'industry_types_to_cargo',
  }),
  cargo: one(cargoes, {
    fields: [cargoesToIndustryTypes.cargoId],
    references: [cargoes.id],
    relationName: 'cargoes_to_industry_types',
  }),
}));
