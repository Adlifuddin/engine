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
                    <Col fluid>
                        <Card style={CardColor}>
                            <CardHeader style={CardHeaderColor}>
                            <Row>
                                <Col>
                                     <h3>People</h3>
                                </Col>
                                 <Col>
                                <   Link to=""><Button className="add-database">Add Someone</Button></Link>
                                 </Col>
                            </Row>
                                        </CardHeader>
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
                    </Card>
                 </Col>  
                </Row>
            </Container>
        </div>     
    )

}

export default People