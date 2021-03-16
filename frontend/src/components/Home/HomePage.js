import React from 'react';
import {Container, Row, Col, Button, Badge } from 'react-bootstrap'
import main from '../../assets/images/main.jpg'


function HomePage(){

    const containerStyle = {
        position: 'fixed',
        display: 'flex',
        backgroundRepeat: 'no-repeat',
        background: `url(${main})`,
        maxWidth: '100%',
        height: '93.85%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }

    return (
        <div>
            <Container style={containerStyle}>
                <Container>
                    <Row style={{color:"white", marginTop: '290px'}}>
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
        </div>
    )   
}

export default HomePage