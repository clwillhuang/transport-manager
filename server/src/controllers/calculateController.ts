// express controller that will receive this data: cargo: Cargo, units: number, transitDays: number, start: TileCoordinate, end: TileCoordinate,
// and then use vanillapayment model to calculate the cargo payment

import { Request, Response } from 'express'
import { Cargo, cargoes } from '~shared/db/schema/cargo';
import { saves } from '~shared/db/schema/save';
import { db } from '~shared/db/setup';
import { eq, inArray } from '~shared/drizzle-orm';
import { VanillaEconomy } from '~shared/packs/Vanilla/vanilla';
import { Economy } from '~shared/packs/economyModel';

type CalculationMethod = (cargo: Cargo, economy: Economy<any>, xValue: number, params: any) => Promise<number>

type RequestParams = {
    minX: number, maxX: number, incrementX: number
}

export function CalculationMethodControllerFactory(method: CalculationMethod) {
    // request body will have minX, maxX, incrementX (representing the left side of graph, right side, and the grid increments)
    // response will have data for each x value, calculated using the provided method
    // which parses the request body and returns the desired value
    return async (req: Request, res: Response) => {
        let minX, maxX, incrementX;
        let cargos, economyModel;
        try {
            ({ minX, maxX, incrementX } = req.body)
            const economyData = await getEconomy(req);
            cargos = economyData.cargo
            economyModel = economyData.economy
            // const { minX, maxX, incrementX }: RequestParams = req.body
            // const { cargo, economy: economyModel } = await getEconomy(req)
        } catch(error) {
            res.status(400).json({'error': error?.message})
            return
        }
        if (!cargos || !economyModel) {
            return res.status(404).json({ error: 'Cargo or economy not found' })
        }
        const xValues = Array.from({ length: Math.ceil((maxX - minX) / incrementX) + 1 }, (_, index) => minX + incrementX * index)
        const economy: Economy<any> = new economyModel();

        const promises = cargos.map(async (cargo) => {
            const promisePerCargo = xValues.map(async (x) => {
                return await method(cargo, economy, x, req.body)
            })
            return { id: cargo!.id, data: await Promise.all(promisePerCargo) }
        })
        const results = await Promise.all(promises)
        res.json({ data: results, xValues: xValues })
    }
}

type OneWayParams = {
    cost: number,
    units: number,
    speed: number
}

export const IsOneWayParams = (params: any): params is OneWayParams => {
    const { cost, units, speed } = params
    return typeof cost === 'number' && typeof units === 'number' && typeof speed === 'number'
}

export const OneWay: CalculationMethod = async (cargo, economy, x, params) => {
    // x axis is distance, y is revenue
    const squares = x;
    const { cost, units, speed } = params;
    const transitDays = x * 27 / speed;
    const costs = transitDays * (cost / 365.25);
    const start = { x: 0, y: 0 }; const end = { x: 0, y: squares };
    return economy.calculatePaymentByTransitDays(cargo, units * 1000, transitDays, start, end) - costs;
}

type TwoWayParams = {
    cost: number,
    units: number,
    speed: number,
    loadTime: number,
    returningEmpty: boolean
}

export const IsTwoWayParams = (params: any): params is TwoWayParams => {
    return typeof params.cost === 'number' && typeof params.units === 'number' && typeof params.speed === 'number' && typeof params.loadTime === 'number' && typeof params.returningEmpty === 'boolean'
}

export const TwoWay = async (cargo, economy, x, params) => {
    // x axis is distance, y is revenue
    const squares = x;
    if (!IsTwoWayParams(params)) {
        throw new Error('Invalid params', params);
    }
    if (typeof squares !== 'number') {
        throw new Error('Invalid squares', squares);
    }
    const { cost, units, speed, loadTime, returningEmpty } = params;
    const transitDays = x * 27 / speed;
    const costs = (2 * transitDays + loadTime) * (cost / 365.25);
    const cargosTransproted = !returningEmpty ? 2 : 1;
    const start = { x: 0, y: 0 }; const end = { x: 0, y: squares };
    return economy.calculatePaymentByTransitDays(cargo, units * 1000 * cargosTransproted, transitDays, start, end) - costs;
}

type VariableDistanceParams = {
    units: number,
    speed: number
}

export const IsVariableDistanceParams = (params: any): params is VariableDistanceParams => {
    return typeof params.units === 'number' && typeof params.speed === 'number'
}

export const VariableDistance: CalculationMethod = async (cargo, economy, x, params) => {
    // x is distance, y is revenue
    const squares = x;
    const { units, speed } = params;
    const transitDays = x * 27 / speed;
    const start = { x: 0, y: 0 }; const end = { x: 0, y: squares };
    return economy.calculatePaymentByTransitDays(cargo, units * 1000, transitDays, start, end)
}

type VariableSpeedParams = {
    units: number,
    squares: number
}

export const IsVariableSpeedParams = (params: any): params is VariableSpeedParams => {
    return typeof params.units === 'number' && typeof params.squares === 'number'
}

export const VariableSpeed: CalculationMethod = async (cargo, economy, x, params) => {
    // x is speed, y is revenue
    const { units, squares } = params;
    const start = { x: 0, y: 0 }; const end = { x: 0, y: squares };
    let transitDays = squares * 27 / x;
    return economy.calculatePaymentByTransitDays(cargo, units * 1000, transitDays, start, end);
}

type VariableTransitDaysParams = {
    units: number,
    squares: number
}

export const IsVariableTransitDaysParams = (params: any): params is VariableTransitDaysParams => {
    return typeof params.units === 'number' && typeof params.squares === 'number'
}

export const VariableTransitDays: CalculationMethod = async (cargo, economy, x, params) => {
    // x is transitDays, y is revenue
    const { units, squares } = params;
    let transitDays = x;
    const start = { x: 0, y: 0 }; const end = { x: 0, y: squares };
    return economy.calculatePaymentByTransitDays(cargo, units * 1000, transitDays, start, end);
}


async function getEconomy(req: Request): Promise<{
    economy: new () => Economy<any>,
    cargo: Cargo[],
}> {
    const { saveId } = req.params;
    const { cargoIds }: { cargoIds: number[] } = req.body;
    const parsedSaveId = parseInt(saveId, 10);
    if (isNaN(parsedSaveId)) {
        return { economy: VanillaEconomy, cargo: null }
    }
    const cargo = await db.query.cargoes.findMany({ where: inArray(cargoes.id, cargoIds) })
    const save = await db.query.saves.findFirst({ where: eq(saves.id, parsedSaveId) })
    switch (save.cargoPaymentModel) {
        default:
            return {
                economy: VanillaEconomy,
                cargo: cargo
            }
    }
}
