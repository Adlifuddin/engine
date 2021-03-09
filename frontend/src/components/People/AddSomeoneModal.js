import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap'
import Select from 'react-select'


function AddSomeoneModal(props) {

    const[listGroup, setListGroup] = useState([])

    useEffect(() => {
        axios
        .get("http://localhost:5000/api/people/listgroups")
        .then(res => {
            console.log(res.data)
            setListGroup(res.data)
        })
        .catch(err => {
            console.log(err)
        })    
    }, [])

    const options = listGroup.map(data => ({value:data.name,label:data.name}))

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

                    <Form.Group controlId="formUserGroups">
                        <Form.Label>Groups</Form.Label>
                        <Select isMulti={true} options={options} required type="usergroups" />
                    </Form.Group>

                    <Button className="float-right" variant="primary" type="submit">
                        Create
                    </Button>
                    
                </Form>
                </Modal.Body>
            </Modal>

        </div>     
    )
}
export default AddSomeoneModal