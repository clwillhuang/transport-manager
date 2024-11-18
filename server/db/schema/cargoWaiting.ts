import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, unique, date } from 'drizzle-orm/pg-core';
import { saves } from './save'
import { stations } from './station';
import { cargoes } from './cargo';

// Represent data about cargo waiting at station atStationId, which originated at fromStationId, and wants to go to viaStationId
// If viaStationId is null, the cargo can go to any station.
export const cargoWaiting = pgTable('cargoes_waiting', {
  id: serial('id').primaryKey(),
  saveId: integer('save_id').notNull().references(() => saves.id, {onDelete: 'cascade'}),
  atStationId: integer('at_station_id').notNull().references(() => stations.id, {onDelete: 'cascade'}),
  fromStationId : integer('from_station_id').notNull().references(() => stations.id, {onDelete: 'cascade'}),
  viaStationId: integer('via_station_id').references(() => stations.id, {onDelete: 'cascade'}),
  cargoId: integer('cargo_id').notNull().references(() => cargoes.id, {onDelete: 'cascade'}),
  units: integer('units').notNull().default(0),
  lastUpdated: date('last_updated', { mode: 'date' })
}, (cargoWaiting) => {
  return {
    unique_cargo: unique('unique_cargo_waiting_entry').on(cargoWaiting.atStationId, cargoWaiting.fromStationId, cargoWaiting.viaStationId, cargoWaiting.cargoId)
  }
})

export const cargoWaitingRelations = relations(cargoWaiting, ({ one }) => ({
  cargoType: one(cargoes, {
    fields: [cargoWaiting.cargoId],
    references: [cargoes.id],
    relationName: 'cargo_type',
  }),
  // many cargoWaiting to one origin station
  cargoFromStationWaiting: one(stations, {
    fields: [cargoWaiting.fromStationId],
    references: [stations.id],
    relationName: 'cargo_from_station_waiting',
  }),
  // many cargoWaiting to one via station
  cargoViaStationWaiting: one(stations, {
    fields: [cargoWaiting.viaStationId],
    references: [stations.id],
    relationName: 'cargo_via_station_waiting',
  }),
  // many cargoWaiting to one at station
  cargoAtStationWaiting: one(stations, {
    fields: [cargoWaiting.atStationId],
    references: [stations.id],
    relationName: 'cargo_at_station_waiting',
  })
}));


export type CargoWaiting = typeof cargoWaiting.$inferSelect;
