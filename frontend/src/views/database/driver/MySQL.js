import React, { useState, useEffect }  from 'react'
import {Card, CardBody, Row, Col, CardHeader} from 'reactstrap'
import { Form } from 'react-bootstrap'
import SSHTunnel from './components/SSHTunnel'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'
import SchedulingTab from './components/SchedulingTab'
import Scheduling from './components/Scheduling'
import Create from '../components/DatabaseFunction'
import {CardColor, CardHeaderColor} from '../../../components/customStyle/DatabaseColor'

function Childrens(props) {
    const { engine, inputting, name, host, dbname, username, password, sslSwitch, jdbc, sshTunnel, sshAuth, switches, tunnelHost, tunnelPassword, tunnelPort, tunnelPrivateKey, tunnelUser, port, autoRunQueries, userControlScheduling, refingerprint} = props
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
                    placeholder="3306"
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
                    placeholder="tinyInt1isBit=false"
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
                <FormFooter switches={switches} autoRunQueries={autoRunQueries} userControlScheduling={userControlScheduling} refingerprint={refingerprint}/>
        </>
    )
}

function MySQL(props) {

const { status,
        page,
        setPage,
        parseScheduling,
        parseTunneling,
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
        time,
        changeKey,
        activeKey,
        refingerprint,
        updateLoading} = props
    
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
                    "additional-options": jdbc,
                    "dbname": dbname,
                    "host": host,
                    "let-user-control-scheduling": userControlScheduling,
                    "password": password,
                    "port": port,
                    "ssl": sslSwitch,
                    "user": username,
                    "tunnel-enabled": sshTunnel
                },
                "engine": engine,
                "is_full_sync": true,
                "is_on_demand": false,
                "name": name,
                "refingerprint": refingerprint
        }
        
        const file = parseTunneling(data)
        const updateSubmits = document.querySelector('#update-save')
        if (updateSubmits !== null) {
            updateLoading("update")
            const updates = updateSubmits.id
            if (updates === 'update-save') {
                const datas = parseScheduling(file)
                Create.updateDatabases(datas, status, updateLoading)
            }
        } else {
        
            if (file.details["let-user-control-scheduling"]) {
                const validate = { "details": file }
                Create.validateDatabases(validate, setPage, errorInput)
            } else {
                Create.createDatabases(file)
            }

            if (page) {
                const datas = parseScheduling(file)
                Create.createDatabases(datas)
            }
        }
    }

    return (
        <Card style={CardColor}>
            <CardHeader style={CardHeaderColor}>
                <Breadcrumbs b={b} />
            </CardHeader>
            <Form onSubmit={submit}>
                <CardBody>
                    <Row>
                        <Col md="8">
                            {page ?
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
                                    changeKey={changeKey}
                                    activeKey={activeKey}
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
                                        dbname={dbname}
                                        username={username}
                                        password={password}
                                        sslSwitch={sslSwitch}
                                        jdbc={jdbc}
                                        sshTunnel={sshTunnel}
                                        sshAuth={sshAuth}
                                        switches={switches}
                                        tunnelHost={tunnelHost}
                                        tunnelPassword={tunnelPassword}
                                        tunnelPort={tunnelPort}
                                        tunnelPrivateKey={tunnelPrivateKey}
                                        tunnelUser={tunnelUser}
                                        port={port}
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
                                    dbname={dbname}
                                    username={username}
                                    password={password}
                                    sslSwitch={sslSwitch}
                                    jdbc={jdbc}
                                    sshTunnel={sshTunnel}
                                    sshAuth={sshAuth}
                                    switches={switches}
                                    tunnelHost={tunnelHost}
                                    tunnelPassword={tunnelPassword}
                                    tunnelPort={tunnelPort}
                                    tunnelPrivateKey={tunnelPrivateKey}
                                    tunnelUser={tunnelUser}
                                    port={port}
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

export default MySQL
