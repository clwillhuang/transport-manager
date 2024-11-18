// EditIndustryTypeForm.tsx
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { baseUrl, fetchPOSTFactory } from '../../tools/serverConn';
import { useMutation } from '@tanstack/react-query';
import type { GETAllCargoResponse } from '@dbtypes/api/schema/apiCargo';
import type { IndustryType } from '@dbtypes/db/schema/industryType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import type { GETAllIndustryTypeResponse } from '@dbtypes/api/schema/apiIndustryType';

interface EditIndustryTypeFormProps {
    selectedType: IndustryType;
    industryTypes: GETAllIndustryTypeResponse,
    cargoes: GETAllCargoResponse;
    saveId: number;
}

const EditIndustryTypeForm: React.FC<EditIndustryTypeFormProps> = ({ 
    // industryTypes, 
    // cargoes,
    selectedType, 
    saveId
}) => {
    const [editedIndustryType, setEditedIndustryType] = useState<IndustryType>({ ...selectedType })

    useEffect(() => {
        setEditedIndustryType(selectedType)
    }, [selectedType.id])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedIndustryType((prev: IndustryType) => ({ ...prev, [name]: value }));
    };

    const [showEdit, setShowEdit] = useState<boolean>(false);

    // const handleCargoSelectionChange = (cargoType: 'accepts' | 'produces', e: ChangeEvent<HTMLSelectElement>) => {
    //     const selectedCargoIds = Array.from(e.target.selectedOptions, (option) => option.value);
    //     setEditedIndustryType((prev) => ({
    //         ...prev,
    //         [cargoType]: cargoes.filter(c => selectedCargoIds.includes(c.id)).map(c => c.id)
    //     }));
    // };

    // const renderSelection = (data: Cargo[] | undefined, title: string, key: 'accepts' | 'produces') => {
    //     const value = data ? data.map((cargo) => cargo.id) : []
    //     const cargoOptions = cargoes.sort((a, b) => a.name.localeCompare(b.name));
    //     return (
    //         <Form.Group key={key} controlId={`form${key}Cargos`}>
    //             <Form.Label>{title}:</Form.Label>
    //             <Form.Control
    //                 as="select"
    //                 multiple
    //                 value={value}
    //                 onChange={(e) => handleCargoSelectionChange(key, e)}
    //             >
    //                 {/* Assuming economy.cargos is an array of available cargos */}
    //                 {cargoOptions.map((cargo) => (
    //                     <option key={cargo.id} value={cargo.id}>
    //                         {cargo.name}
    //                     </option>
    //                 ))}
    //             </Form.Control>
    //         </Form.Group>
    //     )
    // }

    const { isError, ...mutation } = useMutation({
        mutationKey: [saveId, selectedType?.id, showEdit],
        mutationFn: (newData: Partial<IndustryType> & { id: number }) =>
            fetchPOSTFactory(`${baseUrl}/data/${saveId}/industrytypes/${selectedType.id}`, newData),
        onSuccess: () => {
            setShowEdit(false);
        }
    })

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const newData = {
            name: editedIndustryType.name,
            id: selectedType.id as number,
        };
        mutation.mutate(newData);
    };

    if (!showEdit) return (
        <button onClick={() => setShowEdit(true)}>
            <FontAwesomeIcon icon={faEdit} />
            <span>Edit</span>
        </button>
    )

    return (
        <Modal show={showEdit} onHide={() => setShowEdit(false)} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Edit Industry Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formIndustryName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" name="name" value={editedIndustryType.name} onChange={handleChange} />
                    </Form.Group>

                    {/* Selecting and editing available cargos */}
                    {/* {renderSelection(editedIndustryType.produces.get(economy.id), 'Produces', 'produces')}
                    {renderSelection(editedIndustryType.accepts.get(economy.id), 'Accepts', 'accepts')} */}

                    {/* Add other fields as needed */}
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEdit(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditIndustryTypeForm;
