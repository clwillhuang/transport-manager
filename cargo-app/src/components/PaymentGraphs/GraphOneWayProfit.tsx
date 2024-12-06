import { useState } from "react";
import { FormControl } from "react-bootstrap";
import GraphContainer, { GraphSubclassProps } from "./Graph";
import { baseUrl } from "../../tools/serverConn";

const GraphOneWayProfit = ({ cargos, saveId }: GraphSubclassProps) => {

	const [speed, setSpeed] = useState<number>(120);
	const [units, setUnits] = useState<number>(20);
    const [cost, setCost] = useState<number>(10000);

	const renderParams = () =>
		<>
			<span>Profit per one-way trip delivering </span>
			<FormControl type='number' onChange={(e) => setUnits(parseInt(e.target.value))} defaultValue={units} />
			<span>units at speed</span>
			<FormControl type='number' onChange={(e) => setSpeed(parseInt(e.target.value))} defaultValue={speed}/>
			<span>km/h with running cost of </span>
            <FormControl type='number' onChange={(e) => setCost(parseInt(e.target.value))} defaultValue={cost}/>
            <span> / year</span>
		</>

	return (
		<GraphContainer 
			saveId={saveId}
			endpoint={`${baseUrl}/calculate/${saveId}/oneway`}
			cargos={cargos}
			renderParams={renderParams}
			maxX={4096}
			minX={0}
			incrementX={100}
			params={{speed, units, cost}}
			titleY='Profit ($)'
			titleX='Distance (squares)'/>
	)
}

export default GraphOneWayProfit;