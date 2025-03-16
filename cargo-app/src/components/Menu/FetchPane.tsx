// This component will allow the user to fetch the details of the save
// from the game client. The user will be able to select which save to
// load, and view whether each portion of the save (cargoes, industries,
// industryTypes, etc.) have been loaded.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { baseUrl } from "../../tools/serverConn";
import type { GETAllSaveResponse, GETOneSaveResponse } from "@dbtypes/api/schema/apiSave";
import { Button, Col, Container, ListGroup, Row, Tab, Tabs } from "react-bootstrap";
import styles from './FetchPane.module.css'
import FetchPaneConnectionRow, { GameConnectionResponse } from "./FetchPaneConnectionRow";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSaveId, setSaveId } from "../../features/saves/saveSlice";

// Corresponds to the game script data types that can be updated, as made available by API endpoints in socket.ts
type PermittedUpdateTypes = 'com' | 'sta' | 'tow' | 'car' | 'ind' | 'mon' | 'typ' | 'all' | 'wai'

const RenderLastFetched = ({ title, lastFetched, type }: { title: string, lastFetched: Date | null, type: PermittedUpdateTypes }) => {

    const saveId = useAppSelector(selectSaveId);

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

    if (saveId === null) {
        return null;
    }

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

const FetchPane = () => {

    // The save id selected for everything else (i.e. shown in menus and map)
    const saveId = useAppSelector(selectSaveId);
    const dispatch = useAppDispatch();

    // The save id that is the backend server is connected to
    const [connectedSaveId, setConnectedSaveId] = useState<number | null>(null);

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
            setConnectedSaveId(connection?.saveId)
        }
    }, [connection?.saveId])

    const { data: currentConnectedSave, isLoading: isLoadingCurrent } = useQuery<GETOneSaveResponse>({
        queryKey: ['save', connectedSaveId],
        queryFn: () => fetch(`${baseUrl}/saves/${connectedSaveId}`).then(res => res.json()),
        enabled: !!connectedSaveId
    })

    if (isLoading || !saves || !connection) return <div>Loading...</div>

    return (
        // Show two tabs. One shows current save data. One shows list of all saves
        <div className={styles.fetchContainer}>
        <Tabs title='Select and Browse Save Games' fill className={styles.tabPane}>
            { import.meta.env.VITE_ENABLE_SOCKET === 'on' && <Tab eventKey="current" title='Current Save'>
                <Container>
                    {
                        (saveId === null || !currentConnectedSave) ? <div className={styles.pleaseSelect}>
                            <p>Please select a save from the All Saves tab, or connect to your currently running instance of OpenTTD.</p>
                        </div>
                            :
                            <>
                                <Row>
                                    <h2 className={styles.saveTitle}><strong>{currentConnectedSave.serverName}</strong></h2>
                                </Row>
                                <Row>
                                    <Col xs={6} className={styles.mapInfo}>
                                        <h3>Map Information</h3>
                                        <p><strong>ID:</strong> {currentConnectedSave.id}</p>
                                        <p><strong>Map:</strong> {currentConnectedSave.mapWidth} x {currentConnectedSave.mapHeight}</p>
                                        <p><strong>Map Seed:</strong> {currentConnectedSave.mapSeed}</p>
                                    </Col>
                                    {/* Show all of the save data: */}
                                    <Col xs={6} className={styles.industryInfo}>
                                        <h3>Industry Information</h3>
                                        <p><strong>Pack:</strong> {currentConnectedSave.industryPack ?? 'None loaded'}</p>
                                        <p><strong>Version:</strong> {currentConnectedSave.industryVersion ?? 'None loaded'}</p>
                                        <p><strong>Economy:</strong> {currentConnectedSave.industryEconomy ?? 'None loaded'}</p>
                                    </Col>
                                </Row>
                                {
                                    (isLoadingCurrent) ?
                                        <Row>Loading connection information ...</Row>
                                        :
                                        <>
                                            {
                                                saveId !== null &&
                                                    <>
                                                        <h3>Request for Data Update from Script</h3>
                                                        <RenderLastFetched title='All' lastFetched={currentConnectedSave.timeFetchedCargoWaiting} type='all' />
                                                        <RenderLastFetched title='Cargoes' lastFetched={currentConnectedSave.timeFetchedCargos} type='car' />
                                                        <RenderLastFetched title='Industries' lastFetched={currentConnectedSave.timeFetchedIndustries} type='ind' />
                                                        <RenderLastFetched title='Industry Types' lastFetched={currentConnectedSave.timeFetchedIndustryTypes} type='typ' />
                                                        <RenderLastFetched title='Towns' lastFetched={currentConnectedSave.timeFetchedTowns} type='tow' />
                                                        {/* <RenderLastFetched title='Companies' lastFetched={currentSave.timeFetchedCompanies} type='com' /> */}
                                                        <RenderLastFetched title='Stations' lastFetched={currentConnectedSave.timeFetchedStations} type='sta' />
                                                        <RenderLastFetched title='Monthly Stats' lastFetched={currentConnectedSave.timeFetchedMonthlyStats} type='mon' />
                                                        <RenderLastFetched title='Cargo Waiting' lastFetched={currentConnectedSave.timeFetchedCargoWaiting} type='wai' />
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
                            connectedSaveId
                        }} /> 
                    }
                </Container>
            </Tab> }
            <Tab eventKey="all" title="All Saves"  >
                <ListGroup variant='flush'>
                    {
                        saves.map((save) => (
                            <ListGroup.Item key={save.id}>
                                <Row>
                                    <Col>
                                        <h3>{save.serverName} {(connectedSaveId !== null && connectedSaveId === save.id) ? <span>(Connected)</span> : null}</h3>
                                    </Col>
                                    <Col>
                                        <p><strong>ID:</strong> {save.id}</p>
                                        <p><strong>Map:</strong> {save.mapWidth} x {save.mapHeight}</p>
                                        <p><strong>Map Seed:</strong> {save.mapSeed}</p>
                                    </Col>
                                    {/* Show save data, and then a button which allows user to load that save */}
                                    <Col><Button onClick={() => {
                                        dispatch(setSaveId(save.id))
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