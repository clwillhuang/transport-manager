import { ToolTipProps, ToolTipRenderer } from '../MapObjects/HoverableMapObjects/HoverableMapObject';
import type { Town } from '~shared/db/schema/town';

export const TownToolTip: ToolTipRenderer<ToolTipProps<Town>> = ({data}) => {
    const { x, y, name, isCity } = data;
    return (
        <>
            <h4>Town: "{name}"{isCity ? ' (City)' : ''}</h4>
            <h5>Location</h5>
            <p>{`(${x}, ${y})`}</p>
        </>
    );
};

export default TownToolTip;
