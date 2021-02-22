import React, { useEffect, useState } from 'react'
import {Card, CardHeader, CardBody, Row, Col, Table} from 'reactstrap'
import { Form, Button} from 'react-bootstrap'
import api from '../../api/metabaseApi'
import { Link } from 'react-router-dom'
import './DatabaseList.css'

function DatabaseList() {
    const [sessionsID, setSessionsID] = useState("")
    const [databaseLists, setDatabaseList] = useState([])

    useEffect(() => {
        const data = {
            "username": "jiahao.leong@nexent.co",
            "password": "Jiahao051",
        }
        api.session(data)
            .then(response => {
                localStorage.setItem("sessions", response.data.id)
                setSessionsID(response.data.id)
                api.databaseList()
                    .then(response => {
                        setDatabaseList(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const click = () => {
        const data = {"engine": "postgres", "name": "demo", "details": {"host": "202.165.22.213", "password": "qazQAZ123!@#", "port": "5432", "dbname": "google_drive", "user": "root"}}
        
        api.createDatabase(data)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <Card style={{ margin: '20px' }}>
            <CardHeader>
                <Row>
                    <Col>
                        <h3>Databases</h3>
                    </Col>
                    <Col>
                        <Link to="/database/add"><Button style={{ float: 'right'}}>Add a Database</Button></Link>
                    </Col>
                </Row>
                
               
            </CardHeader>
            <Table hover borderless>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Engine</th>
                        <th></th>
                    </tr>
                </thead>
                {databaseLists.map(x => (
                    <tbody key={x.id}>
                        <tr>
                            <td><Link to={{pathname: `/database/${x.id}`, query: {name: x.name, id: x.id}}}>{x.name}</Link></td>
                            <td>{x.engine}</td>
                            <td><Button variant="danger" className="delete" style={{ float: 'right'}}>Delete</Button></td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        </Card>
    )
}

export default DatabaseList
