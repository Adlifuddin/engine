import React from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'

//import tabs
import FieldUpdate from './FieldUpdate'

function UpdateTab() {
    return (
        <div>
            <Container fluid>
                <Row style={{marginTop: 25}}>
                    <Col>
                        <Tabs defaultActiveKey="general">
                            <Tab eventKey="general" title="General">
                                <FieldUpdate/>
                            </Tab>
                            <Tab eventKey="formatting" title="Formatting">
                                
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UpdateTab