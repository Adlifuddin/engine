import React from 'react'
import {Row, Col} from 'reactstrap'
import { Form } from 'react-bootstrap'

function FormFooter(props) {
    const {switches, autoRunQueries, userControlScheduling}= props

    return (
        <>
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
        </>
    )
}

export default FormFooter
