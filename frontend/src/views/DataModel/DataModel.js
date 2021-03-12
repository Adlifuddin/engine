import React from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'

//import tabs
import DataTab from './DataTab';
import SegmentsTab from './SegmentsTab';
import MetricsTab from './MetricsTab';

function DataModel() {

    return (
        <div>
            <Container fluid>
                <Row style={{marginTop: 25}}>
                    <Col>
                        <Tabs defaultActiveKey="data">
                            <Tab eventKey="data" title="Data">
                                <DataTab/>
                            </Tab>
                            <Tab eventKey="segments" title="Segments">
                                <SegmentsTab/>
                            </Tab>
                            <Tab eventKey="metrics" title="Metrics">
                                <MetricsTab/>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default DataModel