import React from 'react' 
import PeopleSideBar from './peopleSideBar'
import { Container, Row, Col, Tabs, Tab, Button } from 'react-bootstrap'
import ActivePeople from './ActivePeople'
import DeactivatedPeople from './DeactivatedPeople'
import {CardHeaderColor, CardColor} from '../../components/customStyle/DatabaseColor'
import {Card, CardHeader} from 'reactstrap'
import { Link} from 'react-router-dom';



function People(){
    return (
        <div>
            <Container fluid>
                <Row>    
                    <PeopleSideBar />
                    <Col style={{marginTop:"10px", marginLeft:"100px"}} xs lg={9}>  
                        <div style={{fontSize:"17px"}}>
                            <Tabs defaultActiveKey="active-people" id="uncontrolled-tab-example">
                                <Tab eventKey="active-people" title="Active">
                                    <Button style={{float:"right", fontSize:"18px", marginTop:"15px",marginBottom:"15px"}} variant="secondary">Add someone</Button>
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