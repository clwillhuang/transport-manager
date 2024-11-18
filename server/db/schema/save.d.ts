export declare enum CargoPaymentModel {
    Vanilla = "vanilla"
}
export declare const cargoPaymentModelEnum: import("drizzle-orm/pg-core").PgEnum<[CargoPaymentModel]>;
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
        industryPack: import("drizzle-orm/pg-core").PgColumn<{
            name: "industry_pack";
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
        industryVersion: import("drizzle-orm/pg-core").PgColumn<{
            name: "industry_version";
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
        industryEconomy: import("drizzle-orm/pg-core").PgColumn<{
            name: "industry_economy";
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
        timeFetchedCargos: import("drizzle-orm/pg-core").PgColumn<{
            name: "time_fetched_cargos";
            tableName: "saves";
            dataType: "date";
            columnType: "PgDate";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        timeFetchedIndustryTypes: import("drizzle-orm/pg-core").PgColumn<{
            name: "time_fetched_industry_types";
            tableName: "saves";
            dataType: "date";
            columnType: "PgDate";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        timeFetchedIndustries: import("drizzle-orm/pg-core").PgColumn<{
            name: "time_fetched_industries";
            tableName: "saves";
            dataType: "date";
            columnType: "PgDate";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        timeFetchedStations: import("drizzle-orm/pg-core").PgColumn<{
            name: "time_fetched_stations";
            tableName: "saves";
            dataType: "date";
            columnType: "PgDate";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        timeFetchedMonthlyStats: import("drizzle-orm/pg-core").PgColumn<{
            name: "time_fetched_monthly_stats";
            tableName: "saves";
            dataType: "date";
            columnType: "PgDate";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        timeFetchedCompanies: import("drizzle-orm/pg-core").PgColumn<{
            name: "time_fetched_companies";
            tableName: "saves";
            dataType: "date";
            columnType: "PgDate";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        timeFetchedTowns: import("drizzle-orm/pg-core").PgColumn<{
            name: "time_fetched_towns";
            tableName: "saves";
            dataType: "date";
            columnType: "PgDate";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        cargoPaymentModel: import("drizzle-orm/pg-core").PgColumn<{
            name: "cargo_payment_model";
            tableName: "saves";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: CargoPaymentModel;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [CargoPaymentModel];
            baseColumn: never;
        }, {}, {}>;
        timeFetchedCargoWaiting: import("drizzle-orm/pg-core").PgColumn<{
            name: "time_fetched_cargo_waiting";
            tableName: "saves";
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
export declare const savesRelations: import("drizzle-orm").Relations<"saves", {
    companies: import("drizzle-orm").Many<"companies">;
    industryTypes: import("drizzle-orm").Many<"industry_types">;
    cargoes: import("drizzle-orm").Many<"cargoes">;
    circles: import("drizzle-orm").Many<"circles">;
}>;
export type Save = typeof saves.$inferSelect;
