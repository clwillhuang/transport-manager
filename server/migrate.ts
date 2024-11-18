import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from 'pg';
import 'dotenv/config';
import * as dotenv from 'dotenv';
dotenv.config();

const connection = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const migrateDB = async () => {
    try {
        const db = drizzle(connection);
        await connection.connect();
        await migrate(db, {
            migrationsFolder: "./drizzle",
        });
        console.log("Migrations complete");
    } catch (error) {
        console.error("Error migrating database:", error);
    } finally {
        await connection.end();
    }
};

migrateDB();
