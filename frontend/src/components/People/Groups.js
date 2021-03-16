import React,{useState, useEffect} from 'react'
import {Card, CardHeader} from 'reactstrap'
import { Row, Col, Table, Button } from 'react-bootstrap'
import { ResponsiveContainer } from 'recharts';
import {CardHeaderColor, CardColor} from '../../components/customStyle/DatabaseColor'
import api from '../../api/index'
import CreateGroup from './CreateGroup'
import EditGroupOption from './EditGroupOption';
import PeopleGroups from './PeopleGroups';


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

    }, [])

    

    return (
        <PeopleGroups>
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
                                    {peopleGroups.groups != "All Users" && peopleGroups.groups != "Administrators" ? <EditGroupOption groupId={peopleGroups.id} groupName={peopleGroups.groups}/> : null}
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </ResponsiveContainer>
            </Card>
        </PeopleGroups> 
    )

}

export default Groups