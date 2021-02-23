import React from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form } from 'react-bootstrap'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'

function BigQuery(props) {
    const { inputting,
        engine,
        jvmTimezone,
        autoRunQueries, 
        userControlScheduling,
        name,
        datasetId,
        switches,
        json,
        d,
        b,
        submit,
        c} = props

    return (
            <Card style={{margin: '20px'}}>
                <Breadcrumbs b={b} />
            <Form onSubmit={submit}>
                <CardBody>
                    <Row>
                        <Col md="8">
                            <FormComponent engine={engine} inputting={inputting} name={name}/>
                            <Form.Group controlId="formBasicDataset">
                                <Form.Label>Dataset ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="toucanSightings"
                                    value={datasetId}
                                    onChange={inputting("datasetId")}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicJSON">
                                <Form.Label>Service account JSON file</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="5439"
                                    value={json}
                                />
                            </Form.Group>
                            <Form.Group controlId="jvm-timezone">
                                <Row>
                                    <Col md="11">
                                        <Form.Label>Use the Java Virtual Machine (JVM) timezone</Form.Label>
                                        <Form.Text className="text-muted">
                                            We suggest you leave this off unless you're doing manual timezone 
                                            casting in many or most of your queries with this data.
                                        </Form.Text>
                                    </Col>
                                    <Col md="1">
                                        <Form.Check 
                                            type="switch"
                                            id="jvm-timezone"
                                            checked={jvmTimezone}
                                            onChange={switches("jvm-timezone")}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
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

export default BigQuery
