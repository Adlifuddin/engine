import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'

//need edit

function LinkText() {
    return (
        <>
            <Container fluid>
                <Row style={{marginTop: 20}}>
                    <Form style={{width: 400, marginBottom: 15, marginLeft: 20}}>
                        <Form.Group>
                            <Form.Label>Link Text</Form.Label>
                            <Form.Control
                                type="text"
                                value=""
                                onChange
                            />
                            </Form.Group>
                    </Form>
                </Row>
            </Container>
        </>
    )
}

export default LinkText