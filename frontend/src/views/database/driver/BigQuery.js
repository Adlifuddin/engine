import React, { useState, useEffect } from 'react'
import {Card, CardBody, Row, Col, CardHeader} from 'reactstrap'
import { Form } from 'react-bootstrap'
import Breadcrumbs from './components/Breadcrumb'
import FormComponent from './components/FormComponent'
import FormFooter from './components/FormFooter'
import SchedulingTab from './components/SchedulingTab'
import Scheduling from './components/Scheduling'
import Create from '../components/DatabaseFunction'
import {CardColor, CardHeaderColor} from '../../../components/customStyle/DatabaseColor'

function Childrens(props) {
    const { engine, inputting, name, datasetId, jsonProcess, jvmTimezone, switches, includeUserIDandHash, refingerprint, autoRunQueries, userControlScheduling} = props
    return (
        <>
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
                    onChange={jsonProcess}
                    accept="application/JSON"
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
            <Form.Group controlId="includeUserID">
                <Row>
                    <Col md="11">
                        <Form.Label>Include User ID and query hash in queries</Form.Label>
                        <Form.Text className="text-muted">
                            When on, Nexent User ID and query hash get appended to queries on this database, which can be useful for auditing and debugging. 
                            However, this causes each query to look distinct, preventing BigQuery from returning cached results, which may increase your costs.
                        </Form.Text>
                    </Col>
                    <Col md="1">
                        <Form.Check 
                            type="switch"
                            id="includeUserIDandHash"
                            checked={includeUserIDandHash}
                            onChange={switches("includeUserIDandHash")}
                        />
                    </Col>
                </Row>
            </Form.Group>
            <FormFooter switches={switches} autoRunQueries={autoRunQueries} userControlScheduling={userControlScheduling} refingerprint={refingerprint}/>
        </>
    )
}

function BigQuery(props) {
const { inputting,
        errorInput,
        page,
        updateLoading,
        parseScheduling,
        setPage,
        status,
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
        jsonProcess,
        activeKey,
        changeKey,
        refingerprint,
        includeUserIDandHash,
        } = props
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
                "auto_run_queries": autoRunQueries,
                "details": {
                    "let-user-control-scheduling": userControlScheduling,
                    "dataset-id": datasetId,
                    "use-jvm-timezone": jvmTimezone,
                    "use-service-account": null,
                    "service-account-json": json,
                    "include-user-id-and-hash": includeUserIDandHash
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
                Create.updateDatabases(datas, status, updateLoading)
            }
        } else {
            if (data.details["let-user-control-scheduling"]) {
                const validate = { "details": data }
                Create.validateDatabases(validate, setPage, errorInput)
            } else {
                Create.createDatabases(data)
                
            }

            if (page) {
                const datas = parseScheduling(data)
                Create.createDatabases(datas)
            }
        }
    }

    return (
            <Card style={CardColor}>
                <CardHeader style={CardHeaderColor}>
                    <Breadcrumbs b={b} />
                </CardHeader>
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
                                        datasetId={datasetId}
                                        jsonProcess={jsonProcess}
                                        jvmTimezone={jvmTimezone}
                                        switches={switches}
                                        includeUserIDandHash={includeUserIDandHash}
                                        refingerprint={refingerprint}
                                        autoRunQueries={autoRunQueries}
                                        userControlScheduling={userControlScheduling} />
                                </SchedulingTab>
                                :
                                <Childrens
                                    engine={engine}
                                    inputting={inputting}
                                    name={name}
                                    datasetId={datasetId}
                                    jsonProcess={jsonProcess}
                                    jvmTimezone={jvmTimezone}
                                    switches={switches}
                                    includeUserIDandHash={includeUserIDandHash}
                                    refingerprint={refingerprint}
                                    autoRunQueries={autoRunQueries}
                                    userControlScheduling={userControlScheduling} />
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

export default BigQuery
