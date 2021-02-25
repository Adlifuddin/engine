import React, { useState, useEffect } from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form , Tabs, Tab} from 'react-bootstrap'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'
import api from '../../../api/metabaseApi'
import SchedulingTab from './components/SchedulingTab'
import Scheduling from './components/Scheduling'

function H2(props) {
const { status,
        errorInput,
        inputting,
        engine,
        autoRunQueries, 
        userControlScheduling,
        name,
        db,
        switches,
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
        time,
        page,
        setPage} = props
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
                "auto_run_queries": autoRunQueries,
                "details": {
                    "let-user-control-scheduling": userControlScheduling,
                    "db": db,
                },
                "engine": engine,
                "is_full_sync": true,
                "is_on_demand": false,
                "name": name
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
                                        <Form.Group controlId="formBasicHost">
                                            <Form.Label>Connection String</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="file:/Users/camsaul/bird_sightings/toucans"
                                                value={db}
                                                onChange={inputting("db")}
                                            />
                                        </Form.Group>
                                    <FormFooter switches={switches} autoRunQueries={autoRunQueries} userControlScheduling={userControlScheduling} />
                                </SchedulingTab>
                                :
                                <>
                                    <FormComponent engine={engine} inputting={inputting} name={name}/>
                                        <Form.Group controlId="formBasicHost">
                                            <Form.Label>Connection String</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="file:/Users/camsaul/bird_sightings/toucans"
                                                value={db}
                                                onChange={inputting("db")}
                                            />
                                        </Form.Group>
                                    <FormFooter switches={switches} autoRunQueries={autoRunQueries} userControlScheduling={userControlScheduling} />
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

export default H2
