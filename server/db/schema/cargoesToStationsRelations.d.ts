export declare const cargoesToStations: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "cargo_to_stations";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "cargo_to_stations";
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
            tableName: "cargo_to_stations";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        cargoId: import("drizzle-orm/pg-core").PgColumn<{
            name: "cargo_id";
            tableName: "cargo_to_stations";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        stationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "station_id";
            tableName: "cargo_to_stations";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        rating: import("drizzle-orm/pg-core").PgColumn<{
            name: "rating";
            tableName: "cargo_to_stations";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        lastUpdated: import("drizzle-orm/pg-core").PgColumn<{
            name: "last_updated";
            tableName: "cargo_to_stations";
            dataType: "date";
            columnType: "PgDate";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const cargoesToStationsRelations: import("drizzle-orm").Relations<"cargo_to_stations", {
    atStation: import("drizzle-orm").One<"stations", true>;
    cargoWaiting: import("drizzle-orm").One<"cargoes", true>;
}>;
export type CargoToStationRelation = typeof cargoesToStations.$inferSelect;
