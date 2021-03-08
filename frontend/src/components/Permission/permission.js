import React from 'react' 
import { Container, Row, Tabs, Tab } from 'react-bootstrap'


function Permission(){
    return (
        <div>
            <Container fluid>
                <Row>    
                    <div style={{fontSize:"25px", marginLeft:"65px"}}>
                        <Tabs defaultActiveKey="data-permission" id="uncontrolled-tab-example">
                            <Tab eventKey="data-permission" title="Data Permissions">
                                <h1>Data permissions</h1>
                            </Tab>
                            <Tab eventKey="collection-permission" title="Collection Permissions">
                                <h1>Collection permissions</h1>
                            </Tab>
                        </Tabs>
                    </div>
                </Row>
            </Container>
        </div>    
    )

}

export default Permission