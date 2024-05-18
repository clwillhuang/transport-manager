import { varchar, integer, pgTable, serial, unique, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { saves } from './save'
import { relations } from 'drizzle-orm';

export type CircleType = 'manhattan' | 'euclidean';

export const circleTypeEnum = pgEnum('circle_type', ['manhattan', 'euclidean']);

export const circles = pgTable('circles', {
    id: serial('id').primaryKey(),
    saveId: integer('save_id').notNull().references(() => saves.id, { onDelete: 'cascade' }),
    text: varchar('name', { length: 256 }).notNull().default('Distance Measure'),
    x: integer('x').notNull(),
    y: integer('y').notNull(),
    radius: integer('radius').notNull(),
    color: varchar('color', { length: 8}).notNull().default('000000ff'), // hex color
    circleType: circleTypeEnum('circle_type').default('euclidean').notNull()
}, (circles) => {
    return {
        unique_circle: unique('unique_circle_game').on(circles.saveId, circles.x, circles.y, circles.circleType)
    }
})

export const circlesRelations = relations(circles, ({ one }) => ({
    // many circles to one save game
    save: one(saves, {
        fields: [circles.saveId],
        references: [saves.id],
    }),
}));

export type Circle = typeof circles.$inferSelect;
