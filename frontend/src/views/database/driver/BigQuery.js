import React, { useState, useEffect } from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form } from 'react-bootstrap'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'
import SchedulingTab from './components/SchedulingTab'
import api from '../../../api/metabaseApi'
import Scheduling from './components/Scheduling'

function BigQuery(props) {
    const { inputting,
        errorInput,
        page,
        setPage,
        status,
        engine,
        jvmTimezone,
        autoRunQueries, 
        userControlScheduling,
        name,
        datasetId,
        switches,
        json,
        d,
        b,
        c,
        filterChange,
        filterTime,
        filterDate,
        filterTimeChanges,
        filterDayChanges,
        filterChanges,
        changes,
        day,
        onChanges,
        onDayChange,
        onTimeChange,
        changingOnThe,
        changeOnTheChange,
        onThe,
        onTheChange,
        oriChange,
        changeOriChange,
        time, } = props
    
    const [connection, setConnection] = useState(false)
   

    useEffect(() => {
        if (userControlScheduling) {
            setConnection(true)
        } else {
            setConnection(false)
        }
    }, [userControlScheduling])

        const submit = (e) => {
        e.preventDefault()

        let data = {
                // "auto_run_queries": autoRunQueries,
                // "details": {
                //     "let-user-control-scheduling": userControlScheduling,
                //     "db": db,
                // },
                // "engine": engine,
                // "is_full_sync": true,
                // "is_on_demand": false,
                // "name": name
            }
        if (data.details["let-user-control-scheduling"]) {
            const validate = { "details": data }
            api.validateDatabase(validate)
                .then(response => {
                    if (response.data.valid) {
                        setPage(true)
                    } else {
                        setPage(false)
                        errorInput("Couldn't connect to the database. Please check the connection details.")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            api.createDatabase(data)
                .then(response => {
                    window.location.href = '/database'
                    console.log(response)
                }) 
                .catch(error => {
                    console.log(error)
                })
        }

        if (page) {
            api.createDatabase(data)
                .then(response => {
                    window.location.href = '/database'
                    console.log(response)
                }) 
                .catch(error => {
                    console.log(error)
                })
        }
    }

    

    return (
            <Card style={{margin: '20px'}}>
                <Breadcrumbs b={b} />
            <Form onSubmit={submit}>
                <CardBody>
                    <Row>
                        <Col md="8">
                            {page?
                                <Scheduling
                                    filterChange={filterChange}
                                    filterTime={filterTime}
                                    filterDate={filterDate}
                                    filterTimeChanges={filterTimeChanges}
                                    filterDayChanges={filterDayChanges}
                                    filterChanges={filterChanges}
                                    changes={changes}
                                    time={time}
                                    day={day}
                                    onChanges={onChanges}
                                    onDayChange={onDayChange}
                                    onTimeChange={onTimeChange}
                                    changingOnThe={changingOnThe}
                                    changeOnTheChange={changeOnTheChange}
                                    onThe={onThe}
                                    onTheChange={onTheChange}
                                    oriChange={oriChange}
                                    changeOriChange={changeOriChange}
                                />
                                :
                                connection && status !== 'add' ?
                                <SchedulingTab
                                    filterChange={filterChange}
                                    filterTime={filterTime}
                                    filterDate={filterDate}
                                    filterTimeChanges={filterTimeChanges}
                                    filterDayChanges={filterDayChanges}
                                    filterChanges={filterChanges}
                                    changes={changes}
                                    time={time}
                                    day={day}
                                    onChanges={onChanges}
                                    onDayChange={onDayChange}
                                    onTimeChange={onTimeChange}
                                    changingOnThe={changingOnThe}
                                    changeOnTheChange={changeOnTheChange}
                                    onThe={onThe}
                                    onTheChange={onTheChange}
                                    oriChange={oriChange}
                                    changeOriChange={changeOriChange}
                                    connection={connection}
                                >
                                    <FormComponent engine={engine} inputting={inputting} name={name}/>
                                    <Form.Group controlId="formBasicDataset">
                                        <Form.Label>Dataset ID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="toucanSightings"
                                            value={datasetId}
                                            onChange={inputting("datasetId")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicJSON">
                                        <Form.Label>Service account JSON file</Form.Label>
                                        <Form.Control
                                            type="file"
                                            placeholder="5439"
                                            value={json}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="jvm-timezone">
                                        <Row>
                                            <Col md="11">
                                                <Form.Label>Use the Java Virtual Machine (JVM) timezone</Form.Label>
                                                <Form.Text className="text-muted">
                                                    We suggest you leave this off unless you're doing manual timezone 
                                                    casting in many or most of your queries with this data.
                                                </Form.Text>
                                            </Col>
                                            <Col md="1">
                                                <Form.Check 
                                                    type="switch"
                                                    id="jvm-timezone"
                                                    checked={jvmTimezone}
                                                    onChange={switches("jvm-timezone")}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <FormFooter switches={switches} autoRunQueries={autoRunQueries} userControlScheduling={userControlScheduling}/>
                                </SchedulingTab>
                                :
                                <>
                                    <FormComponent engine={engine} inputting={inputting} name={name}/>
                                    <Form.Group controlId="formBasicDataset">
                                        <Form.Label>Dataset ID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="toucanSightings"
                                            value={datasetId}
                                            onChange={inputting("datasetId")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicJSON">
                                        <Form.Label>Service account JSON file</Form.Label>
                                        <Form.Control
                                            type="file"
                                            placeholder="5439"
                                            value={json}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="jvm-timezone">
                                        <Row>
                                            <Col md="11">
                                                <Form.Label>Use the Java Virtual Machine (JVM) timezone</Form.Label>
                                                <Form.Text className="text-muted">
                                                    We suggest you leave this off unless you're doing manual timezone 
                                                    casting in many or most of your queries with this data.
                                                </Form.Text>
                                            </Col>
                                            <Col md="1">
                                                <Form.Check 
                                                    type="switch"
                                                    id="jvm-timezone"
                                                    checked={jvmTimezone}
                                                    onChange={switches("jvm-timezone")}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <FormFooter switches={switches} autoRunQueries={autoRunQueries} userControlScheduling={userControlScheduling}/>
                                </>
                            }
                            {c}
                        </Col>
                        {d}
                    </Row>
                    </CardBody>
                </Form>
            </Card>
    )
}

export default BigQuery
