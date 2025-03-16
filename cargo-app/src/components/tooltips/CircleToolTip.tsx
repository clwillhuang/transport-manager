import { useAppSelector } from '../../app/hooks';
import { selectToolTipData } from '../../features/tooltips/tooltipSlice';
import { CircleMapObjectProps } from '../MapObjects/CircleMapObject';

export const CircleToolTip = () => {
	const props = useAppSelector(selectToolTipData) as CircleMapObjectProps;
	const { data: {x, y, radius}} = props;

	return <>
		<h4>Circle</h4>
		<h5>Center</h5>
		<p>Tile {x}, {y}</p>
		<h5>Radius</h5>
		<p>{radius} tiles</p>
	</>;
}

export default CircleToolTip;