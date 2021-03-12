import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Card, CardHeader} from 'reactstrap'
import PeopleSideBar from './peopleSideBar'
import { Link} from 'react-router-dom';
import { Container, Row, Col, Tab,Tabs, Table, Button } from 'react-bootstrap'
import { ResponsiveContainer } from 'recharts';
import {CardHeaderColor, CardColor} from '../../components/customStyle/DatabaseColor'
import api from '../../api/index'
import CreateGroup from './CreateGroup'


function Groups(){

    const [peopleGroups,setgroupsPeople] = useState([])
    const [createGroupShow,setCreateGroupShow] = useState(false)

    useEffect(() => {
        api.peopleAllGroup()
            .then(res => {
                setgroupsPeople(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [peopleGroups])

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
                                        <Button onClick={() => setCreateGroupShow(!createGroupShow)} className="add-database">Create a group</Button>
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
                                        { createGroupShow ? <CreateGroup Show={true} /> : null }
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