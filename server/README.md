
## Database Setup

Run to generate migrations from schema:
```
npm run generate
```

Run the migration
```
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const connectionString = "..."
const sql = postgres(connectionString, { max: 1 })
const db = drizzle(sql);

await migrate(db, { migrationsFolder: "drizzle" });

await sql.end();
```
