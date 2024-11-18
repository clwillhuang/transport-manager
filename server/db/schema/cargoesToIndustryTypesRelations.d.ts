export declare const cargoesToIndustryTypes: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "cargos_to_industry_types";
    schema: undefined;
    columns: {
        cargoId: import("drizzle-orm/pg-core").PgColumn<{
            name: "cargo_id";
            tableName: "cargos_to_industry_types";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        industryTypeId: import("drizzle-orm/pg-core").PgColumn<{
            name: "industrytype_id";
            tableName: "cargos_to_industry_types";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        accepts: import("drizzle-orm/pg-core").PgColumn<{
            name: "accepts";
            tableName: "cargos_to_industry_types";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export type CargoToIndustryType = typeof cargoesToIndustryTypes.$inferSelect;
export declare const cargoesToIndustryTypesRelations: import("drizzle-orm").Relations<"cargos_to_industry_types", {
    industryType: import("drizzle-orm").One<"industry_types", true>;
    cargo: import("drizzle-orm").One<"cargoes", true>;
}>;
