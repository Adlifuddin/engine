import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Form, Table, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'

//import api
import api from "../../api/metabaseApi";

function FieldUpdate(props) {
    // const path = props.location.pathname
    // const pathname = path.split("/")
    // const status = pathname[2]
    // const index = pathname[3]

    const [field, setField] = useState([])
    const [tableID, setTableID] = useState("")

    //to get database table and display fields
    // useEffect(() => {
    //     api.getTableIDMeta(status)
    //         .then( res => {
    //             console.log(res)
    //             res.data.fields.map((x, i) => {
    //                 // console.log(x)
    //                 // edit lagi sikit
    //                 if(i == index){
    //                     console.log(x)
    //                     setField(x)
    //                 }
    //             })
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }, [])

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col md={3}>
                        {/* For side nav */}
                    </Col>
                    <Col>
                        {/* Field Form */}
                        <Row style={{marginTop: 100}}>
                            {/* name */}
                            <Form style={{width: 250}}>
                                    <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value = {field.display_name}
                                        onChange
                                    />
                                    </Form.Group>
                            </Form>
                        </Row>
                        <Row>
                            {/* visibility */}
                            <Form style={{width: 250}}>
                                    <Form.Group>
                                    <Form.Label>Visibility</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value = {field.visibility_type}
                                        onChange
                                    />
                                    </Form.Group>
                            </Form>
                        </Row>
                        <Row>
                            {/* field type */}
                            <Form style={{width: 250}}>
                                    <Form.Group>
                                    <Form.Label>Field Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value = {field.special_type}
                                        onChange
                                    />
                                    </Form.Group>
                            </Form>
                        </Row>
                        <Row>
                            {/* display field type */}
                        </Row>
                        <Row>
                            {/* display values */}
                        </Row>
                        <Row>
                            {/* cached field values */}
                        </Row>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}

export default FieldUpdate