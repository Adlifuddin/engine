import React from 'react'
import { Container, Row, Col, Tabs, Tab, Button } from 'react-bootstrap'
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from 'react-router-dom'

//import tabs
import FieldUpdate from './FieldUpdate'
import FormattingTab from './FormattingTab'

function UpdateTab(props) {

    const path = props.location.pathname
    const pathname = path.split("/")
    const status = pathname[2]
    const index = pathname[3]

    return (
        <div>
            <Container fluid>
                <Row style={{marginTop: 25, marginLeft: 15}}>
                    <Col>
                        <a href="/data-model">
                            <Button variant="light" style={{marginBottom: 30, height: 50, width: 50, borderRadius:"100%"}}>
                                <IoArrowBackSharp/>
                            </Button>
                        </a>
                        <Tabs defaultActiveKey="general">
                            <Tab eventKey="general" title="General">
                                <FieldUpdate status={status} index={index} />
                            </Tab>
                            <Tab eventKey="formatting" title="Formatting">
                                <FormattingTab status={status} index={index}/>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UpdateTab