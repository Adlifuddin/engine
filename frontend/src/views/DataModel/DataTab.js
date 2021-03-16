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

        setSchemaID("0")
        setTableID("0")
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

        setTableID("0")
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

    const getFieldVisibility = (e) => {

        if(e === 'details-only'){
            return "Only in detail views"
        }
        else if(e === 'normal'){
            return "Everywhere"
        }
        else if(e === 'sensitive'){
            return "Do not include"
        }
        else {
            return ""
        }
    }

    const getFieldType = (e) => {

        if( e == null){
            return "No special type"
        }
        else{
            const type = e.split("/")

            if(type[1] === 'PK'){
                return "Entity Key"
            }
            else if(type[1] === 'Name'){
                return "Entity Name"
            }
            else if(type[1] === 'FK'){
                return "Foreign Key"
            }
            else if(type[1] === 'Name'){
                return "Entity Name"
            }
            else if(type[1] === 'ZipCode'){
                return "Zip Code"
            }
            else if(type[1] === 'GrossMargin'){
                return "Gross Margin"
            }
            else if(type[1] === 'Birthdate'){
                return "Birthday"
            }
            else if(type[1] === 'CancelationDate'){
                return "Cancelation date"
            }
            else if(type[1] === 'CancelationTime'){
                return "Cancelation time"
            }
            else if(type[1] === 'CancelationTimestamp'){
                return "Cancelation timestamp"
            }
            else if(type[1] === 'CreationDate'){
                return "Creation date"
            }
            else if(type[1] === 'CreationTime'){
                return "Creation time"
            }
            else if(type[1] === 'CreationTimestamp'){
                return "Creation timestamp"
            }
            else if(type[1] === 'DeletionDate'){
                return "Deletion date"
            }
            else if(type[1] === 'DeletionTime'){
                return "Deletion time"
            }
            else if(type[1] === 'DeletionTimestamp'){
                return "Deletion timestamp"
            }
            else if(type[1] === 'UpdatedDate'){
                return "Updated date"
            }
            else if(type[1] === 'UpdatedTime'){
                return "Updated time"
            }
            else if(type[1] === 'UpdatedTimestamp'){
                return "Updated timestamp"
            }
            else if(type[1] === 'ISO8601DateTimeString'){
                return "Text as a ISO-8601 timestamp"
            }
            else if(type[1] === 'ISO8601TimeString'){
                return "Text as a ISO-8601 time"
            }
            else if(type[1] === 'ISO8601DateString'){
                return "Text as a ISO-8601 date"
            }
            else if(type[1] === 'JoinDate'){
                return "Join date"
            }
            else if(type[1] === 'JoinTime'){
                return "Join time"
            }
            else if(type[1] === 'JoinTimestamp'){
                return "Join timestamp"
            }
            else if(type[1] === 'UNIXTimestampMilliseconds'){
                return "UNIX Timestamp (Milliseconds)"
            }
            else if(type[1] === 'UNIXTimestampMicroseconds'){
                return "UNIX Timestamp (Microseconds)"
            }
            else if(type[1] === 'UNIXTimestampSeconds'){
                return "UNIX Timestamp (Seconds)"
            }
            else if(type[1] === 'AvatarURL'){
                return "Avatar Image URL"
            }
            else if(type[1] === 'ImageURL'){
                return "Image URL"
            }
            else if(type[1] === 'SerializedJSON'){
                return "Field containing JSON"
            }
            else if(type[1] === null){
                return "No special type"
            }
            else{
                return type[1]
            }
        }

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
                                        <option value="0">Select Database..</option>
                                        {db.map((db) => (
                                            <option value={db.id}>{db.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Row>
                        <Row>
                            <Form style={{width: 250}}>
                                <Form.Group>
                                    <Form.Label>Schema</Form.Label>
                                    <Form.Control as="select" custom onChange={onChangeSchema} value={schemaID}>
                                        <option value="0">Select Schema..</option>
                                        {schema.map((schema) => (
                                            <option value={schema}>{schema}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Row>
                        <Row>
                            <Form style={{width: 250}}>
                                <Form.Group>
                                    <Form.Label>Table</Form.Label>
                                    <Form.Control as="select" custom onChange={onChangeTable} value={tableID}>
                                        <option value="0">Select Table..</option>
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
                        <Table borderless style={{width: 900}}>
                            <thead>
                                <th style={titleHeadingColor}>Column</th>
                                <th style={titleHeadingColor}>Visibility</th>
                                <th style={titleHeadingColor}>Type</th>
                                <th style={titleHeadingColor}></th>
                            </thead>
                            <tbody>
                                {field.map((field, index) => (
                                    <tr>
                                        <td style={{...titleRowColor, width: 300}}>{field.display_name}</td>
                                        <td style={{...titleRowColor, width: 300}}>{getFieldVisibility(field.visibility_type)}</td>
                                        <td style={{...titleRowColor, width: 300}}>{getFieldType(field.special_type)}</td>
                                        <td>
                                            <Link to={`/data-model/${field.table_id}/${index}`}>
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