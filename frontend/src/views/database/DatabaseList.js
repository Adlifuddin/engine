import React, { useEffect, useState } from 'react'
import {Card, CardHeader, Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { Button} from 'react-bootstrap'
import api from '../../api/metabaseApi'
import { Link } from 'react-router-dom'
import './DatabaseList.css'

function DatabaseList() {
    const [sessionsID, setSessionsID] = useState("")
    const [databaseLists, setDatabaseList] = useState([])
    const [modalDelete, setModalDelete] = useState(false);
    const toggleDelete = () => setModalDelete(!modalDelete);
    const [Delete, setDelete] = useState("")
    const [disabling, setDisabling] = useState(true);
    const [id, setID] = useState("");

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
    }, [false])


    const deleteDatabase = () => {
        if (Delete === 'delete') {
            api.deleteDatabase(id)
                .then(response => {
                    window.location.href = "/database"
                })
                .catch(error => {
                    console.log(error)
                })
        } else {

        }
    }

    const toggleDeleting = (e) => {
        const id = e.target.value
        setID(id)
        toggleDelete()
    }

    const deleting = (e) => {
        const data = e.target.value.toLowerCase()
        if (data === 'delete') {
            setDisabling(false)
        } else {
            setDisabling(true)
        }
        setDelete(data)
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
            <Table hover borderless >
                <thead>
                    <tr id="title">
                        <th style={{color: '#78909c'}}>Name</th>
                        <th style={{color: '#78909c'}}>Engine</th>
                        <th>   </th>
                    </tr>
                </thead>
                <tbody>
                {databaseLists.map(x => (
                    <tr key={x.id}>
                        <td><Link to={{ pathname: `/database/${x.id}`, query: { name: x.name, id: x.id } }} style={{color: '#78909c', fontWeight: 'bold'}}>{x.name}</Link></td>
                        <td style={{color: '#78909c'}}>{x.engine}</td>
                        <td style={{width: '632.22px', height: '59.76px'}}><Button variant="danger" id='danger-button' style={{ float: 'right'}} onClick={toggleDeleting} value={x.id}>Delete</Button></td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal isOpen={modalDelete} toggle={toggleDelete}>
            <ModalHeader toggle={toggleDelete}>Delete this database?</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            All saved questions, metrics, and segments that rely on this database will be lost. 
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p style={{fontWeight: 'bold'}}>This cannot be undone.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            If you're sure, please type DELETE in this box:
                        </Col>
                    </Row>
                    <br/>
                    <input type="text" value={Delete} onChange={deleting}/>
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onClick={toggleDelete}>Cancel</Button>{' '}
                    <Button variant="danger" onClick={deleteDatabase} disabled={disabling}>Delete</Button>
                </ModalFooter>
            </Modal>
        </Card>
    )
}

export default DatabaseList
