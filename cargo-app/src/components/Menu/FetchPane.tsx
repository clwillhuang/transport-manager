// This component will allow the user to fetch the details of the save
// from the game client. The user will be able to select which save to
// load, and view whether each portion of the save (cargoes, industries,
// industryTypes, etc.) have been loaded.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { baseUrl } from "../../tools/serverConn";
import type { GETAllSaveResponse, GETOneSaveResponse } from "~shared/api/schema/apiSave";
import { Button, Col, Container, ListGroup, Row, Tab, Tabs } from "react-bootstrap";
import styles from './FetchPane.module.css'
import FetchPaneConnectionRow, { GameConnectionResponse } from "./FetchPaneConnectionRow";

type FetchPaneProps = {
    saveId: number | null,
    setSaveId: React.Dispatch<React.SetStateAction<number | null>>,
}

// Corresponds to the game script data types that can be updated, as made available by API endpoints in socket.ts
type PermittedUpdateTypes = 'com' | 'sta' | 'tow' | 'car' | 'ind' | 'mon' | 'typ' | 'all' | 'wai'

const RenderLastFetched = ({ title, lastFetched, saveId, type }: { title: string, lastFetched: Date | null, saveId: number, type: PermittedUpdateTypes }) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    const queryClient = useQueryClient();

    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationKey: ['save', saveId],
        mutationFn: () => {
            return fetch(`${baseUrl}/game/send/request/${type}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(res => {
                if (res.ok) {
                    res.json()
                } else {
                    throw Error('Failed to send request')
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['save', 'current'] })
        }
    })
    const date = lastFetched ? new Date(lastFetched) : null;

    return (
        <Row className={styles.lastFetched}>
            <Col xs={2} className={styles.title}>
                <span>{title}</span>
            </Col>
            <Col xs={6} className={styles.time}>
                <span>Last fetched: {date ? date.toLocaleDateString('en-US', options) : 'Never'}
                </span>
            </Col>
            <Col xs={4} className={styles.request}>
                {/* Render a button that sends a POST request to start update */}
                {isPending ? <Button disabled>Requesting ...</Button> : <Button onClick={() => mutate()}>Start Update</Button>}
                {isSuccess && <p style={{ color: 'green' }}>Sent request. Waiting for game to respond with data.</p>}
                {isError && <p style={{ color: 'red' }}>Failed to send request.</p>}
            </Col>
        </Row>
    )
}

const FetchPane = ({ saveId, setSaveId }: FetchPaneProps) => {
    const queryClient = useQueryClient();
    const [selectedSaveId, setSelectedSaveId] = useState<number | null>(saveId);
    useEffect(() => {
        setSelectedSaveId(saveId);
        queryClient.invalidateQueries({ queryKey: ['currentsave'] })
        queryClient.invalidateQueries({ queryKey: ['connection'] })
    }, [saveId]);

    const { data: saves, isLoading } = useQuery<GETAllSaveResponse>({
        queryKey: ['currentsave'],
        queryFn: () => fetch(`${baseUrl}/saves`).then(res => res.json()),
    })

    const { data: connection, isLoading: isLoadingConnection } = useQuery<GameConnectionResponse>({
        queryKey: ['connection'],
        queryFn: () => fetch(`${baseUrl}/socket/current`).then(res => res.json()),
    })

    useEffect(() => {
        if (connection && connection.saveId) {
            setSaveId(connection?.saveId)
        }
    }, [connection?.saveId])

    const { data: currentSave, isLoading: isLoadingCurrent } = useQuery<GETOneSaveResponse>({
        queryKey: ['save', selectedSaveId],
        queryFn: () => fetch(`${baseUrl}/saves/${selectedSaveId}`).then(res => res.json()),
        enabled: !!selectedSaveId
    })

    if (isLoading || !saves || !connection) return <div>Loading...</div>

    return (
        // Show two tabs. One shows current save data. One shows list of all saves
        <div className={styles.fetchContainer}>
        <Tabs title='Select and Browse Save Games' fill className={styles.tabPane}>
            <Tab eventKey="current" title='Current Save'>
                <Container>
                    {
                        (!selectedSaveId || !currentSave) ? <div className={styles.pleaseSelect}>
                            <p>Please select a save from the All Saves tab, or connect to your currently running instance of OpenTTD.</p>
                        </div>
                            :
                            <>
                                <Row>
                                    <h2 className={styles.saveTitle}><strong>{currentSave.serverName}</strong></h2>
                                </Row>
                                <Row>
                                    <Col xs={6} className={styles.mapInfo}>
                                        <h3>Map Information</h3>
                                        <p><strong>ID:</strong> {currentSave.id}</p>
                                        <p><strong>Map:</strong> {currentSave.mapWidth} x {currentSave.mapHeight}</p>
                                        <p><strong>Map Seed:</strong> {currentSave.mapSeed}</p>
                                    </Col>
                                    {/* Show all of the save data: */}
                                    <Col xs={6} className={styles.industryInfo}>
                                        <h3>Industry Information</h3>
                                        <p><strong>Pack:</strong> {currentSave.industryPack ?? 'None loaded'}</p>
                                        <p><strong>Version:</strong> {currentSave.industryVersion ?? 'None loaded'}</p>
                                        <p><strong>Economy:</strong> {currentSave.industryEconomy ?? 'None loaded'}</p>
                                    </Col>
                                </Row>
                                {
                                    (isLoadingCurrent) ?
                                        <Row>Loading connection information ...</Row>
                                        :
                                        <>
                                            {
                                                connection.saveId &&
                                                    <>
                                                        <h3>Request for Data Update from Script</h3>
                                                        <RenderLastFetched title='All' lastFetched={currentSave.timeFetchedCargoWaiting} saveId={currentSave.id} type='all' />
                                                        <RenderLastFetched title='Cargoes' lastFetched={currentSave.timeFetchedCargos} saveId={currentSave.id} type='car' />
                                                        <RenderLastFetched title='Industries' lastFetched={currentSave.timeFetchedIndustries} saveId={currentSave.id} type='ind' />
                                                        <RenderLastFetched title='Industry Types' lastFetched={currentSave.timeFetchedIndustryTypes} saveId={currentSave.id} type='typ' />
                                                        <RenderLastFetched title='Towns' lastFetched={currentSave.timeFetchedTowns} saveId={currentSave.id} type='tow' />
                                                        {/* <RenderLastFetched title='Companies' lastFetched={currentSave.timeFetchedCompanies} saveId={currentSave.id} type='com' /> */}
                                                        <RenderLastFetched title='Stations' lastFetched={currentSave.timeFetchedStations} saveId={currentSave.id} type='sta' />
                                                        <RenderLastFetched title='Monthly Stats' lastFetched={currentSave.timeFetchedMonthlyStats} saveId={currentSave.id} type='mon' />
                                                        <RenderLastFetched title='Cargo Waiting' lastFetched={currentSave.timeFetchedCargoWaiting} saveId={currentSave.id} type='wai' />
                                                    </> 
                                            }
                                        </>
                                }
                            </>
                    }
                    {
                        (!isLoadingConnection && !isLoadingCurrent) && 
                        <FetchPaneConnectionRow {...{
                            connection,
                            isLoadingConnection,
                            selectedSaveId,
                            setSaveId
                        }} /> 
                    }
                </Container>
            </Tab>
            <Tab eventKey="all" title="All Saves"  >
                <ListGroup variant='flush'>
                    {
                        saves.map((save) => (
                            <ListGroup.Item key={save.id}>
                                <Row>
                                    <Col>
                                        <h3>{save.serverName}</h3>
                                    </Col>
                                    <Col>
                                        <p><strong>ID:</strong> {save.id}</p>
                                        <p><strong>Map:</strong> {save.mapWidth} x {save.mapHeight}</p>
                                        <p><strong>Map Seed:</strong> {save.mapSeed}</p>
                                    </Col>
                                    {/* Show save data, and then a button which allows user to load that save */}
                                    <Col><Button onClick={() => {
                                        setSaveId(save.id)
                                    }}>Select Save "{save.serverName}"</Button></Col>
                                </Row>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Tab>
        </Tabs>
        </div>
    )
}
export default FetchPane;