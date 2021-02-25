import React, {useState, useEffect} from 'react'
import {Card, CardBody, Row, Col } from 'reactstrap'
import { Form } from 'react-bootstrap'
import SSHTunnel from './components/SSHTunnel'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'
import api from '../../../api/metabaseApi'
import SchedulingTab from './components/SchedulingTab'
import Scheduling from './components/Scheduling'

function Postgres(props) {
    const [key, setKey] = useState('0')
const { status,
        page, 
        setPage,
        errorInput,
        inputting,
        engine,
        sslSwitch,
        sshTunnel,
        autoRunQueries, 
        userControlScheduling,
        name,
        host,
        port,
        dbname,
        username,
        password,
        jdbc,
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
        time,} = props
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
        let data 
        if (sshTunnel === false) {
            data = {
                "auto_run_queries": autoRunQueries,
                "details": {
                    "additional-options": jdbc,
                    "dbname": dbname,
                    "host": host,
                    "let-user-control-scheduling": userControlScheduling,
                    "password": password,
                    "port": port,
                    "ssl": sslSwitch,
                    "user": username
                },
                "engine": engine,
                "is_full_sync": true,
                "is_on_demand": false,
                "is_sample": false,
                "name": name
            }
        } else if (sshAuth === "ssh-key") {
            data = {
                "auto_run_queries": autoRunQueries,
                "details": {
                    "additional-options": jdbc,
                    "dbname": dbname,
                    "host": host,
                    "let-user-control-scheduling": userControlScheduling,
                    "password": password,
                    "port": port,
                    "ssl": sslSwitch,
                    "tunnel-auth-option": sshAuth,
                    "tunnel-enabled": sshTunnel,
                    "tunnel-host": tunnelHost,
                    "tunnel-private-key": tunnelPrivateKey,
                    "tunnel-private-key-passphrase": tunnelPassword,
                    "tunnel-port": tunnelPort,
                    "tunnel-user": tunnelUser,
                    "user": username
                },
                "engine": engine,
                "is_full_sync": true,
                "is_on_demand": false,
                "is_sample": false,
                "name": name
            }
        } else if (sshAuth === "password") {
            data = {
                "auto_run_queries": autoRunQueries,
                "details": {
                    "additional-options": jdbc,
                    "dbname": dbname,
                    "host": host,
                    "let-user-control-scheduling": userControlScheduling,
                    "password": password,
                    "port": port,
                    "ssl": sslSwitch,
                    "tunnel-auth-option": sshAuth,
                    "tunnel-enabled": sshTunnel,
                    "tunnel-host": tunnelHost,
                    "tunnel-pass": tunnelPassword,
                    "tunnel-port": tunnelPort,
                    "tunnel-user": tunnelUser,
                    "user": username
                },
                "engine": engine,
                "is_full_sync": true,
                "is_on_demand": false,
                "is_sample": false,
                "name": name
            }
            
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
                    errorInput("Connection Timeout, Please Try Again")
                })
        }

        if (page) {
            let times
            let digits
            if (changes === 'hourly') {
                times = null
                digits = "*"
            } else {
                times = parseInt(time)
                digits = time
            }

            let days
            let frame
            if (filterChange === 'daily') {
                days = null
                frame = null
            } else if (filterChange === 'weekly') {
                days = oriChange
                frame = null
            } else if (filterChange === 'monthly') {
                if (onTheChange === "Calendar Day") {
                    days = null
                } else {
                    days = onTheChange
                }
                frame = onThe
            }

            let filterTimes

            if (filterDate === 'pm' ) {
                filterTimes = parseInt(filterTime) + 12
                
            } else if (filterDate === 'am') {
                filterTimes = parseInt(filterTime)
            }

            if (day === 'pm') {
                times = parseInt(time) + 12
                digits = parseInt(time) + 12
            } else {
                times = parseInt(time)
                digits = parseInt(time)
            }
            
            data["schedules"] = {
                    "cache_field_values": {
                        "schedule_day": days,
                        "schedule_frame": frame,
                        "schedule_hour": filterTimes,
                        "schedule_type": filterChange,
                    },
                    "metadata_sync": {
                        "schedule_day": null,
                        "schedule_frame": null,
                        "schedule_hour": times,
                        "schedule_type": changes
                    }
            }

            let filterdates
            switch (oriChange) {
                case "sun":
                    filterdates = 1
                    break;
                case "mon":
                    filterdates = 2
                    break;
                case "tue":
                    filterdates = 3
                    break;
                case "wed":
                    filterdates = 4
                    break;
                case "thu":
                    filterdates = 5
                    break;
                case "fri":
                    filterdates = 6
                    break;
                case "sat":
                    filterdates = 7
                    break;
                default:
                    break;
            }

            let onTheDates
            switch (onTheChange) {
                case "sun":
                    onTheDates = 1
                    break;
                case "mon":
                    onTheDates = 2
                    break;
                case "tue":
                    onTheDates = 3
                    break;
                case "wed":
                    onTheDates = 4
                    break;
                case "thu":
                    onTheDates = 5
                    break;
                case "fri":
                    onTheDates = 6
                    break;
                case "sat":
                    onTheDates = 7
                    break;
                case "Calendar Day":
                    onTheDates = null
                default:
                    break;
            }

           


            if (filterChange === 'daily') {
                data["cache_field_values_schedule"] = `0 0 ${filterTimes} * * ? *`
            } else if (filterChange === 'weekly') {
                data["cache_field_values_schedule"] = `0 0 ${filterTimes} ? * ${filterdates} *`
            } else if (filterChange === 'monthly') {
                if (onTheChange === "Calendar Day") {
                    if (onThe === 'first') {
                        data["cache_field_values_schedule"] = `0 0 ${filterTimes} 1 * ? *`
                    } else if (onThe === 'last') {
                        data["cache_field_values_schedule"] = `0 0 ${filterTimes} L * ? *`
                    } 
                }
                if (onThe === 'first' && onTheChange !== "Calendar Day") {
                    data["cache_field_values_schedule"] = `0 0 ${filterTimes} ? * ${onTheDates}#1 *`
                } else if (onThe === 'last' && onTheChange !== "Calendar Day") {
                    data["cache_field_values_schedule"] = `0 0 ${filterTimes} ? * ${onTheDates}L *`
                } else if (onThe === 'mid') {
                    data["cache_field_values_schedule"] = `0 0 ${filterTimes} 15 * ? *`
                } 
            }

            data["metadata_sync_schedule"] = `0 0 ${digits} * * ? *`


            if (key === '1') {
                data["is_full_sync"] = false
                data["is_on_demand"] = true
            } else if (key === '2') {
                data["is_full_sync"] = false
                data["is_on_demand"] = false
            }

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
                                    setKey={setKey}
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
                                        setKey={setKey}
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
                                    <FormComponent engine={engine} inputting={inputting} name={name} />
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
                                            placeholder="5432"
                                            value={port}
                                            onChange={inputting("port")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicDatabaseName">
                                        <Form.Label>Database Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            placeholder="birds_of_the_world"
                                            value={dbname}
                                            onChange={inputting("dbname")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="username"
                                            required
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
                                    <Form.Group controlId="formSSL">
                                        <Row>
                                            <Col md="11">
                                                <Form.Label>Use a secure connection (SSL)?</Form.Label>
                                            </Col>
                                            <Col md="1">
                                                <Form.Check 
                                                    type="switch"
                                                    id="SSL-Switch"
                                                    checked={sslSwitch}        
                                                    onChange={switches("ssl-switch")}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Additional JDBC connection string options</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="prepareThreshold=0"
                                            value={jdbc}
                                            onChange={inputting("jdbc")}
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
                                    <FormComponent engine={engine} inputting={inputting} name={name} />
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
                                            placeholder="5432"
                                            value={port}
                                            onChange={inputting("port")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicDatabaseName">
                                        <Form.Label>Database Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            placeholder="birds_of_the_world"
                                            value={dbname}
                                            onChange={inputting("dbname")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="username"
                                            required
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
                                    <Form.Group controlId="formSSL">
                                        <Row>
                                            <Col md="11">
                                                <Form.Label>Use a secure connection (SSL)?</Form.Label>
                                            </Col>
                                            <Col md="1">
                                                <Form.Check 
                                                    type="switch"
                                                    id="SSL-Switch"
                                                    checked={sslSwitch}        
                                                    onChange={switches("ssl-switch")}
                                                />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicUsername">
                                        <Form.Label>Additional JDBC connection string options</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="prepareThreshold=0"
                                            value={jdbc}
                                            onChange={inputting("jdbc")}
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

export default Postgres
