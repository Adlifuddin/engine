import React from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form } from 'react-bootstrap'
import SSHTunnel from './components/SSHTunnel'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'

function RedShift(props) {
const { inputting,
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
        c } = props

    return (
            <Card style={{margin: '20px'}}>
                <Breadcrumbs b={b} />
            <Form>
                <CardBody>
                    <Row>
                        <Col md="8">
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
