export declare const cargoWaiting: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "cargoes_waiting";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "cargoes_waiting";
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
            tableName: "cargoes_waiting";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        atStationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "at_station_id";
            tableName: "cargoes_waiting";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        fromStationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "from_station_id";
            tableName: "cargoes_waiting";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        viaStationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "via_station_id";
            tableName: "cargoes_waiting";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        cargoId: import("drizzle-orm/pg-core").PgColumn<{
            name: "cargo_id";
            tableName: "cargoes_waiting";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        units: import("drizzle-orm/pg-core").PgColumn<{
            name: "units";
            tableName: "cargoes_waiting";
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
            tableName: "cargoes_waiting";
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
export declare const cargoWaitingRelations: import("drizzle-orm").Relations<"cargoes_waiting", {
    cargoType: import("drizzle-orm").One<"cargoes", true>;
    cargoFromStationWaiting: import("drizzle-orm").One<"stations", true>;
    cargoViaStationWaiting: import("drizzle-orm").One<"stations", false>;
    cargoAtStationWaiting: import("drizzle-orm").One<"stations", true>;
}>;
export type CargoWaiting = typeof cargoWaiting.$inferSelect;
