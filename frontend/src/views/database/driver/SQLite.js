import React, {useState, useEffect} from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form } from 'react-bootstrap'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'
import SchedulingTab from './components/SchedulingTab'
import api from '../../../api/metabaseApi'
import Scheduling from './components/Scheduling'

function Childrens(props) {
    const {engine, inputting, name, db, switches, autoRunQueries, userControlScheduling, refingerprint} = props
    return (
        <>
            <FormComponent engine={engine} inputting={inputting} name={name}/>
            <Form.Group controlId="formBasicHost">
                <Form.Label>Filename</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="/home/camsaul/toucan_sightings.sqlite"
                    value={db}
                    onChange={inputting("db")}
                />
            </Form.Group>
                <FormFooter switches={switches} autoRunQueries={autoRunQueries} userControlScheduling={userControlScheduling} refingerprint={refingerprint}/>
        </>
    )
}

function SQLite(props) {
    const { status,
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
        parseScheduling,
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
        updateLoading,
        changeOriChange,
        time,
        page,
        setPage,
        errorInput,
        changeKey,
        activeKey,
        refingerprint} = props

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
                "name": name,
                "refingerprint": refingerprint
        }
        const updateSubmits = document.querySelector('#update-save')
        if (updateSubmits !== null) {
            updateLoading("update")
            const updates = updateSubmits.id
            if (updates === 'update-save') {
                const datas = parseScheduling(data)
                api.updateDatabase(datas, status)
                    .then(response => {
                        updateLoading('done')
                        window.location.reload()
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        } else {
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
                        const id = response.data.id
                        api.getPermissionGraph()
                            .then(response => {
                                var data = response.data
                                var groups = response.data.groups

                                var payload = {
                                    ...data,
                                    groups: {
                                        ...groups,
                                        "1": {
                                            [id]: { native: "none", schemas: "none" }
                                        }
                                    }
                                }
                                api.putPermissionGraph(payload)
                                    .then(response => {
                                        console.log(response)
                                        window.location.href = '/database'
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }

            if (page) {
                const datas = parseScheduling(data)
                api.createDatabase(datas)
                    .then(response => {
                        const id = response.data.id
                        api.getPermissionGraph()
                            .then(response => {
                                var data = response.data
                                var groups = response.data.groups

                                var payload = {
                                    ...data,
                                    groups: {
                                        ...groups,
                                        "1": {
                                            [id]: { native: "none", schemas: "none" }
                                        }
                                    }
                                }
                                api.putPermissionGraph(payload)
                                    .then(response => {
                                        console.log(response)
                                        window.location.href = '/database'
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
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
                                    activeKey={activeKey}
                                    changeKey={changeKey}
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
                                    activeKey={activeKey}
                                    changeKey={changeKey}
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
                                    <Childrens
                                        engine={engine}
                                        inputting={inputting}
                                        name={name}
                                        db={db}
                                        switches={switches}
                                        autoRunQueries={autoRunQueries}
                                        userControlScheduling={userControlScheduling}
                                        refingerprint={refingerprint}
                                    />
                                </SchedulingTab>
                                :
                                <Childrens
                                    engine={engine}
                                    inputting={inputting}
                                    name={name}
                                    db={db}
                                    switches={switches}
                                    autoRunQueries={autoRunQueries}
                                    userControlScheduling={userControlScheduling}
                                    refingerprint={refingerprint}
                                />
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

export default SQLite
