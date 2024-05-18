// import { CargoPaymentModel } from "../components/InfoPanel/DistanceMeasureInfoPanel";
// import type { Cargo } from "@dbtypes/db/schema/cargo"

// class VanillaPaymentModel implements CargoPaymentModel {
//     id: string

//     public constructor() {
//         this.id = 'VANILLA';
//     }
//     // units should be in thousands
//     // squares = squares travelled
//     // speed = kph
//     public getRevenueBySpeed(squares: number, units: number, speed: number, cargo: Cargo | undefined): number {
//         if (typeof cargo === 'undefined') {
//             return 0;
//         }
//         let transitDays = (squares * 27 / speed) / 2.5;
//         return this.getRevenueByTransitDays(squares, units, transitDays, cargo);
//     }

//     public getRevenueByTransitDays(squares: number, units: number, transitDays: number, cargo: Cargo | undefined): number {
//         if (typeof cargo === 'undefined') {
//             return 0;
//         }
//         var transit_factor = 255;
//         if (transitDays <= cargo.penalty_lowerbound) {
//             transit_factor = 255;
//         } else if (transitDays <= cargo.penalty_lowerbound + cargo.single_penalty_length) {
//             transit_factor = 255 - (transitDays - cargo.penalty_lowerbound);
//         } else {
//             transit_factor = 255 - 2 * (transitDays - cargo.penalty_lowerbound) + cargo.single_penalty_length;
//         }
//         let transitFactor = Math.max(31, transit_factor)
//         return cargo.price_factor * units * transitFactor * squares / Math.pow(2, 21) * Cargo.ADJUSTMENT_FACTOR;
//     } 
// }

// export default VanillaPaymentModel;