// import { drizzle } from "drizzle-orm/node-postgres";
// import { Client } from "pg";
// import * as dotenv from 'dotenv';
// dotenv.config();

// const client = new Client({
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT!, 10),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// export async function connect_db() {
//     await client.connect();
//     return drizzle(client);
// }

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import 'dotenv/config';
import * as dotenv from 'dotenv';
dotenv.config();

import * as c1 from './schema/cargoesToIndustryTypesRelations';
import * as c2 from './schema/company';
import * as c3 from './schema/cargo';
import * as c4 from './schema/circle';
import * as i1 from './schema/industryType';
import * as i2 from './schema/industry';
import * as m from './schema/monthlystats';
import * as s from './schema/save';
import * as st from './schema/station';
import * as si from './schema/sign';
import * as t from './schema/town';
import * as w from './schema/cargoWaiting';
import * as csr from './schema/cargoesToStationsRelations';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const db = drizzle(pool, {schema: {...c1, ...c2, ...c3, ...c4, ...i1, ...i2, ...m, ...s, ...si, ...st, ...t, ...w, ...csr }});
