import React from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form, Button } from 'react-bootstrap'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'

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
                <Breadcrumbs b={b} />
            <Form>
                <CardBody>
                    <Row>
                        <Col md="8">
                            <FormComponent engine={engine} inputting={inputting} name={name}/>
                            <Form.Group controlId="formBasicHost">
                                <Form.Label>Filename</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="/home/camsaul/toucan_sightings.sqlite"
                                    value={db}
                                    onChange={inputting("db")}
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

export default SQLite
