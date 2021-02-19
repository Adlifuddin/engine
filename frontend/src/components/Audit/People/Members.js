import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Table } from 'react-bootstrap'

function Members(){
    const [members,setMembers] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/members")
            .then(res => {
                console.log(res.data)
                setMembers(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

   
    
    return(
        <div>
           <Container>
                <Row>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date Joined</th>
                                <th>Last Login</th>
                                <th>User Type</th>    
                            </tr>
                        </thead>
                        {members.map(member => (
                            <tbody key={member.id}>
                                <tr>
                                    <td>{member.first_name} {member.last_name}</td>
                                    <td>{member.email}</td>
                                    <td>{member.date_joined}</td>
                                    <td>{member.last_login}</td>
                                    <td>{member.user}</td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </Row>
            </Container>       
        </div>
    )
}

export default Members