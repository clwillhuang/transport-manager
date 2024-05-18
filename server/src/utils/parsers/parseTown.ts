import { db } from '~shared/db/setup'; 
import { Town, towns } from '~shared/db/schema/town'

interface TownData {
    townId: number,
    name: string;
    population: number;
    isCity: boolean,
    x: number;
    y: number;
}

function isTownData(data: any): data is TownData {
  return (
    typeof data.townId === 'number' &&
    typeof data.name === 'string' &&
    typeof data.population === 'number' &&
    typeof data.isCity === 'boolean' &&
    typeof data.x === 'number' &&
    typeof data.y === 'number'
  )
}

export async function parseTown(data: any, saveId: number): Promise<boolean> {
  if (!isTownData(data)) {
    throw new Error("Unexpected data.", data);
  }

  const tableData: Omit<Town, 'id'> = {
    saveId,
    ...data
  }

  const insertedTown: Town[] = await db
    .insert(towns)
    .values({ ...tableData })
    .returning()
    .onConflictDoUpdate({
      target: [towns.saveId, towns.townId],
      set: { ...tableData },
    });

  // console.log(insertedTown);

  return true;
}
