import { useState } from "react";
// import EditIndustryTypeForm from "./IndustryEditForm";
import styles from './IndustryPane.module.css'
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../tools/serverConn";
import type { GETAllCargoResponse } from "@dbtypes/api/schema/apiCargo";
import type { GETAllIndustryTypeResponse, GETOneIndustryTypeResponse } from "@dbtypes/api/schema/apiIndustryType";
import type { IndustryType } from "@dbtypes/db/schema/industryType";
import { Container, ListGroup } from "react-bootstrap";
import EditIndustryTypeForm from "./IndustryEditForm";
import HexColorBox from "../HexColorBox";
import IndustryPaneCargoList from "./IndustryPaneCargoList";

interface IndustryPaneProps {
    initialIndustryVisible: number | undefined | null,
    saveId: number,
}

const IndustryPane = ({ initialIndustryVisible, saveId }: IndustryPaneProps) => {
    const [selectedType, setSelectedType] = useState<number | null>(initialIndustryVisible ?? null);

    const { data: industryTypes, isLoading } = useQuery<GETAllIndustryTypeResponse>({
        queryKey: [`industrytypes`],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/industrytypes/`, { method: 'GET' }).then(res => res.json()),
        enabled: !!saveId,
    })

    const { data: cargoes, isLoading: cargosLoading } = useQuery<GETAllCargoResponse>({
        queryKey: [`cargoes`],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/cargoes`, { method: 'GET' }).then(res => res.json()),
        enabled: !!saveId,
    })

    const { data, isLoading: typeLoading, isFetching: typeFetching } = useQuery<GETOneIndustryTypeResponse>({
        queryKey: ['industrytype', selectedType],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/industrytypes/${selectedType}`, { method: 'GET' }).then(res => res.json()),
        enabled: !!selectedType && !!saveId,
    })

    if (!saveId) {
        return <div className={styles.flexConstraint}>No save is currently selected, so there is no data to load. Please select a save from Saves.</div>
    }

    if (isLoading || cargosLoading || !cargoes || !industryTypes) {
        return <div className={styles.flexConstraint}>Loading data for save {saveId}</div>
    }

    const acceptedCargoIds = data ? data.accepts.map(a => a.cargoId) : []
    const producedCargoIds = data ? data.produces.map(a => a.cargoId) : []
    const accepts: GETAllCargoResponse = cargoes.filter(c => acceptedCargoIds.includes(c.id))
    const produces: GETAllCargoResponse = cargoes.filter(c => producedCargoIds.includes(c.id))

    return (
        <div className={styles.flexConstraint}>
            <div className={styles.industryList}>
                <div className={styles.directoryOverflow}>
                    <ListGroup variant='flush' className={styles.directory}>
                        {industryTypes.sort((a, b) => a.name.localeCompare(b.name)).map((industryType: IndustryType) => {
                            const { id, name } = industryType;
                            return (
                                <ListGroup.Item active={id === selectedType} key={id} action onClick={() => setSelectedType(id)}>
                                    {name}
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup>
                </div>
            </div>
            <div className={styles.content}>
                {
                    (!data)
                        ?
                        <Container>Select an industry type to view data.</Container>
                        :
                        (typeLoading || typeFetching)
                            ?
                            <div style={{ padding: '20px' }}>Loading data for this industry type ...</div>
                            :
                            <div className={styles.industryInfo}>
                                <div className={styles.acceptsList}>
                                    <h3>Accepts</h3>
                                    <IndustryPaneCargoList list={accepts} setSelectedType={setSelectedType} mode='accepts' saveId={saveId} />
                                </div>
                                <div className={styles.industryMiddle}>
                                    <h3>Industry</h3>
                                    {data.id &&
                                        <div>
                                            <h4>{data.name}</h4>
                                            <HexColorBox hex={data.hex} textcolor="white" />
                                            {import.meta.env.VITE_ENABLE_SOCKET === 'on' && <EditIndustryTypeForm industryTypes={industryTypes} cargoes={cargoes} saveId={saveId} selectedType={data} />}
                                        </div>
                                    }
                                </div>
                                <div className={styles.producesList}>
                                    <h3>Produces</h3>
                                    <IndustryPaneCargoList list={produces} setSelectedType={setSelectedType} mode='produces' saveId={saveId} />
                                </div>
                            </div>
                }
            </div>
        </div>
    )
}

export default IndustryPane;