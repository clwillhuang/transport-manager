export declare const industries: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "industries";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "industries";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        industryId: import("drizzle-orm/pg-core").PgColumn<{
            name: "industry_id";
            tableName: "industries";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "industries";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        constructionDate: import("drizzle-orm/pg-core").PgColumn<{
            name: "construction_date";
            tableName: "industries";
            dataType: "date";
            columnType: "PgDate";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        industryTypeId: import("drizzle-orm/pg-core").PgColumn<{
            name: "industry_type_id";
            tableName: "industries";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        x: import("drizzle-orm/pg-core").PgColumn<{
            name: "x";
            tableName: "industries";
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
            tableName: "industries";
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
export declare const industriesRelations: import("drizzle-orm").Relations<"industries", {
    type: import("drizzle-orm").One<"industry_types", true>;
}>;
export type Industry = typeof industries.$inferSelect;
