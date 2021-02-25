import React, {useState, useEffect} from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form } from 'react-bootstrap'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'
import SchedulingTab from './components/SchedulingTab'
import api from '../../../api/metabaseApi'
import Scheduling from './components/Scheduling'

function GoogleAnalytics(props) {
const { status,
        inputting,
        page,
        setPage,
        errorInput,
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
        c,
        filterChange,
        filterTime,
        filterDate,
        filterTimeChanges,
        filterDayChanges,
        filterChanges,
        changes,
        day,
        onChanges,
        onDayChange,
        onTimeChange,
        changingOnThe,
        changeOnTheChange,
        onThe,
        onTheChange,
        oriChange,
        changeOriChange,
        time,} = props
        
    
    const [connection, setConnection] = useState(false)
   

    useEffect(() => {
        if (userControlScheduling) {
            setConnection(true)
        } else {
            setConnection(false)
        }
    }, [userControlScheduling])

    const submit = (e) => {
        e.preventDefault()

        let data = {
                // "auto_run_queries": autoRunQueries,
                // "details": {
                //     "let-user-control-scheduling": userControlScheduling,
                //     "db": db,
                // },
                // "engine": engine,
                // "is_full_sync": true,
                // "is_on_demand": false,
                // "name": name
            }
        if (data.details["let-user-control-scheduling"]) {
            const validate = { "details": data }
            api.validateDatabase(validate)
                .then(response => {
                    if (response.data.valid) {
                        setPage(true)
                    } else {
                        setPage(false)
                        errorInput("Couldn't connect to the database. Please check the connection details.")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            api.createDatabase(data)
                .then(response => {
                    window.location.href = '/database'
                    console.log(response)
                }) 
                .catch(error => {
                    console.log(error)
                })
        }

        if (page) {
            api.createDatabase(data)
                .then(response => {
                    window.location.href = '/database'
                    console.log(response)
                }) 
                .catch(error => {
                    console.log(error)
                })
        }
    }

    return (
         <Card style={{margin: '20px'}}>
                <Breadcrumbs b={b} />
            <Form onSubmit={submit}>
                <CardBody>
                    <Row>
                        <Col md="8">
                            {page?
                                <Scheduling
                                    filterChange={filterChange}
                                    filterTime={filterTime}
                                    filterDate={filterDate}
                                    filterTimeChanges={filterTimeChanges}
                                    filterDayChanges={filterDayChanges}
                                    filterChanges={filterChanges}
                                    changes={changes}
                                    time={time}
                                    day={day}
                                    onChanges={onChanges}
                                    onDayChange={onDayChange}
                                    onTimeChange={onTimeChange}
                                    changingOnThe={changingOnThe}
                                    changeOnTheChange={changeOnTheChange}
                                    onThe={onThe}
                                    onTheChange={onTheChange}
                                    oriChange={oriChange}
                                    changeOriChange={changeOriChange}
                                />
                                :
                            connection && status !== 'add' ?
                                <SchedulingTab
                                    filterChange={filterChange}
                                    filterTime={filterTime}
                                    filterDate={filterDate}
                                    filterTimeChanges={filterTimeChanges}
                                    filterDayChanges={filterDayChanges}
                                    filterChanges={filterChanges}
                                    changes={changes}
                                    time={time}
                                    day={day}
                                    onChanges={onChanges}
                                    onDayChange={onDayChange}
                                    onTimeChange={onTimeChange}
                                    changingOnThe={changingOnThe}
                                    changeOnTheChange={changeOnTheChange}
                                    onThe={onThe}
                                    onTheChange={onTheChange}
                                    oriChange={oriChange}
                                    changeOriChange={changeOriChange}
                                    connection={connection}
                                >
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
                                </SchedulingTab>
                                        :
                                        <>
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
                                </>
                            }
                            
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
