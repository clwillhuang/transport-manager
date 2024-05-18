import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { industries } from './industry';
import { cargoes } from './cargo';
import { unique } from 'drizzle-orm/pg-core';

export const monthlyStats = pgTable('monthly_stats', {
  id: serial('id').primaryKey(), 
  year: integer('year').notNull(),
  month: integer('month').notNull(),
  industryId: integer('industry_id').notNull().references(() => industries.id, {onDelete: 'cascade'}),
  cargoId: integer('cargo_id').notNull().references(() => cargoes.id, {onDelete: 'cascade'}),
  stockpiledCargo: integer('stockpiled_cargo').default(0).notNull(),
  lastMonthProduction: integer('last_month_production').default(0).notNull(),
  lastMonthTransported: integer('last_month_transported').default(0).notNull(),
  lastMonthTransportedPercentage: integer('last_month_transported_percentage').default(0).notNull(),
}, (table) => {
  return {
    uniqueStats: unique('unique_time_and_industry').on(table.year, table.month, table.industryId, table.cargoId)
  };
})

export type MonthlyStats = typeof monthlyStats.$inferSelect;