import React from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form, Button, Breadcrumb } from 'react-bootstrap'

function SQLite(props) {
    const { inputting,
        engine,
        autoRunQueries, 
        userControlScheduling,
        name,
        db,
        switches,
        d,
        b,
        c} = props


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
                                <Form.Label>Filename</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="/home/camsaul/toucan_sightings.sqlite"
                                    value={db}
                                    onChange={inputting("db")}
                                />
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

export default SQLite
