import React from 'react' 
import { Container, Row, Tabs, Tab } from 'react-bootstrap'
import CollectionPermission from './CollectionPermission'
import DataPermission from './DataPermission'

function Permission() {

    return (
        <div>
            <Container fluid>
                <div style={{fontSize:"14px"}}>
                    <Tabs defaultActiveKey="data-permission" id="uncontrolled-tab-example">
                        <Tab eventKey="data-permission" title="Data Permissions">
                            <DataPermission/>
                        </Tab>
                        <Tab eventKey="collection-permission" title="Collection Permissions">
                            <CollectionPermission/>
                        </Tab>
                    </Tabs>
                </div>
            </Container>
        </div>    
    )

}

export default Permission