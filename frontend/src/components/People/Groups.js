import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Card, CardHeader} from 'reactstrap'
import PeopleSideBar from './peopleSideBar'
import { Link} from 'react-router-dom';
import { Container, Row, Col, Tab,Tabs, Table, Button } from 'react-bootstrap'
import { ResponsiveContainer } from 'recharts';
import {CardHeaderColor, CardColor} from '../../components/customStyle/DatabaseColor'



function Groups(){

    const [peopleGroups,setgroupsPeople] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/people/groups")
            .then(res => {
                setgroupsPeople(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    return (
        <div>
            <Container fluid>
                <Row>    
                    <PeopleSideBar />
                    <Col fluid>
                        <Card style={CardColor}>
                            <CardHeader style={CardHeaderColor}>
                                <Row>
                                    <Col>
                                        <h3>Groups</h3>
                                        <p>You can use groups to control your users' access to your data. Put users in groups and then go to the Permissions section to control each group's access. The Administrators and All Users groups are special default groups that can't be removed.</p>
                                    </Col>
                                    <Col>
                                    <   Link to=""><Button className="add-database">Create a group</Button></Link>
                                    </Col>
                                </Row>
                            </CardHeader>      
                                <ResponsiveContainer width="95%" height={280}>
                                    <Table hover borderless>
                                        <thead>
                                            <th>Group Name</th>
                                            <th>Members</th>   
                                        </thead> 
                                        <tbody>
                                        {peopleGroups.map(peopleGroups => (
                                            <tr key={peopleGroups.id}>
                                                <td>{peopleGroups.groups}</td>
                                                <td>{peopleGroups.count}</td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </ResponsiveContainer>
                        </Card>
                    </Col>              
                </Row>
            </Container>
        </div>     
    )

}

export default Groups