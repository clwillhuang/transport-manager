// Represents the rating for cargo x at station y.
import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, unique, date } from 'drizzle-orm/pg-core';
import { saves } from './save'
import { stations } from './station';
import { cargoes } from './cargo';

export const cargoesToStations = pgTable('cargo_to_stations', {
    id: serial('id').primaryKey(),
    saveId: integer('save_id').notNull().references(() => saves.id, { onDelete: 'cascade' }),
    cargoId: integer('cargo_id').notNull().references(() => cargoes.id, { onDelete: 'cascade' }),
    stationId: integer('station_id').notNull().references(() => stations.id, { onDelete: 'cascade' }),
    rating: integer('rating').notNull().default(0),
    lastUpdated: date('last_updated', { mode: 'date' })
}, (table) => {
    return {
        uniqueStats: unique('unique_cargo_and_station').on(table.cargoId, table.stationId)
    };
})

// many cargoes to many industry types
export const cargoesToStationsRelations = relations(cargoesToStations, ({ one }) => ({
    atStation: one(stations, {
        fields: [cargoesToStations.stationId],
        references: [stations.id],
        relationName: 'location_of_waiting',
    }),
    cargoWaiting: one(cargoes, {
        fields: [cargoesToStations.cargoId],
        references: [cargoes.id],
        relationName: 'cargo_type_of_waiting',
    }),
}));

export type CargoToStationRelation = typeof cargoesToStations.$inferSelect;