import React from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form } from 'react-bootstrap'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'

function SparkSQL(props) {
    const { inputting,
        engine,
        autoRunQueries, 
        userControlScheduling,
        name,
        host,
        port,
        dbname,
        username,
        password,
        jdbc,
        switches,
        d,
        b,
        c} = props

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
                                <Form.Label>Port</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="10000"
                                    value={port}
                                    onChange={inputting("port")}
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
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Additional JDBC connection string options</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder=";transportMode=http"
                                    value={jdbc}
                                    onChange={inputting("jdbc")}
                                />
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

export default SparkSQL
