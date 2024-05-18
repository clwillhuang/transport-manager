// Allows the user to select what mapobjects to display on the map

import { Form, FormGroup, ButtonGroup, Button } from 'react-bootstrap'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel'
import styles from './IndustryFilter.module.css'
import { ChangeEventHandler, ChangeEvent } from 'react'

export enum StationType {
    Train = 'Train',
    Bus = 'Bus',
    Truck = 'Truck',
    Dock = 'Dock',
    Airport = 'Airport',
}

export const StationTypeValues = ['Train', 'Bus', 'Truck', 'Dock', 'Airport'] as StationType[];

type StationFilterProps = {
    stationsVisible: StationType[],
    setStationsVisible: (stationsVisible: StationType[]) => void
}

const StationFilter = ({ stationsVisible, setStationsVisible }: StationFilterProps) => {

    const showAll = () => {
        setStationsVisible(StationTypeValues)
    }
    
    const hideAll = () => {
        setStationsVisible([])
    }

    const onCheckChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>): void => {
        let newOptions: StationType[] = []
        if (event.target.checked) {
            newOptions = [...stationsVisible, event.target.value as StationType]
        } else {
            newOptions = stationsVisible.filter(t => t !== event.target.value)
        }
        setStationsVisible(newOptions)
    }

    return (
        <div className={styles.industryFilter}>
            <Form>
                <FormGroup>
                    <ul className={styles.industryList}>
                        {
                        (Object.keys(StationType) as Array<keyof typeof StationType>).map((key) => {
                            return <li key={key}>
                                <FormCheckInput
                                    type="checkbox"
                                    id={key}
                                    name={key}
                                    checked={stationsVisible.includes(key as StationType)}
                                    onChange={onCheckChange}
                                    value={key}
                                />
                                <FormCheckLabel htmlFor={key}>{key}</FormCheckLabel>
                            </li>
                        })
                        }
                    </ul>
                </FormGroup>
                <FormGroup>
                    <ButtonGroup>
                        <Button onClick={showAll}>Show all</Button>
                        <Button onClick={hideAll}>Hide all</Button>
                    </ButtonGroup>
                </FormGroup>
            </Form>
        </div >
    )
}

export default StationFilter;