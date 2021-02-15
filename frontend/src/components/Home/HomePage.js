import React from 'react';
import {Container, Row, Col, Jumbotron, Button, Badge } from 'react-bootstrap'
import Footer from '../Footer/Footer';


function HomePage(){

    const containerStyle = {
        position:"absolute", 
        top:"50%", 
        left:"50%", 
        transform:"translate(-50%,-50%)"
    }

    return (
        <div>
            <Container style={containerStyle}>
                <Row style={{color:"white", marginTop:"50px"}}>
                     <Col>
                           <h1>Data Integration</h1>
                           <br/>
                           <h2>Connect all your <Badge style={{ cursor: "pointer"}} pill variant="primary" onClick={() => window.location.href = "/integration"}>Nexent Dashboard</Badge> data Here</h2>
                           <br/>
                           <p>
                               <Button variant="warning">Learn more</Button>
                          </p>
                     </Col>
                </Row>  
            </Container>   
            <Footer footerPosition="absolute"/>
        </div>
    )   
}

export default HomePage