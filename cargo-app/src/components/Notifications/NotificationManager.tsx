import { Button } from "react-bootstrap";
import { socket } from "../../tools/clientSocket";

function ConnectionManager() {
    function connect() {
        socket.connect();
    }

    function disconnect() {
        socket.disconnect();
    }

    return (
        <>
            <Button onClick={connect}>Connect</Button>
            <Button onClick={disconnect}>Disconnect</Button>
        </>
    );
}

export default ConnectionManager;