import { ToolTipProps, ToolTipRenderer } from '../MapObjects/HoverableMapObjects/HoverableMapObject';
import type { Station } from '@dbtypes/db/schema/station';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from "@fortawesome/free-solid-svg-icons/faTruck";
import { faPlane } from "@fortawesome/free-solid-svg-icons/faPlane";
import { faTrain } from "@fortawesome/free-solid-svg-icons/faTrain";
import { faBus } from "@fortawesome/free-solid-svg-icons/faBus";
import { faShip } from "@fortawesome/free-solid-svg-icons/faShip";

export const StationToolTip: ToolTipRenderer<ToolTipProps<Station>> = ({ data }) => {
    const { x, y, name, hasAirport, hasBus, hasTrain, hasTruck, hasDock } = data; 
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
