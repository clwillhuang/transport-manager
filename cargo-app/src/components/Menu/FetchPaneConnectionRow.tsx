import { useMutation } from "@tanstack/react-query"
import { baseUrl } from "../../tools/serverConn"
import { Row } from "react-bootstrap"
import { useAppDispatch } from "../../app/hooks"

export type GameConnectionResponse = {
    serverName: string,
    saveId: number | null
}

const FetchPaneConnectionRow = ({
    connection,
    isLoadingConnection,
    connectedSaveId
}: { 
    connection: GameConnectionResponse,
    isLoadingConnection: boolean,
    connectedSaveId: number | null
 }) => {
    const disconnectMutation = useMutation({
        mutationKey: ['disconnect'],
        mutationFn: () => fetch(`${baseUrl}/socket/disconnect`, { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then(res => res.json()),
        onSuccess: (_res) => {
            // do nothing; success only means process was initiated and doesn't mean it was completed successfully
        }
    })

    // Make server connect to the game
    const connectMutation = useMutation({
        mutationKey: ['connect'],
        mutationFn: () => fetch(`${baseUrl}/socket/connect`, { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then(res => res.json()),
        onSuccess: (_res) => {
            // do nothing; success only means process was initiated and doesn't mean it was completed successfully
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
        if (connectedSaveId) {
            return(
                <Row>
                    <p style={{ color: 'green' }}>State: Connected to save ID {connection.saveId}</p>
                    <button onClick={() => disconnectMutation.mutate()}>Disconnect</button>
                    <button onClick={() => connectMutation.mutate()}>Update Connection</button>
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