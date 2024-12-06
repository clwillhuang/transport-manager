import React, { useState, ChangeEvent, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { baseUrl, fetchPOSTFactory } from '../../tools/serverConn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import styles from './UpdateModal.module.css'
import type { Sign } from '@dbtypes/db/schema/sign'

interface UpdateSignModalProps {
    signData: Sign;
    saveId: number;
}

const UpdateSignModal: React.FC<UpdateSignModalProps> = ({ signData, saveId }) => {
    const [editedSignData, setEditedSignData] = useState<Sign>({ ...signData })

    const queryClient = useQueryClient()

    useEffect(() => {
        setEditedSignData(signData)
    }, [signData])

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedSignData((prev: Sign) => ({ ...prev, [name]: value }));
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setEditedSignData((prev: Sign) => ({ ...prev, [name]: checked }));
    };

    const [showEdit, setShowEdit] = useState<boolean>(false);

    const { isError, ...mutation } = useMutation({
        mutationKey: [saveId, signData?.id],
        mutationFn: (newData: Partial<Sign> & { id: number }) =>
            fetchPOSTFactory(`${baseUrl}/data/${saveId}/signs/${editedSignData.id}`, newData),
        onSuccess: () => { 
            queryClient.invalidateQueries({ queryKey: ['sign', editedSignData.id] })
            queryClient.invalidateQueries({ queryKey: ['sign'] })
            setShowEdit(false) 
        }
    })

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const newData = {
            text: editedSignData.text,
            x: editedSignData.x,
            y: editedSignData.y,
            id: signData.id as number,
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
                <Modal.Title id="contained-modal-title-vcenter">Edit Sign Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className={styles.modalFormPanel}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="text"
                            value={editedSignData!.text ?? ''}
                            onChange={handleTextChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formX">
                        <Form.Label>X (Integer):</Form.Label>
                        <Form.Control
                            type="number"
                            name="x"
                            value={editedSignData.x}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formY">
                        <Form.Label>Y (Number):</Form.Label>
                        <Form.Control
                            type="number"
                            name="y"
                            value={editedSignData.y}
                            onChange={handleChange}
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

export default UpdateSignModal;
