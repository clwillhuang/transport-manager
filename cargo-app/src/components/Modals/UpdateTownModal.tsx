import React, { useState, ChangeEvent, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { baseUrl, fetchPOSTFactory } from '../../tools/serverConn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Town } from '@dbtypes/db/schema/town';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import styles from './UpdateModal.module.css'

interface UpdateTownModalProps {
    townData: Town;
    saveId: number;
}

const UpdateTownModal: React.FC<UpdateTownModalProps> = ({ townData, saveId }) => {
    const [editedTownData, setEditedTownData] = useState<Town>({ ...townData })

    const queryClient = useQueryClient()

    useEffect(() => {
        setEditedTownData(townData)
    }, [townData])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedTownData((prev: Town) => ({ ...prev, [name]: value }));
    }

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setEditedTownData((prev: Town) => ({ ...prev, [name]: checked }));
    };

    const [showEdit, setShowEdit] = useState<boolean>(false);

    const { isError, ...mutation } = useMutation({
        mutationKey: [saveId, townData?.id],
        mutationFn: (newData: Partial<Town> & { id: number }) =>
            fetchPOSTFactory(`${baseUrl}/data/${saveId}/towns/${editedTownData.id}`, newData),
        onSuccess: () => { 
            queryClient.invalidateQueries({ queryKey: ['town', saveId, editedTownData.id] })
            setShowEdit(false)
         }
    })

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const newData = {
            name: editedTownData.name,
            x: editedTownData.x,
            y: editedTownData.y,
            population: editedTownData.population,
            isCity: editedTownData.isCity,
            id: townData.id as number,
        };
        mutation.mutate(newData);
    };

    if (!showEdit) return (
        <Button className={styles.editButton} onClick={() => setShowEdit(true)}>
            <FontAwesomeIcon icon={faEdit} size='xs' />
            <span>Edit</span>
        </Button>
    )

    return (
        <Modal show={showEdit} onHide={() => setShowEdit(false)} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Edit Town Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className={styles.modalFormPanel}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={editedTownData!.name ?? ''}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formX">
                        <Form.Label>X (Integer):</Form.Label>
                        <Form.Control
                            type="number"
                            name="x"
                            value={editedTownData.x}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formY">
                        <Form.Label>Y (Number):</Form.Label>
                        <Form.Control
                            type="number"
                            name="y"
                            value={editedTownData.y}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPopulation">
                        <Form.Label>Population</Form.Label>
                        <Form.Control
                            type="number"
                            name="population"
                            value={editedTownData.population}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formIsCity">
                        <Form.Check
                            type="checkbox"
                            label="Is City"
                            name="isCity"
                            checked={editedTownData.isCity}
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

export default UpdateTownModal;
