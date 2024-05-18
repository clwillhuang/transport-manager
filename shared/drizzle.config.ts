import type { Config } from "drizzle-kit";
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: "./db/schema/",
  out: "./drizzle",
  dbCredentials: {
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  },
  driver: "pg"
} satisfies Config;