import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'

function CreateGroup(props){

    const initialFormState = {
        name: "",
    }

    const [group, setGroup] = useState(initialFormState)

    function handleClick(){
        axios
            .post("http://127.0.0.1:5000/api/people/listgroups",group)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return ( 
        <div>
            <Form onSubmit={(event) => {
                  event.preventDefault()
                  setGroup(initialFormState)}}>
                <Row>
                    <Col lg={10}>
                        <Form.Group controlId="formCreateGroup">
                            <Form.Control size="lg" type="text" value={group.name} onChange={e => setGroup({...group,name: e.target.value})} placeholder='Something like "Marketing"' />
                        </Form.Group>   
                    </Col>
                    <Col>
                        <Button className="float-right" onClick={handleClick} type="submit" size="lg">Add</Button>
                    </Col>                  
                </Row> 
            </Form>
        </div>
    )
}

export default CreateGroup