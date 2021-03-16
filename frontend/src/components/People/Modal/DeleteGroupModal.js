import React, { useState } from 'react'
import { Button, Modal, Alert } from 'react-bootstrap'
import axios from 'axios'

function DeleteGroupModal(props) { 

    const GroupId = {id: props.groupId,}

    function handleClick(){
        axios
        .post("http://127.0.0.1:5000/api/people/group/remove",GroupId)
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
                    Remove this group?
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure? All members of this group will lose any permissions settings they have based on this group. This can't be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClick} variant="danger" >Remove</Button>
                </Modal.Footer>
            </Modal> 
        </div>
    )
}
export default DeleteGroupModal