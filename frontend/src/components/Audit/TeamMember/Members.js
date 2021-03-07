import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import ApiLoader from '../../Loader/ApiLoader';



function Members(){
    const [loading,setLoading] = useState(false)
    const [members,setMembers] = useState([])

    useEffect(() => {
        setLoading(true)
        axios
            .get("http://localhost:5000/api/audit/members")
            .then(res => {
                setMembers(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    return(
        <div>
            <Container fluid>
                <Row>
                    <SideBar />
                    <Col style={{marginTop:"10px", marginLeft:"100px"}} xs lg={9}>  
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Audit</Breadcrumb.Item>
                            <Breadcrumb.Item active>Team Members</Breadcrumb.Item>
                        </Breadcrumb>
                        {loading === true ? <ApiLoader apiload={loading} /> :
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
                        </Table>}
                    </Col>
                </Row>  
            </Container>      
        </div>
    )
}

export default Members