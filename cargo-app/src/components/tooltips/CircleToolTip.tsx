import { ToolTipProps, ToolTipRenderer } from '../MapObjects/HoverableMapObjects/HoverableMapObject';
import type { Circle } from '~shared/db/schema/circle';

export const CircleToolTip: ToolTipRenderer<ToolTipProps<Circle>> = ({data}) => {

	const {x, y, radius} = data;

	return <>
		<h4>Circle</h4>
		<h5>Center</h5>
		<p>Tile {x}, {y}</p>
		<h5>Radius</h5>
		<p>{radius} tiles</p>
	</>;
}

export default CircleToolTip;