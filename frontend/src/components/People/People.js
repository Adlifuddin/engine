import React from 'react' 
import PeopleSideBar from './peopleSideBar'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import ActivePeople from './ActivePeople'
import DeactivatedPeople from './DeactivatedPeople'


function People(){
    return (
        <div>
            <Container fluid>
                <Row>    
                    <PeopleSideBar />
                    <Col style={{marginTop:"10px", marginLeft:"100px"}} xs lg={9}>  
                        <div style={{fontSize:"15px"}}>
                            <Tabs defaultActiveKey="active-people" id="uncontrolled-tab-example">
                                <Tab eventKey="active-people" title="Active">
                                    <ActivePeople />
                                </Tab>
                                <Tab eventKey="deactive-people" title="Deactivated">
                                    <DeactivatedPeople />
                                </Tab>
                            </Tabs>
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        </div>     
    )

}

export default People