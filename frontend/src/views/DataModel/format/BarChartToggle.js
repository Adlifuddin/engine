import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'

//need edit

function BarChartToggle() {
    return (
        <>
            <Container fluid>
                <Row style={{marginTop: 20}}>
                    <Form style={{marginBottom: 15, marginLeft: 20}}>
                        <Form.Label>Show a mini bar chart</Form.Label>
                        <Form.Check
                            type="switch"
                            checked
                            onChange
                        />
                    </Form>
                </Row>
            </Container>
        </>
    )
}

export default BarChartToggle
