import { useState } from "react";
import { FormControl } from "react-bootstrap";
import GraphContainer, { GraphSubclassProps } from "./Graph";
import { baseUrl } from "../../tools/serverConn";

const GraphTwoWayProfit = ({ cargos, saveId }: GraphSubclassProps) => {

    const [speed, setSpeed] = useState<number>(120);
    const [units, setUnits] = useState<number>(20);
    const [cost, setCost] = useState<number>(10000);
    const [loadTime, setLoadTime] = useState<number>(40);
    const [returningEmpty, setReturningEmpty] = useState<boolean>(true);

    const renderParams = () =>
        <div>
            <div>
                <span>Profit per one-way trip delivering </span>
                <FormControl type='number' min={1} onChange={(e) => setUnits(parseInt(e.target.value))} defaultValue={units} />
                <span>units at speed</span>
                <FormControl type='number' min={1} onChange={(e) => setSpeed(parseInt(e.target.value))} defaultValue={speed} />
                <span>km/h with running cost of </span>
                <FormControl type='number' min={0} onChange={(e) => setCost(parseInt(e.target.value))} defaultValue={cost} />
                <span> / year</span>
            </div>
            <div>
                <span>Assumes</span>
                <FormControl type='number' min={0} onChange={(e) => setLoadTime(parseInt(e.target.value))} defaultValue={loadTime} />
                <span>days required to fully-load.</span>
            </div>
            <div>
                <span>Return empty?</span>
                <input type='checkbox' defaultChecked={returningEmpty} onChange={(e) => setReturningEmpty(e.target.checked)} />
            </div>
        </div>

    return (
        <GraphContainer
            saveId={saveId}
            endpoint={`${baseUrl}/calculate/${saveId}/twoway`}
            cargos={cargos}
            renderParams={renderParams}
            maxX={4096}
            minX={0}
            incrementX={100}
            params={{ speed, units, cost, loadTime, returningEmpty }}
        />
    )
}

export default GraphTwoWayProfit;