import { useMutation } from "@tanstack/react-query"
import { baseUrl } from "../../tools/serverConn"
import { Row } from "react-bootstrap"

export type GameConnectionResponse = {
    serverName: string,
    saveId: number,
}

const FetchPaneConnectionRow = ({
    setSaveId,
    connection,
    isLoadingConnection
}: { 
    setSaveId: React.Dispatch<React.SetStateAction<number | null>>,
    connection: GameConnectionResponse,
    isLoadingConnection: boolean 
 }) => {

    const disconnectMutation = useMutation({
        mutationKey: ['disconnect'],
        mutationFn: () => fetch(`${baseUrl}/socket/disconnect`, { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then(res => res.json()),
        onSuccess: (res) => {
            setSaveId(null)
        }
    })

    const connectMutation = useMutation({
        mutationKey: ['connect'],
        mutationFn: () => fetch(`${baseUrl}/socket/connect`, { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then(res => res.json()),
        onSuccess: (res) => {
            setSaveId(res.saveId)
        }
    })

    const renderDetails = () => {
        if (isLoadingConnection) {
            return(
                <Row>
                    <p>Loading connection ...</p>
                </Row>
            )
        }
        if (connection.saveId) {
            return(
                <Row>
                    <p style={{ color: 'green' }}>State: Connected to save ID {connection.saveId}</p>
                    <button onClick={() => disconnectMutation.mutate()}>Disconnect</button>
                </Row>
            )
        }
        else {
            return(
                <Row>
                    <p style={{ color: 'red' }}>State: Disconnected</p>
                    <button onClick={() => connectMutation.mutate()}>Connect</button>
                </Row>
            )
        }
    }

    return(
        <div>
            <h2>Connection with OpenTTD</h2>
            {renderDetails()}
        </div>
    )
}

export default FetchPaneConnectionRow;