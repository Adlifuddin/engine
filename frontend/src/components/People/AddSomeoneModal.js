import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

function AddSomeoneModal(props) {
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    New User
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control required type="text" placeholder="Johnny" />
                    </Form.Group>

                    <Form.Group controlId="formLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control required type="text" placeholder="Appleseed" />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" placeholder="youlooknicetoday@email.com" />
                    </Form.Group>

                    <Button className="pull-right" variant="primary" type="submit">
                        Create
                    </Button>
                    
                </Form>
                </Modal.Body>
            </Modal>

        </div>     
    )
}
export default AddSomeoneModal