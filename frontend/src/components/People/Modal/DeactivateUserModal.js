import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

function DeactivateUserModal(props) {

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
                    Deactivate Faizal
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Faizal won't be able to log in anymore.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" >Deactivate</Button>
                </Modal.Footer>
            </Modal>
        </div>     
    )
}
export default DeactivateUserModal