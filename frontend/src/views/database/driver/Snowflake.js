import React, { useState, useEffect } from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form } from 'react-bootstrap'
import SSHTunnel from './components/SSHTunnel'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'
import SchedulingTab from './components/SchedulingTab'
import api from '../../../api/metabaseApi'
import Scheduling from './components/Scheduling'

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
                                        <Form.Label>Database Name</Form.Label>
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
                                    <FormFooter switches={switches} autoRunQueries={autoRunQueries} userControlScheduling={userControlScheduling}/>
                                </SchedulingTab>
                                :
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
                                        <Form.Label>Database Name</Form.Label>
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

export default Snowflake
