export declare const monthlyStats: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "monthly_stats";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "monthly_stats";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        year: import("drizzle-orm/pg-core").PgColumn<{
            name: "year";
            tableName: "monthly_stats";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        month: import("drizzle-orm/pg-core").PgColumn<{
            name: "month";
            tableName: "monthly_stats";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        industryId: import("drizzle-orm/pg-core").PgColumn<{
            name: "industry_id";
            tableName: "monthly_stats";
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
            tableName: "monthly_stats";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        stockpiledCargo: import("drizzle-orm/pg-core").PgColumn<{
            name: "stockpiled_cargo";
            tableName: "monthly_stats";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        lastMonthProduction: import("drizzle-orm/pg-core").PgColumn<{
            name: "last_month_production";
            tableName: "monthly_stats";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        lastMonthTransported: import("drizzle-orm/pg-core").PgColumn<{
            name: "last_month_transported";
            tableName: "monthly_stats";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        lastMonthTransportedPercentage: import("drizzle-orm/pg-core").PgColumn<{
            name: "last_month_transported_percentage";
            tableName: "monthly_stats";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export type MonthlyStats = typeof monthlyStats.$inferSelect;
