import React, { useState } from 'react'
import {Container, Card, Row } from 'react-bootstrap'
import Footer from '../../components/Footer/Footer'
import {image} from './Image'
import Modals from '../../components/Modal/Modal'

function Integration() {

    const click = (e) => {
        
        return window.location.href = `/${e.target.id}`
    }

    const containerStyle = {
        marginTop: "40px",
        marginLeft:"50px",
        marginRight:"50px"
    }

    const cardStyle = {
        width: "18rem",
        margin: "20px 20px 20px 20px",
        cursor: "pointer"
    }

    return (
        <div >
            <Container fluid >
                <Row style={{marginLeft: 'auto', marginRight: "auto", verticalAlign: "middle", overflow: "hidden"}}>
                    {image.map(x => (
                        <Card border="warning" style={cardStyle} onClick={click} >
                            <Card.Img  variant="top"  id={x.id} src={x.image}/>
                            <Card.Body style={{textAlign:"center"}} id={x.id}>
                                <Card.Title id={x.id}>{x.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    ))
                    }
                </Row>
            </Container>
            <Footer footerPosition="relative"/>
        </div>
    )
}

export default Integration