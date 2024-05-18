import { GETAllCargoResponse } from "~shared/api/schema/apiCargo";
import styles from './IndustryPane.module.css'
import CargoTooltip from "../tooltips/CargoToolTip";
import { OverlayTrigger } from "react-bootstrap";

interface IndustryPaneCargoListProps {
    list: GETAllCargoResponse,
    setSelectedType: (id: number) => void,
    saveId: number | null,
    mode: 'produces' | 'accepts',
}

const IndustryPaneCargoList = ({ list, setSelectedType, saveId, mode }: IndustryPaneCargoListProps) => {
    return (
        <div>
            <ul>
                {
                    list.map(({ id, name, producedBy, acceptedBy }) => {
                        const industries = mode === 'produces' ? acceptedBy : producedBy
                        if (!id) return null;
                        return (
                            <OverlayTrigger overlay={
                                <CargoTooltip cargoId={id} saveId={saveId} />
                            } key={`${mode}-${id}`}>
                                {({ ref, ...triggerHandler }) => (
                                    <li ref={ref} className={mode === 'accepts' ? styles.acceptsItem : styles.producesItem} {...triggerHandler} >
                                        <h4>{name}</h4>
                                        <ul>
                                            {industries.map(i => <li key={i.name + 'accepts'} onClick={() => setSelectedType(i.id)}>{i.name}</li>)}
                                        </ul>
                                    </li>
                                )}
                            </OverlayTrigger>
                        );
                    })
                }
            </ul>
        </div>
    )

}

export default IndustryPaneCargoList;