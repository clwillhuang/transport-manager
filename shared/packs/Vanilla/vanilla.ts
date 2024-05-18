import { Cargo } from "../../db/schema/cargo";
import { CargoData, Economy, TileCoordinate, calculateManhattanDistance } from "../economyModel";

// typeguard to check if point is of type TileCoordinate
function isPoint(p: any): p is TileCoordinate {
    return p.x !== undefined && p.y !== undefined;
}

export class VanillaEconomy extends Economy<CargoData> {
    static readonly ADJUSTMENT_FACTOR: number = 1.0 / 4.5;
    calculatePaymentBySpeed(cargo: Cargo, units: number, speed: number, start: TileCoordinate, end: TileCoordinate) {
        let squares = calculateManhattanDistance(start, end);
        let transitDays = (squares * 27 / speed) / 2.5;
        return this.calculatePaymentByTransitDays(cargo, units, transitDays, start, end);
    }

    calculatePaymentByTransitDays(cargo: Cargo, units: number, transitDays: number, start: TileCoordinate, end: TileCoordinate) {
        if (!isPoint(start) || !isPoint(end)) {
            console.log('calculatePaymentByTransitDays: invalid start or end point', start, end);
            return 0;
        }
        let cargoData = cargo.grfData as CargoData;
        var transit_factor = 255;
        if (transitDays <= cargoData.penalty_lowerbound) {
            transit_factor = 255;
        } else if (transitDays <= cargoData.penalty_lowerbound + cargoData.single_penalty_length) {
            transit_factor = 255 - (transitDays - cargoData.penalty_lowerbound);
        } else {
            transit_factor = 255 - 2 * (transitDays - cargoData.penalty_lowerbound) + cargoData.single_penalty_length;
        }
        let transitFactor = Math.max(31, transit_factor)
        let squares = calculateManhattanDistance(start, end);
        var result = cargoData.price_factor * units * transitFactor * squares / Math.pow(2, 21) * VanillaEconomy.ADJUSTMENT_FACTOR;
        if (!result && !(typeof result === 'number' && result === 0)) {
            console.log("ERROR: NULL RESULT", result)
            console.log(cargoData.price_factor, units, transitFactor, squares, Math.pow(2, 21), VanillaEconomy.ADJUSTMENT_FACTOR)
        }
        return result;
    };
}

