import { Tab, Tabs } from "react-bootstrap";
import type { Cargo } from "~shared/db/schema/cargo";
import styles from './GraphPane.module.css'
import GraphOneWayProfit from "./GraphOneWayProfit";
import GraphVariableDistance from "./GraphVariableDistance";
import GraphVariableSpeed from "./GraphVariableSpeed";
import GraphVariableTransitDays from "./GraphVariableTransitDays";
import GraphTwoWayProfit from "./GraphTwoWayProfit";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../tools/serverConn";

interface GraphPaneProps {
    saveId: number | null;
}

const GraphPane = ({ saveId }: GraphPaneProps) => {
    const {data: cargos, isLoading, isError } = useQuery({
        queryKey: ['cargos', saveId],
        queryFn: () => {
            return fetch(`${baseUrl}/data/${saveId}/cargoes`)
            .then(res => res.json())
            .then((data: Cargo[]) => data.sort((a: Cargo, b: Cargo) => a.name.localeCompare(b.name)))
        },
        enabled: !!saveId
    })

    if (!saveId) {
        return <div className={styles.container}>No save is currently selected. Please select a save from Saves.</div>
    } else if (isLoading) {
        return <div className={styles.container}>Loading...</div>
    } else if (isError || typeof cargos === 'undefined') {
        return <div className={styles.container}>Error</div>
    } 

    return (
        <div className={styles.container}>
            <Tabs className={styles.tabParent} fill>
                <Tab eventKey='two-way-profit' title='Two-way profit' className={styles.tabContent}>
                    <GraphTwoWayProfit {...{ cargos, saveId }} />
                </Tab>
                <Tab eventKey='one-way-profit' title='One-way profit' className={styles.tabContent}>
                    <GraphOneWayProfit {...{ cargos, saveId }} />
                </Tab>
                <Tab eventKey='transit-days' title='Transit Days' className={styles.tabContent}>
                    <GraphVariableTransitDays {...{ cargos, saveId }} />
                </Tab>
                <Tab eventKey='speed' title='Speed' className={styles.tabContent}>
                    <GraphVariableSpeed {...{ cargos, saveId }} />
                </Tab>
                <Tab eventKey='distance' title='Distance' className={styles.tabContent}>
                    <GraphVariableDistance {...{ cargos, saveId }} />
                </Tab>
            </Tabs>
        </div>
    )
}

export default GraphPane;
