import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';



function Members(){
    const [members,setMembers] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/members")
            .then(res => {
                setMembers(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

   
    
    return(
        <div>
            <Container fluid>
                <Row>
                    <Col style={{marginLeft:"0px"}}>
                        <SideBar />
                    </Col>
                    <Col style={{marginTop:"10px", marginRight:"50px"}} xs lg={9}>  
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Audit</Breadcrumb.Item>
                            <Breadcrumb.Item active>Team Members</Breadcrumb.Item>
                        </Breadcrumb>
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Date Joined</th>
                                    <th>Group</th>
                                    <th>Last Login</th>     
                                </tr>
                            </thead>
                            {members.map(member => (
                                <tbody key={member.id}>
                                    <tr>
                                        <td>{member.first_name} {member.last_name}</td>
                                        <td>{member.email}</td>
                                        <td>{member.date_joined}</td>
                                        <td>{member.user}</td>
                                        <td>{member.last_login}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>
                    </Col>
                </Row>  
            </Container>      
        </div>
    )
}

export default Members