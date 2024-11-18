import { ToolTipProps, ToolTipRenderer } from '../MapObjects/HoverableMapObjects/HoverableMapObject';
import type { Town } from '@dbtypes/db/schema/town';

export const TownToolTip: ToolTipRenderer<ToolTipProps<Town>> = ({data}) => {
    const { x, y, name, isCity } = data;
    return (
        <>
            <h4>{isCity ? 'City' : 'Town'} of {name}</h4>
            <h5>Location</h5>
            <p>{`(${x}, ${y})`}</p>
        </>
    );
};

export default TownToolTip;
