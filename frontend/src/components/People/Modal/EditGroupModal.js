import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios'

function EditGroupModal(props) { 

    const initialFormState = {
        id: props.groupId,
        name: props.groupName
    }

    const [groupUpdate, setGroupUpdate] = useState(initialFormState)

    function handleClick(){
        axios
            .post("http://127.0.0.1:5000/api/people/group/update",groupUpdate)
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
                    Edit User
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={(event) => {
                      event.preventDefault()}}>

                    <Form.Group controlId="formFirstName">
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control required value={groupUpdate.name} onChange={e => setGroupUpdate({...groupUpdate,name: e.target.value})} type="text" placeholder={props.groupName} />
                    </Form.Group>

                    <Button className="float-right" onClick={handleClick} variant="primary" type="submit">
                        Update
                    </Button>
                    
                </Form>
                </Modal.Body>
            </Modal> 
        </div>
    )
}
export default EditGroupModal