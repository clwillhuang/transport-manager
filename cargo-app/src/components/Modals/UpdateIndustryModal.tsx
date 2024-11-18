import React, { useState, ChangeEvent, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { baseUrl, fetchPOSTFactory } from '../../tools/serverConn';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { Industry } from '@dbtypes/db/schema/industry';
import type { IndustryType } from '@dbtypes/db/schema/industryType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import type { GETAllIndustryTypeResponse } from '@dbtypes/api/schema/apiIndustryType';
import styles from './UpdateModal.module.css'

interface UpdateIndustryModalProps {
    industryData: Industry;
    saveId: number;
}

const UpdateIndustryModal: React.FC<UpdateIndustryModalProps> = ({ industryData, saveId }) => {
    const [editedIndustryData, setEditedIndustryType] = useState<Industry>({ ...industryData })

    useEffect(() => {
        setEditedIndustryType(industryData)
    }, [industryData.id])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedIndustryType((prev: Industry) => ({ ...prev, [name]: value }));
    };

    const [showEdit, setShowEdit] = useState<boolean>(false);

    const { data: industryTypes, isLoading } = useQuery<GETAllIndustryTypeResponse>({
        queryKey: [`industrytypes`],
        queryFn: () => fetch(`${baseUrl}/data/${saveId}/industrytypes/`, { method: 'GET' }).then(res => res.json()),
        enabled: !!saveId && showEdit,
    })

    const { isError, ...mutation } = useMutation({
        mutationKey: [saveId, industryData?.id],
        mutationFn: (newData: Partial<IndustryType> & { id: number }) =>
            fetchPOSTFactory(`${baseUrl}/data/${saveId}/industries/${industryData.id}`, newData),
        onSuccess: () => {
            setShowEdit(false)
        }
    })

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const newData = {
            name: editedIndustryData.name,
            x: editedIndustryData.x,
            y: editedIndustryData.y,
            industryTypeId: editedIndustryData.industryTypeId,
            id: industryData.id as number,
        };
        mutation.mutate(newData);
    };

    if (!showEdit) return (
        <button className={styles.editButton} onClick={() => setShowEdit(true)}>
            <FontAwesomeIcon icon={faEdit} size='xs' />
            <span>Edit</span>
        </button>
    )

    if (isLoading || !industryTypes) return <>Loading ...</>

    return (
        <Modal show={showEdit} onHide={() => setShowEdit(false)} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Edit Industry Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className={styles.modalFormPanel}>
                    <Form.Group controlId="formIndustryName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" name="name" value={editedIndustryData.name} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formIndustryType">
                        <Form.Label>Industry Type:</Form.Label>
                        <Form.Control
                            as="select"
                            name="industryTypeId"
                            value={editedIndustryData.industryTypeId} // Assuming this property exists in your data
                            onChange={handleChange}
                        >
                            {industryTypes.map((type) => (
                                <option key={`type${type.id}`} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formX">
                        <Form.Label>Tile X:</Form.Label>
                        <Form.Control
                            type="number"
                            name="x"
                            value={editedIndustryData.x}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formY">
                        <Form.Label>Tile Y:</Form.Label>
                        <Form.Control
                            type="number"
                            name="y"
                            value={editedIndustryData.y}
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

export default UpdateIndustryModal;
