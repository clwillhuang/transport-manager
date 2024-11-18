import { varchar, integer, pgTable, serial, unique, boolean } from 'drizzle-orm/pg-core';
import { saves } from './save'
import { relations } from 'drizzle-orm';

export const signs = pgTable('signs', {
    id: serial('id').primaryKey(),
    isInGame: boolean('is_in_game').default(false),
    signId: integer('sign_id'),
    saveId: integer('save_id').notNull().references(() => saves.id, { onDelete: 'cascade' }),
    text: varchar('name', { length: 256 }).default('My Sign Text').notNull(),
    x: integer('x').notNull(),
    y: integer('y').notNull(),
}, (signs) => {
    return {
        unique_sign: unique('unique_sign_game').on(signs.saveId, signs.signId)
    }
})

export const signsRelations = relations(signs, ({ one }) => ({
    // many signs to one save game
    cargoesToSave: one(saves, {
        fields: [signs.saveId],
        references: [saves.id],
    }),
}));

export type Sign = typeof signs.$inferSelect;
