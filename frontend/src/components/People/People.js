import React from 'react' 
import PeopleSideBar from './peopleSideBar'
import { Container, Row } from 'react-bootstrap'


function People(){
    return (
        <div>
            <Container fluid>
                <Row>    
                    <PeopleSideBar />
                </Row>
            </Container>
        </div>     
    )

}

export default People