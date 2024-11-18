import React, { useState, ChangeEvent, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { baseUrl, fetchPOSTFactory } from '../../tools/serverConn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Station } from '@dbtypes/db/schema/station';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import styles from './UpdateModal.module.css'

interface UpdateStationModalProps {
    stationData: Station;
    saveId: number;
}

const UpdateStationModal: React.FC<UpdateStationModalProps> = ({ stationData, saveId }) => {
    const [editedstationData, setEditedStationType] = useState<Station>({ ...stationData })

    const queryClient = useQueryClient()

    useEffect(() => {
        setEditedStationType(stationData)
    }, [stationData])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedStationType((prev: Station) => ({ ...prev, [name]: value }));
    }

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setEditedStationType((prev: Station) => ({ ...prev, [name]: checked }));
    };

    const [showEdit, setShowEdit] = useState<boolean>(false);

    const { isError, ...mutation } = useMutation({
        mutationKey: [saveId, stationData?.id],
        mutationFn: (newData: Partial<Station> & { id: number }) =>
            fetchPOSTFactory(`${baseUrl}/data/${saveId}/stations/${editedstationData.id}`, newData),
        onSuccess: () => { 
            queryClient.invalidateQueries({ queryKey: ['station', editedstationData.id] }) 
            setShowEdit(false)
        }
    })

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const newData = {
            name: editedstationData.name,
            x: editedstationData.x,
            y: editedstationData.y,
            hasTrain: editedstationData.hasTrain,
            hasAirport: editedstationData.hasAirport,
            hasBus: editedstationData.hasBus,
            hasTruck: editedstationData.hasTruck,
            hasDock: editedstationData.hasDock,
            id: stationData.id as number,
        };
        mutation.mutate(newData);
    };

    if (!showEdit) return (
        <button className={styles.editButton} onClick={() => setShowEdit(true)}>
            <FontAwesomeIcon icon={faEdit} size='xs' />
            <span>Edit</span>
        </button>
    )

    return (
        <Modal show={showEdit} onHide={() => setShowEdit(false)} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Edit Station Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className={styles.modalFormPanel}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={editedstationData!.name ?? ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formX">
                        <Form.Label>X (Integer):</Form.Label>
                        <Form.Control
                            type="number"
                            name="x"
                            value={editedstationData.x}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formY">
                        <Form.Label>Y (Number):</Form.Label>
                        <Form.Control
                            type="number"
                            name="y"
                            value={editedstationData.y}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formHasTrain">
                        <Form.Check
                            type="checkbox"
                            label="Has Train"
                            name="hasTrain"
                            checked={editedstationData.hasTrain}
                            onChange={handleCheckboxChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formHasTruck">
                        <Form.Check
                            type="checkbox"
                            label="Is Truck Stop"
                            name="hasTruck"
                            checked={editedstationData.hasTruck}
                            onChange={handleCheckboxChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formHasBus">
                        <Form.Check
                            type="checkbox"
                            label="Is Bus Stop"
                            name="hasBus"
                            checked={editedstationData.hasBus}
                            onChange={handleCheckboxChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formHasAirport">
                        <Form.Check
                            type="checkbox"
                            label="Is Airport"
                            name="hasAirport"
                            checked={editedstationData.hasAirport}
                            onChange={handleCheckboxChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formHasDock">
                        <Form.Check
                            type="checkbox"
                            label="Is Dock"
                            name="hasDock"
                            checked={editedstationData.hasDock}
                            onChange={handleCheckboxChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => setShowEdit(false)}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateStationModal;
