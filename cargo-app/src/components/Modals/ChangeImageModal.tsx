import React, { useState } from 'react';
import { Form, Button, Modal, Col, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import styles from './UpdateModal.module.css'

interface UpdateImageModalProps {
    image: HTMLImageElement | null;
    setImage: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>;
}

const UpdateImageModal: React.FC<UpdateImageModalProps> = ({ setImage }) => {
    const [file, setFile] = useState<File | null>(null);
    const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
        setFile(e.target.files?.[0] || null);
    }
    const [showEdit, setShowEdit] = useState<boolean>(false);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        console.log(file)

        if (file) {
            // Read the selected file and create an HTMLImageElement
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const img = new Image();
                    img.src = event.target.result as string;
                    setImage(img);
                }
            };
            reader.readAsDataURL(file);
        } else {
            // If no file is selected, set image to null
            setImage(null);
        }
        setShowEdit(false);
    };

    if (!showEdit && import.meta.env.VITE_ENABLE_SOCKET === 'on') return (
        <Button className={styles.editButton} onClick={() => { setShowEdit(true); setFile(null)}}>
            <FontAwesomeIcon icon={faEdit} size='xs' />
            <span>Upload New Map Image</span>
        </Button>
    )

    return (
        <Modal show={showEdit} onHide={() => setShowEdit(false)} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Select new image file</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form className={styles.form} onSubmit={handleSubmit}>
                <FormGroup as={Row} className="my-3">
                    <FormLabel column sm={4}>Image File</FormLabel>
                    <Col sm={8}>
                        <FormControl
                            type="file"
                            accept="image/*"
                            onChange={onFileChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Button variant="primary" type="submit" disabled={!file}>
                        Upload
                    </Button>
                </FormGroup>
            </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateImageModal;
