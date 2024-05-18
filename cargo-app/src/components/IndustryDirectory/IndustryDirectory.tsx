import { ChangeEvent, ChangeEventHandler } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";
import type { Industry } from "@dbtypes/db/schema/industry";
import type { IndustryType } from "@dbtypes/db/schema/industryType";
import styles from './GeneralMapInformation.module.css'

interface IndustryDirectoryProps {
    image: HTMLImageElement | undefined,
    industries: Map<string, Industry[]>,
    industryTypes: IndustryType[],
    industriesVisible: string[],
    setIndustriesVisible: (visible: string[]) => void 
}

const IndustryDirectory = ({image, industries, industryTypes, industriesVisible, setIndustriesVisible}: IndustryDirectoryProps) => {

    const showAll = () => {
        setIndustriesVisible([...Array.from(industries.keys())])
    }

    const hideAll = () => {
        setIndustriesVisible([])
    }

    const onCheckChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>): void => {
        let newOptions: string[] = []
        if (event.target.checked) {
            newOptions = [...industriesVisible, event.target.value]
        } else {
            newOptions = industriesVisible.filter(t => t !== event.target.value)
        }
        setIndustriesVisible(newOptions)
    }

    if (!industries) {
        return null;
    }

    return(
    <div className={styles.parent}>
        <h2>Map Information</h2>
        <h4>Map Size</h4>
		{image && <p>{image.naturalWidth} squares wide, {image.naturalHeight} squares tall</p>}
        <h4>Industries</h4>
        <Form>
            <Button onClick={showAll}>Show all</Button>
            <Button onClick={hideAll}>Hide all</Button>
            <FormGroup>
            <ul className={styles.industryList}>
            {industryTypes.map(
                (industryType: IndustryType) => {
                    const { name, id } = industryType
                    const count = industries.get(name) ? industries!.get(name)!.length : 0
                    return(
                        <li key={id}>
                            <FormCheckInput name={name} id={name} checked={industriesVisible.includes(name)} value={name} onChange={onCheckChange}/>
                            <FormCheckLabel htmlFor={name}>{name} ({count})</FormCheckLabel>
                        </li>
                    )
                })
                }
            </ul>
            </FormGroup>
        </Form>
	</div>
    )
}

export default IndustryDirectory;