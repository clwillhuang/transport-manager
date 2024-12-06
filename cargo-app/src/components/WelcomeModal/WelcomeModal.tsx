import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const WelcomeModal = () => {
    const [show, setShow] = useState(true);
    
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Welcome to Transport Manager!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>What is this?</h5>
                <p>Transport Manager is a web application that allows you to interactively view a map of towns, industries and stations that exist in an game called "OpenTTD", where players are tasked with running a cargo and passenger transport company to build efficient routes between industries and towns with trains, ships, road vehicles, and airplanes. Transport Manager aims to provide a user-friendly interface for players to view their world, create route plans, and share their maps with others.</p>

                <h5>Navigation</h5>
                <p>Click and drag on the map to move around. Use your mouse wheel to zoom in and out.</p>

                <p>Hover over the map to see the name of the town, industry or station. Click an icon to learn more.</p>

                <h5>Connections</h5>
                <p>{import.meta.env.VITE_ENABLE_SOCKET !== 'on' ? 'This application is only running in preview mode, so socket connections are disabled.' : 'This application is running in online mode.'} In online mode, the web server will connect to your local instance of OpenTTD using a TCP socket connection to send and receive game data in real-time. This requires you to install this website locally!</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setShow(false)}>Start!</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default WelcomeModal;