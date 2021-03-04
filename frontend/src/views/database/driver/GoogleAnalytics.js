import React, {useState, useEffect} from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form } from 'react-bootstrap'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'
import SchedulingTab from './components/SchedulingTab'
import api from '../../../api/metabaseApi'
import Scheduling from './components/Scheduling'

function Childrens(props) {
    const { engine, inputting, name, GaAccountID, GaClientID, switches, GaSecret, authCode, autoRunQueries, userControlScheduling, refingerprint} = props
    return (
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
            <FormFooter switches={switches} autoRunQueries={autoRunQueries} userControlScheduling={userControlScheduling} refingerprint={refingerprint}/>
        </>
    )
}

function GoogleAnalytics(props) {
const { status,
        inputting,
        page,
        setPage,
        errorInput,
        parseScheduling,
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
        time,
        activeKey,
        changeKey,
        refingerprint,
        updateLoading} = props

    const [connection, setConnection] = useState(false)
   

    useEffect(() => {
        if (userControlScheduling) {
            setConnection(true)
        } else {
            setConnection(false)
        }
    }, [userControlScheduling])

    const createDatabases = (data) => {
        api.createDatabase(data)
                    .then(response => {
                        const id = response.data.id
                        api.getPermissionGraph()
                            .then(response => {
                                var datas = response.data
                                var groups = response.data.groups

                                var payload = {
                                    ...datas,
                                    groups: {
                                        ...groups,
                                        "1": {
                                            [id]: { native: "none", schemas: "none" }
                                        },
                                        "5": {
                                            [id]: { native: "write", schemas: "all" }
                                        }
                                    }
                                }
                                api.putPermissionGraph(payload)
                                    .then(response => {
                                        console.log(response)
                                        window.location.href = '/database'
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    })
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    })
                    .catch(error => {
                        console.log(error)
                    })
    }

    const submit = (e) => {
        e.preventDefault()
        let data = {
                "auto_run_queries": autoRunQueries,
                "details": {
                    "let-user-control-scheduling": userControlScheduling,
                    "account-id": GaAccountID,
                    "auth-code": authCode,
                    "client-id": GaClientID,
                    "client-secret": GaSecret,
                },
                "engine": engine,
                "is_full_sync": true,
                "is_on_demand": false,
                "name": name,
                "refingerprint": refingerprint
            }
        const updateSubmits = document.querySelector('#update-save')
        if (updateSubmits !== null) {
            updateLoading("update")
            const updates = updateSubmits.id
            if (updates === 'update-save') {
                const datas = parseScheduling(data)
                api.updateDatabase(datas, status)
                    .then(response => {
                        updateLoading('done')
                        window.location.reload()
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        } else {
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
                createDatabases(data)
            }
            if (page) {
                const datas = parseScheduling(data)
                createDatabases(datas)
            }
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
                                    activeKey={activeKey}
                                    changeKey={changeKey}
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
                                    activeKey={activeKey}
                                    changeKey={changeKey}
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
                                    <Childrens
                                        engine={engine}
                                        inputting={inputting}
                                        name={name}
                                        GaAccountID={GaAccountID}
                                        GaClientID={GaClientID}
                                        switches={switches}
                                        GaSecret={GaSecret}
                                        authCode={authCode}
                                        autoRunQueries={autoRunQueries}
                                        userControlScheduling={userControlScheduling}
                                        refingerprint={refingerprint}
                                    />
                                </SchedulingTab>
                                :
                                <Childrens
                                    engine={engine}
                                    inputting={inputting}
                                    name={name}
                                    GaAccountID={GaAccountID}
                                    GaClientID={GaClientID}
                                    switches={switches}
                                    GaSecret={GaSecret}
                                    authCode={authCode}
                                    autoRunQueries={autoRunQueries}
                                    userControlScheduling={userControlScheduling}
                                    refingerprint={refingerprint}
                                />
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
