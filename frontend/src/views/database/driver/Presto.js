import React, {useEffect, useState} from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form, Button, Breadcrumb } from 'react-bootstrap'

function Presto(props) {
    const [sshTunnelOn, setSshTunnelOn] = useState(false)
    const { inputting,
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
        switches,
        tunnelHost,
        tunnelPort,
        tunnelUser,
        sshAuth,
        tunnelPrivateKey,
        tunnelPassword,
        d,
        b,
        c} = props

    useEffect(() => {
        if (sshTunnel) {
            setSshTunnelOn(true)
        } else {
            setSshTunnelOn(false)
        }
        
    }, [sshTunnel])

    let ssh
    if (sshTunnelOn) {
        ssh = (
            <>
                <Form.Group controlId="formBasicTunnelHost">
                    <Form.Label>SSH tunnel host</Form.Label>
                    <Form.Control
                        type="text"
                        value={tunnelHost}    
                        placeholder="What hostname do you use to connect to the SSH tunnel?"
                        onChange={inputting("tunnelHost")}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTunnelPort">
                    <Form.Label>SSH tunnel port</Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue="22"
                        value={tunnelPort}    
                        placeholder="What hostname do you use to connect to the SSH tunnel?"
                        onChange={inputting("tunnelPort")}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTunnelHost">
                    <Form.Label>SSH tunnel username</Form.Label>
                    <Form.Control
                        type="text"
                        value={tunnelUser}    
                        placeholder="What username do you use to login to the SSH tunnel?"
                        onChange={inputting("tunnelUser")}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicSSHAuth">
                    <Form.Label>SSH Authentication</Form.Label>
                    <Form.Control as="select" custom value={sshAuth} onChange={inputting("sshAuth")}>
                        <option value="ssh-key">SSH Key</option>
                        <option value="password">Password</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicSSHPrivateKey">
                    <Form.Label>SSH private key</Form.Label>
                    <Form.Control
                        type="text"
                        value={tunnelPrivateKey}    
                        placeholder="What username do you use to login to the SSH tunnel?"
                        onChange={inputting("tunnelPrivateKey")}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicSSHPrivateKey">
                    <Form.Label>Passphrase for the SSH private key</Form.Label>
                    <Form.Control
                        type="password"
                        value={tunnelPassword}    
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        onChange={inputting("tunnelPassword")}
                    />
                </Form.Group>
            </>
        )
    }
    
    return (
         <Card style={{margin: '20px'}}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/database">Database</Breadcrumb.Item>
                <Breadcrumb.Item active style={{ cursor: 'pointer' }}>{b}</Breadcrumb.Item>
                </Breadcrumb>
            <Form>
                <CardBody>
                    <Row>
                        <Col md="8">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Database Type</Form.Label>
                                <Form.Control as="select" custom value={engine} onChange={inputting("engine")}>
                                    <option value="redshift">Amazon Redshift</option>
                                    <option value="bigquery">BigQuery</option>
                                    <option value="druid">Druid</option>
                                    <option value="googleanalytics">Google Analytics</option>
                                    <option value="h2">H2</option>
                                    <option value="mongo">MongoDB</option>
                                    <option value="mysql">MySQL</option>
                                    <option value="postgres">PostgreSQL</option>
                                    <option value="presto">Presto</option>
                                    <option value="snowflake">Snowflake</option>
                                    <option value="sparksql">SparkSQL</option>
                                    <option value="sqlserver">SQL Server</option>
                                    <option value="sqlite">SQLite</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}    
                                    placeholder="How would you like to refer to this database"
                                    onChange={inputting("name")}
                                />
                            </Form.Group>
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
                                    placeholder="8080"
                                    value={port}
                                    onChange={inputting("port")}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicDatabaseName">
                                <Form.Label>Database Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="hive"
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
                            {ssh}
                            <Form.Group controlId="formRunQueries">
                                <Row>
                                    <Col md="11">
                                        <Form.Label>Automatically run queries when doing simple filtering and summarizing</Form.Label>
                                        <Form.Text className="text-muted">
                                            When this is on, Nexent will automatically run queries when users do simple 
                                            explorations with the Summarize and Filter buttons when viewing a table or chart. 
                                            You can turn this off if querying this database is slow. This setting doesn’t affect drill-throughs or SQL queries.
                                        </Form.Text>
                                    </Col>
                                    <Col md="1">
                                        <Form.Check 
                                            type="switch"
                                            id="auto-run-queries"
                                            checked={autoRunQueries}
                                            onChange={switches("auto-run-queries")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group controlId="formLargeDatabase">
                                <Row>
                                    <Col md="11">
                                        <Form.Label>This is a large database, so let me choose when Nexent syncs and scans</Form.Label>
                                        <Form.Text className="text-muted">
                                            By default, Nexent does a lightweight hourly 
                                            sync and an intensive daily scan of field values. If you have a large database, 
                                            we recommend turning this on and reviewing when and how often the field 
                                            value scans happen.
                                        </Form.Text>
                                    </Col>
                                    <Col  md="1">
                                        <Form.Check 
                                            type="switch"
                                            id="user-control-scheduling"
                                            checked={userControlScheduling}
                                            onChange={switches("user-control-scheduling")}        
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            {c}
                        </Col>
                        {d}
                    </Row>
                    </CardBody>
                </Form>
            </Card>
    )
}

export default Presto
