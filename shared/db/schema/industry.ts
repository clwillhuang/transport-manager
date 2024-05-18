import { relations } from 'drizzle-orm';
import { varchar, integer, pgEnum, pgTable, serial, unique, uniqueIndex, date } from 'drizzle-orm/pg-core';
import { industryTypes } from './industryType';

export const industries = pgTable('industries', {
  id: serial('id').primaryKey(),
  industryId: integer('industry_id'),
  name: varchar('name', {length: 256}).notNull(),
  constructionDate: date('construction_date', {mode: 'date'}),
  industryTypeId: integer('industry_type_id').notNull().references(() => industryTypes.id, {onDelete: 'cascade'}),
  x: integer('x').notNull(),
  y: integer('y').notNull()
}, (industryTypes) => {
  return {
    uniqueIndustryPerGame: unique('unique_industry_per_game').on(industryTypes.industryId, industryTypes.industryTypeId)
  }
})

// Many industries to one industry type
export const industriesRelations = relations(industries, ({ one }) => ({
  type: one(industryTypes, {
    fields: [industries.industryTypeId],
    references: [industryTypes.id],
  }),
}));

export type Industry = typeof industries.$inferSelect;