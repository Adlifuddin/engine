import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

function ResetPasswordModal(props) {

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
                    Reset Faizal's Password
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to do this?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" >Reset password</Button>
                </Modal.Footer>
            </Modal>

        </div>     
    )
}
export default ResetPasswordModal