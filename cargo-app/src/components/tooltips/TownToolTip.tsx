import { useAppSelector } from '../../app/hooks';
import { selectToolTipData } from '../../features/tooltips/tooltipSlice';
import { TownMapObjectprops } from '../MapObjects/TownMapObject';

export const TownToolTip = () => {
    const props = useAppSelector(selectToolTipData) as TownMapObjectprops;
    const { data: { x, y, name, isCity }} = props;
    return (
        <>
            <h4>{isCity ? 'City' : 'Town'} of {name}</h4>
            <h5>Location</h5>
            <p>{`(${x}, ${y})`}</p>
        </>
    );
};

export default TownToolTip;
