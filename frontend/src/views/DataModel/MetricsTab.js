import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'

//import icons
import { FiChevronDown } from "react-icons/fi";

//for metrics tab
function MetricsTab() {
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <Dropdown style={{marginLeft: 20, marginTop: 20}}>
                            <Dropdown.Toggle variant="white" style={{height: 40, width: 150}}>
                                    Filter by Table
                                <FiChevronDown style={{marginLeft: 30}}/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="">Datasource</Dropdown.Item>
                                <Dropdown.Item href="">Finance</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Button variant="secondary" style={{float: "right", marginTop: 20, height: 40}}>
                            New Metric
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {/* add table with 3 columns name, definition, action */}
                    <Table style={{marginTop: 20}}>
                        <thead>
                            <th>Name</th>
                            <th>Definition</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                            {/* to be added */}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </div>
    )
}

export default MetricsTab