export declare const saves: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "saves";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "saves";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        serverName: import("drizzle-orm/pg-core").PgColumn<{
            name: "server_name";
            tableName: "saves";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        gameVersion: import("drizzle-orm/pg-core").PgColumn<{
            name: "game_version";
            tableName: "saves";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        dedicatedFlag: import("drizzle-orm/pg-core").PgColumn<{
            name: "dedicated_flag";
            tableName: "saves";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        mapName: import("drizzle-orm/pg-core").PgColumn<{
            name: "map_name";
            tableName: "saves";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        mapSeed: import("drizzle-orm/pg-core").PgColumn<{
            name: "map_seed";
            tableName: "saves";
            dataType: "number";
            columnType: "PgBigInt53";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        landscape: import("drizzle-orm/pg-core").PgColumn<{
            name: "landscape";
            tableName: "saves";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        startDate: import("drizzle-orm/pg-core").PgColumn<{
            name: "start_date";
            tableName: "saves";
            dataType: "number";
            columnType: "PgBigInt53";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        mapWidth: import("drizzle-orm/pg-core").PgColumn<{
            name: "map_width";
            tableName: "saves";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        mapHeight: import("drizzle-orm/pg-core").PgColumn<{
            name: "map_height";
            tableName: "saves";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const savesRelations: import("drizzle-orm").Relations<"saves", {
    companies: import("drizzle-orm").Many<"companies">;
    industryTypes: import("drizzle-orm").Many<"industry_types">;
    cargoes: import("drizzle-orm").Many<"cargoes">;
    circles: import("drizzle-orm").Many<"circles">;
}>;
export type Save = typeof saves.$inferSelect;
