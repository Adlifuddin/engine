import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

function ReactivateUserModal(props) { 
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
                    Reactivate Faizal?
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    They'll be able to log in again, and they'll be placed back into the groups they were in before their account was deactivated.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" >Reactivate</Button>
                </Modal.Footer>
            </Modal>
        </div>     
    )
}
export default ReactivateUserModal