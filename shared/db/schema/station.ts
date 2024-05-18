import { varchar, integer, pgTable, serial, unique, boolean } from 'drizzle-orm/pg-core';
import { companies } from './company';
import { saves } from './save';
import { relations } from 'drizzle-orm';
import { cargoesToStations } from './cargoesToStationsRelations';

export const stations = pgTable('stations', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    stationId: integer('station_id'),
    companyId: integer('company_id').notNull().references(() => companies.id, { onDelete: 'cascade' }),
    saveId: integer('save_id').notNull().references(() => saves.id, { onDelete: 'cascade' }),
    hasTrain: boolean('has_train').notNull().default(false),
    hasTruck: boolean('has_truck').notNull().default(false),
    hasBus: boolean('has_bus').notNull().default(false),
    hasAirport: boolean('has_airport').notNull().default(false),
    hasDock: boolean('has_dock').notNull().default(false),
    hasAny: boolean('has_any').notNull().default(false),
    x: integer('x').notNull(),
    y: integer('y').notNull()
}, (stations) => {
    return {
        unique_station: unique('unique_station_game').on(stations.saveId, stations.stationId)
    }
})

// Many stations to one company
export const stationRelations = relations(stations, ({ one, many }) => ({
    owner: one(companies, {
        fields: [stations.companyId],
        references: [companies.id],
    }),
    cargoStatistics: many(cargoesToStations)
}));

export type Station = typeof stations.$inferSelect;