import React, {useState, useEffect} from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form } from 'react-bootstrap'
import SSHTunnel from './components/SSHTunnel'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'
import SchedulingTab from './components/SchedulingTab'
import api from '../../../api/metabaseApi'
import Scheduling from './components/Scheduling'

function MongoDB(props) {
    const [statuses, setStatuses] = useState("fill")
    const [sslCertificate, setSslCertificate] = useState(false)

    const {
        page, 
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
        time,} = props
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
    
    const click = input => e => {
        setStatuses(input)
    }

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
    if (statuses === "paste") {
        stats = (
            <>
                <a href="#" onClick={click("fill")}>Fill out individual fields</a>
                <Form.Group controlId="formBasicConnectionString">
                    <Form.Label>Paste your connection string</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]"
                        value={db}
                        onChange={inputting("db")}
                    />
                </Form.Group>
            </>
        )
    } else if(statuses === "fill") {
        stats = (
            <>
                <a href="#" onClick={click("paste")}>Paste a connection String</a>
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
                                    <FormFooter switches={switches} autoRunQueries={autoRunQueries} userControlScheduling={userControlScheduling}/>
                                </SchedulingTab>
                                :
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

export default MongoDB
