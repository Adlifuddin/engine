import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import {TiTick} from 'react-icons/ti'
import { IoArrowBackSharp } from "react-icons/io5";
import Breadcrumbs from "./Breadcrumbs"

//import api
import api from "../../api/metabaseApi"

function TableSettings(props) {

    const path = props.location.pathname
    const pathname = path.split("/")
    const status = pathname[2]

    const [table, setTable] = useState([])

    const [tableName, setTableName] = useState("")
    const [dbName, setDbName] = useState("")

    const [reScan, setReScan] = useState("nothing")
    const [discardValues, SetDiscardValues] = useState("nothing")

    //to get database and table name
    useEffect(() => {
        api.getTableID(status)
            .then( res => {
                console.log('data2: ', res)
                
                setTable(res)
                setTableName(res.data.name)
                setDbName(res.data.db.name)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // rescan values
    const tableReScan = () => {
        api.tableReScan(table, status)
            .then(response => {
                const data = response.data
                console.log('status: ', data)
                console.log(response)
                setReScan("start")
                window.setTimeout(() => {
                    setReScan("finish")
                }, 1000)
                window.setTimeout(() => {
                    setReScan("nothing")
                }, 2000)
            })
            .catch(error => {
                console.log(error)
                setReScan("nothing")
            })
    }

    let scan
    if (reScan === 'nothing') {
        scan = (
            <Button variant="light" onClick={tableReScan} style={{width: 130, height: 40}}>Re-scan this table</Button>
        )
    }
    else if (reScan === 'start') {
        scan = (
            <Button variant="light" style={{width: 130, height: 40}}>Starting...</Button>
        )
    } 
    else if (reScan === 'finish') {
        scan = (
            <Button variant="success" style={{width: 130, height: 40}}><TiTick/>Scan triggered!</Button>
        )
    }

    // discard values
    const tableDiscard = () => {
        api.tableDiscard(table, status)
            .then(response => {
                const data = response.data
                console.log('status: ', data)
                console.log(response)
                SetDiscardValues("start")
                window.setTimeout(() => {
                    SetDiscardValues("finish")
                }, 1000)
                window.setTimeout(() => {
                    SetDiscardValues("nothing")
                }, 2000)
            })
            .catch(error => {
                console.log(error)
                SetDiscardValues("nothing")
            })
    }

    let discard
    if (discardValues === 'nothing') {
        discard = (
            <Button variant="danger" onClick={tableDiscard} style={{width: 180, height: 40}}>Discard cached field values</Button>
        )
    }
    else if (discardValues === 'start') {
        discard = (
            <Button variant="danger" style={{width: 180, height: 40}}>Starting...</Button>
        )
    }
    else if (discardValues === 'finish') {
        discard = (
            <Button variant="success" style={{width: 180, height: 40}}><TiTick/>Discard triggered!</Button>
        )
    }

    return (
        <>
            <Container fluid>
                <Row style={{marginTop: 50, marginLeft: 45}}>
                    <a href="/data-model">
                        <Button variant="light" style={{marginBottom: 30, height: 50, width: 50, borderRadius:"100%"}}>
                            <IoArrowBackSharp/>
                        </Button>
                    </a>
                </Row>
                <Row style={{marginLeft: 30}}>
                    <Breadcrumbs
                        tableName={tableName}
                        fieldName={"Settings"}
                    />
                </Row>
                <Row style={{marginLeft: 45}}>
                    {/* cached field values */}
                    <Col>
                        <Row>
                            <Form.Label>Cached field values</Form.Label>
                        </Row>
                        <Row>
                            <Form.Text className="text-muted">
                                Nexent can scan the values in this table to enable checkbox filters in dashboards and questions.
                            </Form.Text>
                        </Row>
                        <Row style={{marginTop: 20}}>
                            <Col md={1.5}>
                                {scan}
                            </Col>
                            <Col md={10}>
                                {discard}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TableSettings