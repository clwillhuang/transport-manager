import { useState } from "react";
import { FormControl } from "react-bootstrap";
import GraphContainer, { GraphSubclassProps } from "./Graph";
import { baseUrl } from "../../tools/serverConn";

const GraphVariableSpeed = ({ cargos, saveId }: GraphSubclassProps) => {

	const [squares, setSquares] = useState<number>(200);
	const [units, setUnits] = useState<number>(20);

	const renderParams = () =>
		<>
			<span>Payment for delivering</span>
			<FormControl min={1} type='number' onChange={(e) => setUnits(parseInt(e.target.value))} defaultValue={units} />
			<span>units over </span>
			<FormControl min={1} type='number' onChange={(e) => setSquares(parseInt(e.target.value))} defaultValue={squares} />
			<span>squares</span>
		</>

	return (
		<GraphContainer
			saveId={saveId}
			cargos={cargos}
			endpoint={`${baseUrl}/calculate/${saveId}/speed`}
			maxX={200}
			minX={10}
			incrementX={10}
			renderParams={renderParams}
			params={{ squares, units }}
		/>
	)
}

export default GraphVariableSpeed;