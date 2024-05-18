// import { useEffect, useState } from "react";
// import { Col, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
// import type { Cargo } from "@dbtypes/db/schema/Cargo";
// import { Economy } from "@dbtypes/db/schema/Economy";
// import Point, { calculateManhattanDistance } from "@dbtypes/db/schema/Point";
// import styles from './DistanceMeasureInfoPanel.module.css'
// import { useQuery } from "@tanstack/react-query";
// import { baseUrl } from "../../tools/serverConn";

import type { Cargo } from "~shared/db/schema/cargo";

// export interface DistanceFormProps {
//     cargoId: number | null,
//     saveId: number | null,
//     cargoPaymentModel: CargoPaymentModel,
//     start: Point,
//     end: Point,
// }

// export interface ExpenditureModel {
//     expenditure: (squares: number, units: number, speed: number, cargo: Cargo | undefined, loco_running_cost: number, wagon_running_cost: number, num_wagons: number) => number,

// }

// const DefaultExpendModel: ExpenditureModel = {
//     expenditure: function (squares: number, units: number, speed: number, cargo: Cargo | undefined, loco_running_cost: number, wagon_running_cost: number, num_wagons: number): number {
//         let transitDays = squares * 27 / speed;
//         let annualCost: number = loco_running_cost + wagon_running_cost * num_wagons;
//         return transitDays * annualCost / 365.25;
//     }
// }


export interface CargoPaymentModel {
    id: string,
    getRevenueBySpeed(squares: number, units: number, speed: number, cargo: Cargo | undefined): Promise<number>,
    getRevenueByTransitDays(squares: number, units: number, transitDays: number, cargo: Cargo | undefined): Promise<number>
}


// export const DefaultCargoPaymentModel = {
//     revenue: (squares: number) => squares,
//     expenditure: (squares: number) => squares,
//     profit: () => 0,
// }

// interface CargoPaymentParameters {
//     cargoId: number | null,
//     saveId: number | null,
//     speed: number,
//     runningCostLoco: number,
//     runningCostCars: number,
//     cargoPerCar: number,
//     numCars: number
// }

// const defaults: CargoPaymentParameters = {
//     cargoId: null,
//     saveId: null,
//     speed: 120,
//     runningCostLoco: 10000,
//     runningCostCars: 0,
//     cargoPerCar: 5,
//     numCars: 1
// };

// const DistanceMeasureInfoPanel = ({ cargoId, saveId, cargoPaymentModel, start, end }: DistanceFormProps) => {

//     const [params, setParams] = useState<CargoPaymentParameters>({
//         ...defaults,
//         cargoId,
//         saveId
//     })

//     useEffect(() => {
//         setParams({...params, saveId})
//     }, [saveId])
//     useEffect(() => {
//         setParams({...params, cargoId})
//     }, [cargoId])

//     const { data: cargosInGame } = useQuery<Cargo[]>({
//         queryKey: [`distancecargo${saveId}`],
//         queryFn: (): Promise<Cargo[]> => 
//             fetch(`${baseUrl}/data/${saveId}/cargoes`, {method: 'GET'}).then(res => res.json()),
//         enabled: typeof params.saveId === 'number'
//     })

//     const { data: cargo } = useQuery<Cargo>({
//         queryKey: [`distancecargo${params.cargoId}`],
//         queryFn: (): Promise<Cargo> => 
//             fetch(`${baseUrl}/data/${saveId}/cargoes/${cargoId}`, {method: 'GET'}).then(res => res.json()),
//         enabled: typeof params.saveId === 'number' && typeof params.cargoId === 'number'
//     })

//     const onCargoSelect = (e: React.FormEvent<HTMLSelectElement>) => {
//         setParams({ ...params, cargoId: (e.target as HTMLSelectElement).value })
//     }

//     if (!cargo || !cargo.id) return <></>

//     const LABEL_COLUMN_WIDTH = 4;
//     const INPUT_COLUMN_WIDTH = 8;

//     const squares = calculateManhattanDistance(start, end);

