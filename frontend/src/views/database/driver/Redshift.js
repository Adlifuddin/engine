import React, { useState, useEffect }  from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form } from 'react-bootstrap'
import SSHTunnel from './components/SSHTunnel'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'
import SchedulingTab from './components/SchedulingTab'
import api from '../../../api/metabaseApi'
import Scheduling from './components/Scheduling'

function RedShift(props) {
    const [key, changeKey] = useState("0")
const { inputting,
        status,
        page,
        setPage,
        errorInput,
        engine,
        sshTunnel,
        autoRunQueries, 
        userControlScheduling,
        name,
        host,
        port,
        dbname,
        username,
        password,
        switches,
        tunnelHost,
        tunnelPort,
        tunnelUser,
        sshAuth,
        tunnelPrivateKey,
        tunnelPassword,
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
        parseScheduling,
        parseTunneling} = props
    
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
                "db": dbname,
                "host": host,
                "let-user-control-scheduling": userControlScheduling,
                "password": password,
                "port": port,
                "tunnel-enabled": sshTunnel,
                "user": username,
            },
            "engine": engine,
            "is_full_sync": true,
            "is_on_demand": false,
            "name": name,
        }
        const file = parseTunneling(data)
        if (file.details["let-user-control-scheduling"]) {
            const validate = { "details": file }
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
            api.createDatabase(file)
                .then(response => {
                    window.location.href = '/database'
                    console.log(response)
                }) 
                .catch(error => {
                    console.log(error)
                })
        }

        if (page) {
            const datas = parseScheduling(file)
 
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
                                            placeholder="my-cluster-name.abcd1234.us-east-1.redshift.amazonaws.com"
                                            value={host}
                                            onChange={inputting("host")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPort">
                                        <Form.Label>Port</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="5439"
                                            value={port}
                                            onChange={inputting("port")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicDatabaseName">
                                        <Form.Label>Database Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="toucan_sightings"
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
                                    <Form.Group controlId="formSSH-Tunnel">
                                        <Row>
                                            <Col md="11">
                                                <Form.Label>Use an SSH-tunnel for database connections</Form.Label>
                                                <Form.Text className="text-muted">
                                                    Some database installations can only be accessed by connecting through an SSH 
                                                    bastion host. This option also provides an extra layer of security when a VPN is 
                                                    not available. Enabling this is usually slower than a direct connection.
                                                </Form.Text>
                                            </Col>
                                            <Col md="1">
                                                <Form.Check 
                                                    type="switch"
                                                    id="ssh-tunnel"
                                                    checked={sshTunnel}
                                                    onChange={switches("ssh-tunnel")}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <SSHTunnel
                                        inputting={inputting}
                                        tunnelHost={tunnelHost}
                                        tunnelPort={tunnelPort}
                                        tunnelUser={tunnelUser}
                                        sshAuth={sshAuth}
                                        tunnelPrivateKey={tunnelPrivateKey}
                                        tunnelPassword={tunnelPassword}
                                        sshTunnel={sshTunnel}
                                    />
                                    <FormFooter switches={switches} autoRunQueries={autoRunQueries} userControlScheduling={userControlScheduling}/>
                                </SchedulingTab>
                                :
                                <>
                                    <FormComponent engine={engine} inputting={inputting} name={name}/>
                                    <Form.Group controlId="formBasicHost">
                                        <Form.Label>Host</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="my-cluster-name.abcd1234.us-east-1.redshift.amazonaws.com"
                                            value={host}
                                            onChange={inputting("host")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPort">
                                        <Form.Label>Port</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="5439"
                                            value={port}
                                            onChange={inputting("port")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicDatabaseName">
                                        <Form.Label>Database Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="toucan_sightings"
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
                                    <Form.Group controlId="formSSH-Tunnel">
                                        <Row>
                                            <Col md="11">
                                                <Form.Label>Use an SSH-tunnel for database connections</Form.Label>
                                                <Form.Text className="text-muted">
                                                    Some database installations can only be accessed by connecting through an SSH 
                                                    bastion host. This option also provides an extra layer of security when a VPN is 
                                                    not available. Enabling this is usually slower than a direct connection.
                                                </Form.Text>
                                            </Col>
                                            <Col md="1">
                                                <Form.Check 
                                                    type="switch"
                                                    id="ssh-tunnel"
                                                    checked={sshTunnel}
                                                    onChange={switches("ssh-tunnel")}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <SSHTunnel
                                        inputting={inputting}
                                        tunnelHost={tunnelHost}
                                        tunnelPort={tunnelPort}
                                        tunnelUser={tunnelUser}
                                        sshAuth={sshAuth}
                                        tunnelPrivateKey={tunnelPrivateKey}
                                        tunnelPassword={tunnelPassword}
                                        sshTunnel={sshTunnel}
                                    />
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

export default RedShift
