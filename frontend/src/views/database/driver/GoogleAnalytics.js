import React from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form, Button } from 'react-bootstrap'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'

function GoogleAnalytics(props) {
    const { inputting,
        engine,
        autoRunQueries, 
        userControlScheduling,
        name,
        GaAccountID,
        GaClientID,
        GaSecret,
        authCode,
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
                            <Form.Group controlId="formBasicAccountID">
                                <Form.Label>Google Analytics Account ID</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="1234567"
                                    value={GaAccountID}
                                    onChange={inputting("GaAccountID")}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicClientID">
                                <Form.Label>Client ID</Form.Label>
                                <Form.Text>
                                    <a href="https://console.developers.google.com/apis/credentials/oauthclient?project=">Click here</a> to generate a Client ID and Client Secret for your project. Choose "Other" as the application type. Name it whatever you'd like.
                                </Form.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="1201327674725-y6ferb0feo1hfssr7t40o4aikqll46d4.apps.googleusercontent.com"
                                    value={GaClientID}
                                    onChange={inputting("GaClientID")}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicClientSecret">
                                <Form.Label>Client Secret</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="dJNi4utWgMzyIFo2JbnsK6Np"
                                    value={GaSecret}
                                    onChange={inputting("GaSecret")}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicAuthCode">
                                <Form.Label>Auth Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="4/HSk-KtxkSzTt61j5zcbee2Rmm5JHkRFbL5gD5lgkXek"
                                    value={authCode}
                                    onChange={inputting("authCode")}
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

export default GoogleAnalytics
