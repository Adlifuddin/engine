import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios'


function DeactivateUserModal(props) {

    const UserId = {id: props.UserId,}
    const UserName = {first_name: props.UserName,}

    function handleClick(){
        axios
        .post("http://127.0.0.1:5000/api/people/user/deactive",UserId)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })

        window.location.reload()
    }




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
                    Deactivate user 
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This user won't be able to log in anymore.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick ={handleClick}>Deactivate</Button>
                </Modal.Footer>
            </Modal>
        </div>     
    )
}
export default DeactivateUserModal