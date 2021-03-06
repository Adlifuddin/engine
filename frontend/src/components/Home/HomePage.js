import React from 'react';
import {Container, Row, Col, Button, Badge } from 'react-bootstrap'
import Footer from '../Footer/Footer';
import main from '../../assets/images/main.jpg'


function HomePage(){

    const containerStyle = {
        position: 'absolute',
        backgroundRepeat: 'no-repeat',
        background: `url(${main})`,
        maxWidth: '100%',
        height: '93%',
    }

    return (
        <div>
            <Container style={containerStyle}>
                <Container>
                    <Row style={{color:"white", marginTop: '300px'}}>
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
                
            </Container>   
            <Footer footerPosition="absolute"/>
        </div>
    )   
}

export default HomePage