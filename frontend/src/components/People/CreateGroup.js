import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

function CreateGroup(props){
    return ( 
        <div>
            <Form>
                <Row>
                    <Col lg={10}>
                        <Form.Group controlId="formCreateGroup">
                            <Form.Control size="lg" type="text" placeholder='Something like "Marketing"' />
                        </Form.Group>   
                    </Col>
                    <Col>
                        <Button className="float-right" size="lg">Add</Button>
                    </Col>                  
                </Row> 
            </Form>
        </div>
    )
}

export default CreateGroup