import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

function EditGroupModal(props) { 
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
                    Edit User
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control required value={props.groupName} type="text" placeholder="Something like Marketing" />
                    </Form.Group>

                    <Button className="float-right" variant="primary" type="submit">
                        Update
                    </Button>
                    
                </Form>
                </Modal.Body>
            </Modal> 
        </div>
    )
}
export default EditGroupModal