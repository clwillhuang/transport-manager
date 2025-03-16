import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from "@fortawesome/free-solid-svg-icons/faTruck";
import { faPlane } from "@fortawesome/free-solid-svg-icons/faPlane";
import { faTrain } from "@fortawesome/free-solid-svg-icons/faTrain";
import { faBus } from "@fortawesome/free-solid-svg-icons/faBus";
import { faShip } from "@fortawesome/free-solid-svg-icons/faShip";
import { useAppSelector } from '../../app/hooks';
import { selectToolTipData } from '../../features/tooltips/tooltipSlice';
import { StationMapObjectProps } from '../MapObjects/StationMapObject';

export const StationToolTip = () => {
    const props = useAppSelector(selectToolTipData) as StationMapObjectProps;

    const { data: { x, y, name, hasAirport, hasBus, hasTrain, hasTruck, hasDock } } = props; 
    return (
        <>
            <h4>{name}</h4>
            <span>
                {hasTrain && <FontAwesomeIcon size='2x' icon={faTrain}/>}
                {hasTruck && <FontAwesomeIcon size='2x' icon={faTruck}/>}
                {hasAirport && <FontAwesomeIcon size='2x' icon={faPlane}/>}
                {hasBus && <FontAwesomeIcon size='2x' icon={faBus}/>}
                {hasDock && <FontAwesomeIcon size='2x' icon={faShip}/>}
            </span>
            <h5>Location</h5>
            <p>{`(${x}, ${y})`}</p>
            {/* Add additional information if needed */}
        </>
    );
};

export default StationToolTip;
