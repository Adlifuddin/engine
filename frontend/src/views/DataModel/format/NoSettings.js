import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

//import image
import none from '../image/none.svg'

//import styles
import { titleHeadingColor, titleRowColor } from '../../../components/customStyle/TableColor'

function NoSettings() {
    return (
        <>
            <Container fluid>
                <Row style={{marginTop: 20}}>
                    <img src={none} alt="none" />
                </Row>
                <Row>
                    <h7 style={{...titleRowColor}}> No formatting settings </h7>
                </Row>
            </Container>
        </>
    )
}

export default NoSettings