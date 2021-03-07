import React, { useState, useEffect } from 'react'
import {Container, Card, Row } from 'react-bootstrap'
import Footer from '../../components/Footer/Footer'
// import {image} from './Image'
import Modals from '../../components/Modal/Modal'
import ApiLoader from '../../components/Loader/ApiLoader'

function Integration() {
    const [load, setLoad] = useState(false)

    const click = (e) => {
        return window.location.href = `/${e.target.id}`
    }

    useEffect(() => {
        setLoad(true)
        window.setTimeout(() => {
            setLoad(false)
        }, 500)
    }, [])

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
        <div>
            <Container fluid >
                {/* {load? 
                    <ApiLoader apiload={load}/>
                    :
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
                } */}
            </Container>
        </div>
    )
}

export default Integration