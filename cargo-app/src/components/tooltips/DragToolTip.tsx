import { TileCoordinate, calculateManhattanDistance } from "../../model/Point";
import { CargoPaymentModel } from "../InfoPanel/DistanceMeasureInfoPanel";
import styles from './Tooltip.module.css'

export interface DragToolTipData {
    start: TileCoordinate,
    end: TileCoordinate,
    model?: CargoPaymentModel | null,
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2, 
  });

export default ({start, end, model}: DragToolTipData) => {
    const distance = calculateManhattanDistance(start, end);
	return <div className={styles.dragToolTip}>
        <h4>Distance</h4>
		<p>Start Location: {start.x}, {start.y}</p>
		<p>Current Location: {end.x}, {end.y}</p>
		<p>Manhattan Distance: {distance}</p>
        {/* <h2>Payment</h2>
        <p>Revenue: {formatter.format(realModel.revenue(distance))}</p>
        <p>Expenditures: {formatter.format(realModel.expenditure(distance))}</p>
        <p>Profit: {formatter.format(realModel.profit(distance))}</p> */}
	</div>;
}
