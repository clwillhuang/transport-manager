import { varchar, integer, pgTable, serial, boolean, unique, bigint, date, pgEnum } from 'drizzle-orm/pg-core';
import { companies } from './company';
import { relations } from 'drizzle-orm';
import { industryTypes } from './industryType';
import { cargoes } from './cargo';
import { circles } from './circle';

export enum CargoPaymentModel {
  Vanilla = 'vanilla',
}

export const cargoPaymentModelEnum = pgEnum('cargo_payment_model', [CargoPaymentModel.Vanilla]);

export const saves = pgTable('saves', {
  id: serial('id').primaryKey(),
  serverName: varchar('server_name', { length: 256 }),
  gameVersion: varchar('game_version', { length: 100 }),
  dedicatedFlag: boolean('dedicated_flag'),
  mapName: varchar('map_name', { length: 256 }),
  mapSeed: bigint('map_seed', { mode: 'number' }).notNull().default(0),
  landscape: integer('landscape').notNull().default(-1),
  startDate: bigint('start_date', { mode: 'number' }),
  mapWidth: integer('map_width').notNull(),
  mapHeight: integer('map_height').notNull(),
  industryPack: varchar('industry_pack', { length: 256 }),
  industryVersion: varchar('industry_version', { length: 256 }),
  industryEconomy: varchar('industry_economy', { length: 256 }),
  timeFetchedCargos: date('time_fetched_cargos', { mode: 'date' }),
  timeFetchedIndustryTypes: date('time_fetched_industry_types', { mode: 'date' }),
  timeFetchedIndustries: date('time_fetched_industries', { mode: 'date' }),
  timeFetchedStations: date('time_fetched_stations', { mode: 'date' }),
  timeFetchedMonthlyStats: date('time_fetched_monthly_stats', { mode: 'date' }),
  timeFetchedCompanies: date('time_fetched_companies', { mode: 'date' }),
  timeFetchedTowns: date('time_fetched_towns', { mode: 'date' }),
  cargoPaymentModel: cargoPaymentModelEnum('cargo_payment_model').default(CargoPaymentModel.Vanilla).notNull(),
  timeFetchedCargoWaiting: date('time_fetched_cargo_waiting', { mode: 'date' }),
}, (saves) => {
  return {
    server_name_index: unique('server_name_idx').on(saves.serverName),
  }
})

export const savesRelations = relations(saves, ({ many }) => ({
  companies: many(companies),
  industryTypes: many(industryTypes),
  cargoes: many(cargoes, {
    relationName: 'cargoes_in_save'
  }),
  circles: many(circles)
}));

export type Save = typeof saves.$inferSelect;
