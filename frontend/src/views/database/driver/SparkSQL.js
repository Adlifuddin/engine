import React, {useState, useEffect} from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form } from 'react-bootstrap'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'
import SchedulingTab from './components/SchedulingTab'
import api from '../../../api/metabaseApi'
import Scheduling from './components/Scheduling'

function SparkSQL(props) {
    const [key, changeKey] = useState("0")
const { inputting,
        engine,
        status,
        autoRunQueries, 
        userControlScheduling,
        name,
        host,
    port,
        parseScheduling,
        dbname,
        username,
        password,
        jdbc,
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
        setPage,
        errorInput,} = props
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
                    "dbname": dbname,
                    "host": host,
                    "jdbc-flags": jdbc,
                    "let-user-control-scheduling": userControlScheduling,
                    "password": password,
                    "port": port,
                    "user": username,
                },
                'engine': engine,
                'is_full_sync': true,
                'is_on_demand': false,
                'name': name,
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
            const datas = parseScheduling(data)
 
            if (key === '1') {
                datas["is_full_sync"] = false
                datas["is_on_demand"] = true
            } else if (key === '2') {
                datas["is_full_sync"] = false
                datas["is_on_demand"] = false
            }

            api.createDatabase(datas)
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
                                    <FormComponent engine={engine} inputting={inputting} name={name}/>
                                    <Form.Group controlId="formBasicHost">
                                        <Form.Label>Host</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="localhost"
                                            value={host}
                                            onChange={inputting("host")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPort">
                                        <Form.Label>Port</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="10000"
                                            value={port}
                                            onChange={inputting("port")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicDatabaseName">
                                        <Form.Label>Database Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="birds_of_the_world"
                                            value={dbname}
                                            onChange={inputting("dbname")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="username"
                                            placeholder="What username do you use to login to the database?"
                                            value={username}
                                            onChange={inputting("username")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                            value={password}
                                            onChange={inputting("password")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Additional JDBC connection string options</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=";transportMode=http"
                                            value={jdbc}
                                            onChange={inputting("jdbc")}
                                        />
                                    </Form.Group>
                                    <FormFooter switches={switches} autoRunQueries={autoRunQueries} userControlScheduling={userControlScheduling}/>
                                </SchedulingTab>
                                :
                                <>
                                    <FormComponent engine={engine} inputting={inputting} name={name}/>
                                    <Form.Group controlId="formBasicHost">
                                        <Form.Label>Host</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="localhost"
                                            value={host}
                                            onChange={inputting("host")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPort">
                                        <Form.Label>Port</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="10000"
                                            value={port}
                                            onChange={inputting("port")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicDatabaseName">
                                        <Form.Label>Database Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="birds_of_the_world"
                                            value={dbname}
                                            onChange={inputting("dbname")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="username"
                                            placeholder="What username do you use to login to the database?"
                                            value={username}
                                            onChange={inputting("username")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                            value={password}
                                            onChange={inputting("password")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Additional JDBC connection string options</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=";transportMode=http"
                                            value={jdbc}
                                            onChange={inputting("jdbc")}
                                        />
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

export default SparkSQL
