import { useState } from "react";
import { FormControl } from "react-bootstrap";
import GraphContainer, { GraphSubclassProps } from "./Graph";
import { baseUrl } from "../../tools/serverConn";
import { useAppSelector } from "../../app/hooks";
import { selectSaveId } from "../../features/saves/saveSlice";

const GraphVariableTransitDays = ({ cargos }: GraphSubclassProps) => {

	const saveId = useAppSelector(selectSaveId);

	const [squares, setSquares] = useState<number>(20);
	const [units, setUnits] = useState<number>(20);

	if (saveId === null) {
		return null;
	}

	const renderParams = () =>
		<>
			<span>Payment for delivering</span>
			<FormControl min={1} type='number' onChange={(e) => setUnits(parseInt(e.target.value))} defaultValue={units} />
			<span>units over</span>
			<FormControl min={1} type='number' onChange={(e) => setSquares(parseInt(e.target.value))} defaultValue={squares} />
			<span>squares</span>
		</>

	return (
		<GraphContainer
			cargos={cargos}
			endpoint={`${baseUrl}/calculate/${saveId}/days`}
			renderParams={renderParams}
			maxX={200}
			minX={10}
			incrementX={10}
			params={{ squares, units }}
			titleY='Profit ($)'
			titleX='Number of days cargo is in transit'
		/>
	)
}

export default GraphVariableTransitDays;