import { useState } from "react";
import { FormControl } from "react-bootstrap";
import GraphContainer, { GraphSubclassProps } from "./Graph";
import { baseUrl } from "../../tools/serverConn";

const GraphVariableDistance = ({ cargos, saveId }: GraphSubclassProps) => {

	const [speed, setSpeed] = useState<number>(120);
	const [units, setUnits] = useState<number>(20);

	const renderParams = () =>
		<>
			<span>Payment for delivering</span>
			<FormControl type='number' onChange={(e) => setUnits(parseInt(e.target.value))} defaultValue={units} />
			<span>units at speed</span>
			<FormControl type='number' onChange={(e) => setSpeed(parseInt(e.target.value))} defaultValue={speed}/>
			<span>km/h</span>
		</>

	return (
		<GraphContainer 
			saveId={saveId}
			cargos={cargos}
			endpoint={`${baseUrl}/calculate/${saveId}/distance`}
			renderParams={renderParams}
            maxX={6000}
            minX={0}
            incrementX={200}
			params={{speed, units}}
			titleY='Profit ($)'
			titleX='Distance (squares)'/>
	)
}

export default GraphVariableDistance;