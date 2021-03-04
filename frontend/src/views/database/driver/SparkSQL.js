import React, {useState, useEffect} from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form } from 'react-bootstrap'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'
import SchedulingTab from './components/SchedulingTab'
import Scheduling from './components/Scheduling'
import Create from '../components/DatabaseFunction'

function Childrens(props) {
    const {engine, inputting, name, host, port, dbname, username, password, jdbc, switches, autoRunQueries, userControlScheduling, refingerprint } = props
    return (
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
            <FormFooter switches={switches} autoRunQueries={autoRunQueries} userControlScheduling={userControlScheduling} refingerprint={refingerprint}/>
        </>
    )
}
function SparkSQL(props) {
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
                "refingerprint": refingerprint
        }
        const updateSubmits = document.querySelector('#update-save')
        if (updateSubmits !== null) {
            updateLoading("update")
            const updates = updateSubmits.id
            if (updates === 'update-save') {
                const datas = parseScheduling(data)
                Create.updateDatabases(datas, status, updateLoading)
            }
        } else {
            if (data.details["let-user-control-scheduling"]) {
                const validate = { "details": data }
                Create.validateDatabases(validate, setPage, errorInput)
            } else {
                Create.createDatabases(data)
            }

            if (page) {
                const datas = parseScheduling(data)
                Create.createDatabases(datas)
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
                                        host={host}
                                        port={port}
                                        dbname={dbname}
                                        username={username}
                                        password={password}
                                        jdbc={jdbc}
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
                                    host={host}
                                    port={port}
                                    dbname={dbname}
                                    username={username}
                                    password={password}
                                    jdbc={jdbc}
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

export default SparkSQL
