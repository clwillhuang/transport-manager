import { ChangeEvent, ChangeEventHandler, useCallback } from "react";
import { Button, ButtonGroup, Form, FormGroup } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import styles from './IndustryFilter.module.css'
import type { GETAllIndustryTypeResponse } from "~shared/api/schema/apiIndustryType";

interface IndustryFilterContentProps {
    industryTypes: GETAllIndustryTypeResponse,
    industriesVisible: number[],
    setIndustriesVisible(newIndustries: number[]): void,
}

const IndustryFilterContent = ({ industryTypes, industriesVisible, setIndustriesVisible }: IndustryFilterContentProps) => {
    const showAll = () => {
        setIndustriesVisible(industryTypes.map(i => i.id))
    }

    const hideAll = () => {
        setIndustriesVisible([])
    }

    const onCheckChange: ChangeEventHandler<HTMLInputElement> = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        let newOptions: number[] = []
        if (event.target.checked) {
            newOptions = [...industriesVisible, parseInt(event.target.value)]
        } else {
            newOptions =industriesVisible.filter(t => (t !== parseInt(event.target.value, 10)))
        }
        setIndustriesVisible(newOptions)
    }, [setIndustriesVisible, industriesVisible])

    if (industryTypes.length === 0) {
        return <div className={styles.industryFilter}>
            <p>No industries seem to be loaded. Activate an industry set under 'Economies' to begin.</p>
        </div>
    } else {
        return (
            <div className={styles.industryFilter}>
                <Form>
                    <FormGroup>
                        <ul className={styles.industryList}>
                            {industryTypes.map(
                                industryType => {
                                    const { name, id, count } = industryType
                                    return (
                                        <li key={id}>
                                            <FormCheckInput name={name} id={name} checked={industriesVisible.includes(id)} value={id} onChange={onCheckChange} />
                                            <FormCheckLabel htmlFor={name}>{name} ({count})</FormCheckLabel>
                                        </li>
                                    )
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
}

export default IndustryFilterContent;