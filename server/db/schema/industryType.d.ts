export declare const industryTypes: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "industry_types";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "industry_types";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        industryTypeId: import("drizzle-orm/pg-core").PgColumn<{
            name: "industry_type_id";
            tableName: "industry_types";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        saveId: import("drizzle-orm/pg-core").PgColumn<{
            name: "save_id";
            tableName: "industry_types";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "industry_types";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        hasHeliport: import("drizzle-orm/pg-core").PgColumn<{
            name: "has_heliport";
            tableName: "industry_types";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        hasDock: import("drizzle-orm/pg-core").PgColumn<{
            name: "has_dock";
            tableName: "industry_types";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        hex: import("drizzle-orm/pg-core").PgColumn<{
            name: "hex";
            tableName: "industry_types";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const industryTypesRelation: import("drizzle-orm").Relations<"industry_types", {
    cargoesToIndustryTypes: import("drizzle-orm").Many<"cargos_to_industry_types">;
    industries: import("drizzle-orm").Many<"industries">;
    industryTypesToSave: import("drizzle-orm").One<"saves", true>;
}>;
export type IndustryType = typeof industryTypes.$inferSelect;
