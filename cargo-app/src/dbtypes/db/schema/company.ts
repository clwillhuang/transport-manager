import { relations } from 'drizzle-orm';
import { varchar, integer, pgTable, serial, date, boolean, unique } from 'drizzle-orm/pg-core';
import { saves } from './save';
import { stations } from './station';

export const companies = pgTable('companies', {
    id: serial('id').primaryKey(),
    companyId: integer('company_id'),
    saveId: integer('save_id').notNull().references(() => saves.id, {onDelete: 'cascade'}),
    name: varchar('name', { length: 256 }),
    managerName: varchar('manager_name', { length: 256 }).notNull().default('Firstname Lastname'),
    color: integer('color').notNull().default(0),
    startDate: date('start_date', { mode: 'date' }),
    isAI: boolean('is_ai').default(true),
    trains: integer('trains').default(0).notNull(),
    lorries: integer('lorries').default(0).notNull(),
    buses: integer('buses').default(0).notNull(),
    planes: integer('planes').default(0).notNull(),
    ships: integer('ships').default(0).notNull(),
    trainStations: integer('train_stations').default(0).notNull(),
    lorryStations: integer('lorry_stations').default(0).notNull(),
    busStations: integer('bus_stations').default(0).notNull(),
    airports: integer('airports').default(0).notNull(),
    harbors: integer('harbors').default(0).notNull(),
}, (companies) => {
    return {
        unique_company: unique('unique_company_game').on(companies.saveId, companies.companyId)
    }
})

export const companiesRelations = relations(companies, ({ one, many }) => ({
    // Many companies to one save game
    type: one(saves, {
        fields: [companies.saveId],
        references: [saves.id],
    }),
    // Many stations to one company
    ownedStations: many(stations)
}));

export type Company = typeof companies.$inferSelect;