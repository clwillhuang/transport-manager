import { db } from '~shared/db/setup';
import { Cargo, cargoes } from '~shared/db/schema/cargo';

interface CargoData {
    cargoId: number;
    name: string;
    label: string;
    weight?: number;
    value?: number;
    isPass?: boolean;
    isM?: boolean;
    isE?: boolean;
    isA?: boolean;
    isB?: boolean;
    isP?: boolean;
    isL?: boolean;
    isR?: boolean;
    isH?: boolean;
    isC?: boolean;
    townEffect?: number;
}

function isCargoData(data: any): data is CargoData {
    return (
        typeof data.name === 'string' &&
        typeof data.label === 'string' &&
        typeof data.cargoId === 'number' &&
        (typeof data.weight === 'undefined' || typeof data.weight === 'number') &&
        (typeof data.value === 'undefined' || typeof data.value === 'number') &&
        typeof data.isPass === 'boolean' &&
        typeof data.isM === 'boolean' &&
        typeof data.isE === 'boolean' &&
        typeof data.isA === 'boolean' &&
        typeof data.isB === 'boolean' &&
        typeof data.isP === 'boolean' &&
        typeof data.isL === 'boolean' &&
        typeof data.isR === 'boolean' &&
        typeof data.isH === 'boolean' &&
        typeof data.isC === 'boolean' &&
        typeof data.townEffect === 'number'
    );
}

export async function parseCargo(data: any, saveId: number) {
    if (!isCargoData(data)) {
        throw Error("Unexpected data.");
    }

    const rowData: Omit<Cargo, 'id'> = {
        saveId: saveId,
        cargoId: data.cargoId,
        name: data.name,
        label: data.label,
        weight: data.weight,
        value: data.value,
        isPassenger: data.isPass ?? false,
        isMail: data.isM ?? false,
        isExpress: data.isE ?? false,
        isArmoured: data.isA ?? false,
        isBulk: data.isB ?? false,
        isPieceGoods: data.isP ?? false,
        isLiquid: data.isL ?? false,
        isRefrigerated: data.isR ?? false,
        isHazardous: data.isH ?? false,
        isCovered: data.isC ?? false,
        townEffect: data.townEffect ?? 0,
        grfData: {},
    }

    await db
        .insert(cargoes)
        .values({ ...rowData })
        .onConflictDoUpdate({
            target: [cargoes.saveId, cargoes.cargoId],
            set: { ...rowData }
        })
        .returning();

    return true
}
