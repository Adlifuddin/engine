import React from 'react' 
import PermissionSideBar from './permissionSideBar'
import { Container, Row } from 'react-bootstrap'


function Permission(){
    return (
        <div>
            <Container fluid>
                <Row>    
                    <PermissionSideBar />
                </Row>
            </Container>
        </div>    
    )

}

export default Permission