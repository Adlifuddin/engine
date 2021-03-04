import React, { useState, useEffect, Children } from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form } from 'react-bootstrap'
import SSHTunnel from './components/SSHTunnel'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'
import SchedulingTab from './components/SchedulingTab'
import api from '../../../api/metabaseApi'
import Scheduling from './components/Scheduling'

function Childrens(props) {
    const {engine, inputting, name, account, username, password, warehouse, dbname, region, schema, role, jdbc, sshTunnel, switches, tunnelHost, tunnelPassword, tunnelPort, tunnelPrivateKey, tunnelUser, sshAuth, refingerprint, userControlScheduling, autoRunQueries} = props
    return (
        <>
            <FormComponent engine={engine} inputting={inputting} name={name}/>
            <Form.Group controlId="formBasicAccount">
                <Form.Label>Account</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Your snowflake account name"
                    value={account}
                    onChange={inputting("account")}
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
            <Form.Group controlId="formBasicWarehouse">
                <Form.Label>Warehouse</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="my_warehouse"
                    value={warehouse}
                    onChange={inputting("warehouse")}
                />
            </Form.Group>
            <Form.Group controlId="formBasicDatabaseName">
                <Form.Label>Database Name (case sensitive)</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="birds_of_the_world"
                    value={dbname}
                    onChange={inputting("dbname")}
                />
            </Form.Group>
            <Form.Group controlId="formBasicRegion">
                <Form.Label>Region ID</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="my_region"
                    value={region}
                    onChange={inputting("region")}
                />
            </Form.Group>
            <Form.Group controlId="formBasicSchema">
                <Form.Label>Schema</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="my_schema"
                    value={schema}
                    onChange={inputting("schema")}
                />
            </Form.Group>
            <Form.Group controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="my_schema"
                    value={role}
                    onChange={inputting("role")}
                />
            </Form.Group>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Additional JDBC connection string options</Form.Label>
                <Form.Control
                    type="text"
                    placeholder=""
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

function Snowflake(props) {
const { status,
        page,
        setPage,
        errorInput,
        inputting,
        engine,
        sshTunnel,
        autoRunQueries, 
        userControlScheduling,
        name,
        password,
        account,
        region,
        dbname,
        schema,
        username,
        warehouse,
        jdbc,
        switches,
        tunnelHost,
        tunnelPort,
        tunnelUser,
        sshAuth,
        tunnelPrivateKey,
        tunnelPassword,
        role,
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
        parseTunneling,
        activeKey,
        changeKey,
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

    const createDatabases = (data) => {
        api.createDatabase(data)
            .then(response => {
                const id = response.data.id
                api.getPermissionGraph()
                    .then(response => {
                        var datas = response.data
                        var groups = response.data.groups

                        var payload = {
                            ...datas,
                            groups: {
                                ...groups,
                                "1": {
                                    [id]: {native: "none", schemas: "none"}
                                },
                                "5": {
                                    [id]: { native: "write", schemas: "all" }
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


    const submit = (e) => {
        e.preventDefault()
        let data = {
            "auto_run_queries": true,
            "details": {
                "account": account,
                "additional-options": jdbc,
                "db": dbname,
                "let-user-control-scheduling": userControlScheduling,
                "password": password,
                "regionid": region,
                "role": role,
                "schema": schema,
                "tunnel-enabled": sshTunnel,
                "user": username,
                "warehouse": warehouse,
            },
            'engine': engine,
            'is_full_sync': true,
            'is_on_demand': false,
            'name': name,
            "refingerprint": refingerprint
        }
        const file = parseTunneling(data)
        const updateSubmits = document.querySelector('#update-save')
        if (updateSubmits !== null) {
            updateLoading("update")
            const updates = updateSubmits.id
            if (updates === 'update-save') {
                const datas = parseScheduling(file)
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
                createDatabases(file)
            }

            if (page) {
                const datas = parseScheduling(file)
                createDatabases(datas)
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
                                        account={account}
                                        username={username}
                                        password={password}
                                        warehouse={warehouse}
                                        dbname={dbname}
                                        region={region}
                                        schema={schema}
                                        role={role}
                                        jdbc={jdbc}
                                        sshTunnel={sshTunnel}
                                        switches={switches}
                                        tunnelHost={tunnelHost}
                                        tunnelPassword={tunnelPassword}
                                        tunnelPort={tunnelPort}
                                        tunnelPrivateKey={tunnelPrivateKey}
                                        tunnelUser={tunnelUser}
                                        sshAuth={sshAuth}
                                        refingerprint={refingerprint}
                                        userControlScheduling={userControlScheduling}
                                        autoRunQueries={autoRunQueries}
                                    />
                                </SchedulingTab>
                                :
                                <Childrens
                                    engine={engine}
                                    inputting={inputting}
                                    name={name}
                                    account={account}
                                    username={username}
                                    password={password}
                                    warehouse={warehouse}
                                    dbname={dbname}
                                    region={region}
                                    schema={schema}
                                    role={role}
                                    jdbc={jdbc}
                                    sshTunnel={sshTunnel}
                                    switches={switches}
                                    tunnelHost={tunnelHost}
                                    tunnelPassword={tunnelPassword}
                                    tunnelPort={tunnelPort}
                                    tunnelPrivateKey={tunnelPrivateKey}
                                    tunnelUser={tunnelUser}
                                    sshAuth={sshAuth}
                                    refingerprint={refingerprint}
                                    userControlScheduling={userControlScheduling}
                                    autoRunQueries={autoRunQueries}
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

export default Snowflake
