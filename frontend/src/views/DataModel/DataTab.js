import React from 'react'
import { Form, Table, Button } from 'react-bootstrap'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//import icons
import { FiSettings } from "react-icons/fi";
import { FaDatabase } from "react-icons/fa";

//import styles
import { titleHeadingColor, titleRowColor } from '../../components/customStyle/TableColor'

//import api
import api from "../../api/metabaseApi";

//for data tab
function DataTab() {
    //save array value
    const [db, setDb] = useState([])
    const [schema, setSechema] = useState([])
    const [table, setTable] = useState([])
    const [field, setField] = useState([])

    //save value
    const [dbID, setDbID] = useState("")
    const [schemaID, setSchemaID] = useState("")
    const [tableID, setTableID] = useState("")

    useEffect(() => {
        api.databaseList()
            .then( res => {
                setDb(res.data)
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        
    }, [])

    //to get database id and display schema
    const onChangeDB = (e) => {
        console.log(e.target.value)
        const dbID = e.target.value
        setDbID(dbID)
        console.log("id: ", dbID)

        api.getSchemaID(dbID)
            .then( res => {
                setSechema(res.data)
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //to get database schema and display table
    const onChangeSchema = (e) => {
        console.log(e.target.value)
        const schemaID = e.target.value
        setSchemaID(schemaID)
        console.log("schema: ", schemaID)

        api.getSchemaTableID(dbID, schemaID)
            .then( res => {
                setTable(res.data)
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //to get database table and display fields
    const onChangeTable = (e) => {
        console.log(e.target.value)
        const tableID = e.target.value
        setTableID(tableID)
        console.log("table: ", tableID)

        api.getTableIDMeta(tableID)
            .then( res => {
                setField(res.data.fields)
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col md={3} style={{marginTop: 50, marginLeft: 60}}>
                        <Row>
                            <Form style={{width: 250}}>
                                <Form.Group>
                                    <FaDatabase style={{marginRight: 10}}/>
                                    <Form.Label>Database</Form.Label>
                                    <Form.Control as="select" custom onChange={onChangeDB}>
                                        <option>Select Database..</option>
                                        {db.map((db) => (
                                            <option value={db.id}>{db.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Row>
                        <Row>
                            {/* <ListComponent id={id}/> */}
                            {/* <ListGroup style={{marginTop: 50, marginLeft: 25, width: 250}}>
                                {schema.map((schema) => (
                                    <ListGroup.Item action href="" style={{height: 40}} onClick>{schema}</ListGroup.Item>
                                ))}
                            </ListGroup> */}
                            <Form style={{width: 250}}>
                                <Form.Group>
                                    <Form.Label>Schema</Form.Label>
                                    <Form.Control as="select" custom onChange={onChangeSchema}>
                                        <option>Select Schema..</option>
                                        {schema.map((schema) => (
                                            <option value={schema}>{schema}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Row>
                        <Row>
                            {/* <ListComponent id={id}/> */}
                            {/* <ListGroup style={{marginTop: 50, marginLeft: 25, width: 250}}>
                                {schema.map((schema) => (
                                    <ListGroup.Item action href="" style={{height: 40}} onClick>{schema}</ListGroup.Item>
                                ))}
                            </ListGroup> */}
                            <Form style={{width: 250}}>
                                <Form.Group>
                                    <Form.Label>Table</Form.Label>
                                    <Form.Control as="select" custom onChange={onChangeTable}>
                                        <option>Select Table..</option>
                                        {table.map((table) => (
                                            <option value={table.id}>{table.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Row>
                    </Col>
                    <Col style={{marginTop: 30}}>
                        {/* add table with 3 columns name, visibility, type */}
                        <Table borderlessS style={{width: 900}}>
                            <thead>
                                <th style={titleHeadingColor}>Column</th>
                                <th style={titleHeadingColor}>Visibility</th>
                                <th style={titleHeadingColor}>Type</th>
                                <th style={titleHeadingColor}></th>
                            </thead>
                            <tbody>
                                {field.map((field, index) => (
                                    <tr>
                                        <td style={{width: 300}}>{field.display_name}</td>
                                        <td style={{width: 300}}>{field.visibility_type}</td>
                                        <td style={{width: 300}}>{field.special_type}</td>
                                        <td>
                                            <Link to={`/dataModel/${field.table_id}/${index}`}>
                                                <Button variant="outline-info" style={{ float: 'right'}}>
                                                    <FiSettings/>
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default DataTab