//     const squareInfo = () => {
//         const distance = calculateManhattanDistance(start, end);
//         return <div className={styles.dragToolTip}>
//             <h4>Distance</h4>
//             <p>Start Location: {start.x}, {start.y}</p>
//             <p>Current Location: {end.x}, {end.y}</p>
//             <p>Manhattan Distance: {distance}</p>
//         </div>
//     }
//     if (!cargo) {
//         return (
//             <>
//                 {squareInfo()}
//                 <p>Extra parameters can be set if a cargo is selected.
//                 </p>
//             </>
//         )
//     } else {
//         const units = params.cargoPerCar * params.numCars * 1000;
//         const expendModel: ExpenditureModel = DefaultExpendModel;
//         const revenue = cargoPaymentModel.getRevenueBySpeed(squares, units, params.speed, cargo)
//         const costs = expendModel.expenditure(squares, units, params.speed, cargo, params.runningCostLoco, params.runningCostCars, params.numCars)
//         const profit = revenue - costs;

//         const formattedCurrency = new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD',
//         })

//         return (
//             <>
//                 {squareInfo()}
//                 <div>
//                     <p>Revenue: {formattedCurrency.format(revenue)}</p>
//                     <p>Costs: {formattedCurrency.format(costs)}</p>
//                     <p>Profit: {formattedCurrency.format(profit)}</p>
//                 </div>
//                 <Form>
//                     <FormGroup as={Row}>
//                         <FormLabel column sm={LABEL_COLUMN_WIDTH}>Cargo</FormLabel>
//                         <Col sm={INPUT_COLUMN_WIDTH}>
//                             <Form.Select onChange={onCargoSelect}>
//                                 {
//                                     cargosInGame.map((cargo: Cargo) => <option key={cargo.id} value={cargo.id}>{cargo.name}</option>)
//                                 }
//                             </Form.Select>
//                         </Col>
//                     </FormGroup>
//                     <FormGroup as={Row}>
//                         {/* <FormLabel column sm={LABEL_COLUMN_WIDTH}>Price Factor</FormLabel>
//                         <Col sm={INPUT_COLUMN_WIDTH}>
//                             {
//                                 cargo && <p>{cargo.price_factor}</p>
//                             }
//                         </Col> */}
//                     </FormGroup>
//                     <FormGroup as={Row}>
//                         <FormLabel column sm={LABEL_COLUMN_WIDTH}>Speed</FormLabel>
//                         <Col sm={INPUT_COLUMN_WIDTH}>
//                             <FormControl type='number'
//                                 onChange={(e) => setParams({ ...params, speed: parseInt(e.target.value) })}
//                                 defaultValue={defaults.speed} />
//                         </Col>
//                     </FormGroup>
//                     <FormGroup as={Row}>
//                         <FormLabel column sm={LABEL_COLUMN_WIDTH}>Running cost of locomotive(s)</FormLabel>
//                         <Col sm={INPUT_COLUMN_WIDTH}>
//                             <FormControl type='number' onChange={(e) => setParams({ ...params, runningCostLoco: parseInt(e.target.value) })}
//                                 defaultValue={defaults.runningCostLoco} />
//                         </Col>
//                     </FormGroup>
//                     <FormGroup as={Row}>
//                         <FormLabel column sm={LABEL_COLUMN_WIDTH}>Number of cargo cars</FormLabel>
//                         <Col sm={INPUT_COLUMN_WIDTH}>
//                             <FormControl type='number' onChange={(e) => setParams({ ...params, numCars: parseInt(e.target.value) })} defaultValue={defaults.numCars} />
//                         </Col>
//                     </FormGroup>
//                     <FormGroup as={Row}>
//                         <FormLabel column sm={LABEL_COLUMN_WIDTH}>Cargo capacity per car</FormLabel>
//                         <Col sm={INPUT_COLUMN_WIDTH}>
//                             <FormControl type='number' onChange={(e) => setParams({ ...params, cargoPerCar: parseInt(e.target.value) })} defaultValue={defaults.cargoPerCar} />
//                         </Col>
//                     </FormGroup>
//                     <FormGroup as={Row}>
//                         <FormLabel column sm={LABEL_COLUMN_WIDTH}>Running cost per car</FormLabel>
//                         <Col sm={INPUT_COLUMN_WIDTH}>
//                             <FormControl type='number' onChange={(e) => setParams({ ...params, runningCostCars: parseInt(e.target.value) })} defaultValue={defaults.runningCostCars} />
//                         </Col>
//                     </FormGroup>
//                 </Form>
//             </>
//         )
//     }
// }

// export default DistanceMeasureInfoPanel;