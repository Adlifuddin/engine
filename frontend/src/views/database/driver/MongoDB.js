import React, {useState, useEffect} from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form } from 'react-bootstrap'
import SSHTunnel from './components/SSHTunnel'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'
import SchedulingTab from './components/SchedulingTab'
import Create from '../components/DatabaseFunction'
import Scheduling from './components/Scheduling'

function Childrens(props) {
    const {engine, inputting, name, stats, sshTunnel, switches, tunnelHost, tunnelPort, tunnelPassword, tunnelPrivateKey, sshAuth,tunnelUser, autoRunQueries, userControlScheduling, refingerprint} = props
    return (
        <>
            <FormComponent engine={engine} inputting={inputting} name={name}/>
            {stats}
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

function MongoDB(props) {
    const [statuses, setStatuses] = useState(false)
    const [sslCertificate, setSslCertificate] = useState(false)

    
    const {
        page,
        parseTunneling,
        parseScheduling,
        setPage,
        errorInput,
        status,
        inputting,
        engine,
        authDatabase,
        sshTunnel,
        autoRunQueries, 
        userControlScheduling,
        name,
        db,
        host,
        port,
        dbname,
        username,
        password,
        dnsSRV,
        switches,
        sslSwitch,
        sslCert,
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
        updateLoading, } = props
    const [connection, setConnection] = useState(false)
   

    useEffect(() => {
        if (userControlScheduling) {
            setConnection(true)
        } else {
            setConnection(false)
        }
    }, [userControlScheduling])

    useEffect(() => {
        if (sslSwitch) {
           setSslCertificate(true)
        } else {
           setSslCertificate(false)
        }
        
    }, [sslSwitch])

    const submit = (e) => {
        e.preventDefault()
        let data = {
            "auto_run_queries": autoRunQueries,
            "details": {
                "use-connection-uri": statuses,
                "let-user-control-scheduling": userControlScheduling,
                "tunnel-enabled": sshTunnel,
            },
            "engine": engine,
            "is_full_sync": true,
            "is_on_demand": false,
            "name": name,
            "refingerprint": refingerprint
        }
        if (!statuses) {
            data.details["use-srv"] = dnsSRV
            data.details["user"] = username
            data.details["additional-options"] = db
            data.details["authdb"] = authDatabase
            data.details["dbname"] = dbname
            data.details["host"] = host
            data.details["pass"] = password     
            data.details["port"] = port
            data.details["ssl"] = sslSwitch
            if (sslSwitch) {
                data.details["ssl-cert"] = sslCert
            }
        } else {
            data.details["conn-uri"] = db
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


    let certificates 
    if (sslCertificate === true) {
        certificates = (
            <Form.Group controlId="formBasicDatabaseName">
                <Form.Label>Server SSL certificate chain</Form.Label>
                <Form.Control
                    type="longText"
                    placeholder="Paste the contents of the server's SSL certificate chain here"
                    value={sslCert}
                    onChange={inputting("sslCert")}
                />
            </Form.Group>
        )
    }

    let stats
    if (statuses) {
        stats = (
            <>
                <a href="#" onClick={() => setStatuses(!statuses)}>Fill out individual fields</a>
                <Form.Group controlId="formBasicConnectionString">
                    <Form.Label>Paste your connection string</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]"
                        value={db}
                        onChange={inputting("db")}
                    />
                </Form.Group>
            </>
        )
    } else {
        stats = (
            <>
                <a href="#" onClick={() => setStatuses(!statuses)}>Paste a connection String</a>
                <Form.Group controlId="formBasicHost">
                    <Form.Label>Host</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="localhost"
                        value={host}
                        onChange={inputting("host")}
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
                <Form.Group controlId="formBasicPort">
                    <Form.Label>Port</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="5432"
                        value={port}
                        onChange={inputting("port")}
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
                <Form.Group controlId="formBasicAuthDatabase">
                    <Form.Label>Authentication Database</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Optional Database to use when authenticating"
                        value={authDatabase}
                        onChange={inputting("authDatabase")}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicConnectionString">
                    <Form.Label>Additional Mongo connection string options</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="retryWrites=true&w=majority&authSource=admin&readPreference=nearest&replicaSet=test"
                        value={db}
                        onChange={inputting("db")}
                    />
                </Form.Group>
                <Form.Group controlId="formDBS-SRV">
                    <Row>
                        <Col md="11">
                            <Form.Label>Use DNS SRV when connecting</Form.Label>
                            <Form.Text className="text-muted">
                                Using this option requires that provided host is a FQDN. 
                                If connecting to an Atlas cluster, you might need to enable this option. 
                                If you don't know what this means, leave this disabled.
                            </Form.Text>
                        </Col>
                        <Col md="1">
                            <Form.Check 
                                type="switch"
                                id="dns-srv"
                                checked={dnsSRV}
                                onChange={switches("dnsSRV")}
                            />
                        </Col>
                    </Row>
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
                {certificates}
            </>
        )
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
                                        stats={stats}
                                        sshTunnel={sshTunnel}
                                        switches={switches}
                                        tunnelHost={tunnelHost}
                                        tunnelPort={tunnelPort}
                                        tunnelPassword={tunnelPassword}
                                        tunnelPrivateKey={tunnelPrivateKey}
                                        sshAuth={sshAuth}
                                        tunnelUser={tunnelUser}
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
                                    stats={stats}
                                    sshTunnel={sshTunnel}
                                    switches={switches}
                                    tunnelHost={tunnelHost}
                                    tunnelPort={tunnelPort}
                                    tunnelPassword={tunnelPassword}
                                    tunnelPrivateKey={tunnelPrivateKey}
                                    sshAuth={sshAuth}
                                    tunnelUser={tunnelUser}
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

export default MongoDB
