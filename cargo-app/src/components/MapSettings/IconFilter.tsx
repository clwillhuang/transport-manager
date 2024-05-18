// Allows the user to select what mapobjects to display on the map

import { Form, FormGroup, ButtonGroup, Button } from 'react-bootstrap'
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput'
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel'
import styles from './IndustryFilter.module.css'
import { ChangeEventHandler, ChangeEvent } from 'react'


export enum IconType {
    Industry = 'Industry',
    Station = 'Station',
    Town = 'Town',
    Circle = 'Circle',
    Sign = 'Sign',
    TrackSegment = 'TrackSegment'
}

export const IconTypeValues = (Object.keys(IconType) as Array<keyof typeof IconType>) as IconType[];

type IconFilterProps = {
    iconsVisible: IconType[],
    setIconsVisible: (iconsVisible: IconType[]) => void
}

const IconFilter = ({ iconsVisible, setIconsVisible }: IconFilterProps) => {

    const showAll = () => {
        setIconsVisible(IconTypeValues)
    }
    
    const hideAll = () => {
        setIconsVisible([])
    }

    const onCheckChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>): void => {
        let newOptions: IconType[] = []
        if (event.target.checked) {
            newOptions = [...iconsVisible, event.target.value as IconType]
        } else {
            newOptions = iconsVisible.filter(t => t !== event.target.value)
        }
        setIconsVisible(newOptions)
    }

    return (
        <div className={styles.industryFilter}>
            <Form>
                <FormGroup>
                    <ul className={styles.industryList}>
                        {
                        (Object.keys(IconType) as Array<keyof typeof IconType>).map((key) => {
                            return <li key={key}>
                                <FormCheckInput
                                    type="checkbox"
                                    id={key}
                                    name={key}
                                    checked={iconsVisible.includes(key as IconType)}
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

export default IconFilter;