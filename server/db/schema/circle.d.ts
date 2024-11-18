export type CircleType = 'manhattan' | 'euclidean';
export declare const circleTypeEnum: import("drizzle-orm/pg-core").PgEnum<["manhattan", "euclidean"]>;
export declare const circles: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "circles";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "circles";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        saveId: import("drizzle-orm/pg-core").PgColumn<{
            name: "save_id";
            tableName: "circles";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        text: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "circles";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        x: import("drizzle-orm/pg-core").PgColumn<{
            name: "x";
            tableName: "circles";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        y: import("drizzle-orm/pg-core").PgColumn<{
            name: "y";
            tableName: "circles";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        radius: import("drizzle-orm/pg-core").PgColumn<{
            name: "radius";
            tableName: "circles";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        color: import("drizzle-orm/pg-core").PgColumn<{
            name: "color";
            tableName: "circles";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        circleType: import("drizzle-orm/pg-core").PgColumn<{
            name: "circle_type";
            tableName: "circles";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "manhattan" | "euclidean";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: ["manhattan", "euclidean"];
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const circlesRelations: import("drizzle-orm").Relations<"circles", {
    save: import("drizzle-orm").One<"saves", true>;
}>;
export type Circle = typeof circles.$inferSelect;
