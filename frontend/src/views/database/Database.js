import React from 'react'
import {Card, CardHeader, CardBody, Row, Col} from 'reactstrap'
import {Form, Button} from 'react-bootstrap'

function Database() {
    
    return (
        <Card style={{margin: '20px'}}>
            <CardHeader tag="h3">Add a Database</CardHeader>
            <Form>
                <CardBody>
                    <Row>
                        <Col md="8">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Database Type</Form.Label>
                                <Form.Control as="select" custom>
                                    <option>PostgreSQL</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="How would you like to refer to this database" />
                            </Form.Group>
                            <Form.Group controlId="formBasicHost">
                                <Form.Label>Host</Form.Label>
                                <Form.Control type="text" placeholder="localhost" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPort">
                                <Form.Label>Port</Form.Label>
                                <Form.Control type="number" placeholder="5432" />
                            </Form.Group>
                            <Form.Group controlId="formBasicDatabaseName">
                                <Form.Label>Database Name</Form.Label>
                                <Form.Control type="text" placeholder="birds_of_the_world" />
                            </Form.Group>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" placeholder="What username do you use to login to the database?" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
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
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Additional JDBC connection string options</Form.Label>
                                <Form.Control type="text" placeholder="prepareThreshold=0" />
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
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            
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
                                            id="large-database"
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Button variant="success" className="disabled">Save</Button>
                        </Col>
                    </Row>
                    
                </CardBody>
            </Form>
            
        </Card>
        
    )
}

export default Database
