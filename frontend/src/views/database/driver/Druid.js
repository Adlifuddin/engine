import React, {useEffect, useState}  from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form, Button } from 'react-bootstrap'
import SSHTunnel from './components/SSHTunnel'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'

function Druid(props) {
    const { inputting,
        engine,
        sshTunnel,
        autoRunQueries, 
        userControlScheduling,
        name,
        host,
        port,
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
                                    placeholder="localhost"
                                    value={host}
                                    onChange={inputting("host")}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPort">
                                <Form.Label>Broker node port</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="8082"
                                    value={port}
                                    onChange={inputting("port")}
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

export default Druid
