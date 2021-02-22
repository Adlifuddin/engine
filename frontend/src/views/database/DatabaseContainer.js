

import React, {useEffect, useState} from 'react'
import {Card, CardBody, Row, Col} from 'reactstrap'
import { Form, Button, Breadcrumb } from 'react-bootstrap'
import api from '../../api/metabaseApi'
import Postgres from './driver/Postgres'
import SQLite from './driver/SQLite'
import RedShift from './driver/Redshift'
import BigQuery from './driver/BigQuery'
import MySQL from './driver/MySQL'
import Druid from './driver/Druid'
import GoogleAnalytics from './driver/GoogleAnalytics'
import H2 from './driver/H2'
import MongoDB from './driver/MongoDB'
import Presto from './driver/Presto'
import Snowflake from './driver/Snowflake'
import SparkSQL from './driver/SparkSQL'
import SqlServer from './driver/SqlServer'

function DatabaseContainer(props) {
    const { status } = props

    const [databaseData, setDatabaseData] = useState([])
    const [sslSwitch, setSSLSwitch] = useState(false);
    const [sshTunnel, setSSHTunnel] = useState(false);
    const [autoRunQueries, setAutoRunQueries] = useState(false);
    const [userControlScheduling, setUserControlScheduling] = useState(false);
    const [name, setName] = useState("")
    const [host, setHost] = useState("")
    const [port, setPort] = useState("")
    const [dbname, setDbName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [jdbc, setJDBC] = useState("")
    const [engine, setEngine] = useState("postgres")
    const [db, setDB] = useState("")
    const [jvmTimezone, setJvmTimezone] = useState(false)
    const [datasetId, setDatasetId] = useState("");
    const [GaAccountID, setGaAccountID] = useState("");
    const [GaClientID, setGaClientID] = useState("");
    const [GaSecret, setGaSecret] = useState("");
    const [authCode, setAuthCode] = useState("");
 
    useEffect(() => {
        if (status !== 'add') {
            api.databaseListID(status)
                .then(response => {
                    if (response.data.details) {
                        if (response.data.details.db !== undefined) {
                            setDB(response.data.details.db)
                        } else if (response.data.details["additional-options"] !== undefined) {
                            setJDBC(response.data.details["additional-options"])
                        } else if (response.data.details.ssl !== undefined) {
                            setSSLSwitch(response.data.details.ssl)
                        } else if (response.data.details['tunnel-enabled'] !== undefined) {
                            setSSHTunnel(response.data.details['tunnel-enabled'])
                        } else if (response.data.details.host !== undefined) {
                            setHost(response.data.details.host)
                        } else if (response.data.details.port !== undefined) {
                            setPort(response.data.details.port)
                        } else if (response.data.details.dbname !== undefined) {
                            setDbName(response.data.details.dbname)
                        } else if (response.data.details.user !== undefined) {
                            setUsername(response.data.details.user)
                        } else if (response.data.details.password !== undefined) {
                            setPassword(response.data.details.password)
                        }
                        setName(response.data.name)
                        setEngine(response.data.engine)
                        setDatabaseData(response.data)
                        setAutoRunQueries(response.data.auto_run_queries)
                        setUserControlScheduling(response.data.details["let-user-control-scheduling"])
                    } 
                })
                .catch(error => {
                    console.log(error)
                })
        }
        
    }, [])


    const switches = input => e => {
        switch (input) {
            case "ssl-switch":
                setSSLSwitch(e.target.checked)
                break;
            case "ssh-tunnel":
                setSSHTunnel(e.target.checked)
                break;
            case "auto-run-queries":
                setAutoRunQueries(e.target.checked)
                break;
            case "user-control-scheduling":
                setUserControlScheduling(e.target.checked)
                break;
            case "jvm-timezone":
                setJvmTimezone(e.target.checked)
                break;
            default:
                break;
        }
    }

    const inputting = input => e => {
        switch (input) {
            case "name":
                setName(e.target.value)
                break;
            case "host":
                setHost(e.target.value)
                break;
            case "port":
                setPort(e.target.value)
                break;
            case "dbname":
                setDbName(e.target.value)
                break;
            case "username":
                setUsername(e.target.value)
                break;
            case "password":
                setPassword(e.target.value)
                break;
            case "jdbc":
                setJDBC(e.target.value)
                break;
            case "engine":
                setEngine(e.target.value)
                break;
            case "db":
                setDB(e.target.value)
                break;
            case "datasetId":
                setDatasetId(e.target.value)
                break;
            case "GaAccountID":
                setGaAccountID(e.target.value)
                break;
            case "GaClientID":
                setGaClientID(e.target.value)
                break;
            case "GaSecret":
                setGaSecret(e.target.value)
                break;
            case "authCode":
                setAuthCode(e.target.value)
                break;
            default:
                break;
        }
    }

    let b
    if (databaseData.details) {
        b = databaseData.name
    } else {
        b = "Add Database"
    }

    let c 
    if (databaseData.details) {
        c = (<Button variant="success" className="disabled">Save Changes</Button>)
    } else {
        c = (<Button variant="success" className="disabled">Save</Button>)
    }

    let d 
    if (databaseData.details) {
        d = (
            <Col md="4">
                <Card>
                    <Row>
                        <Col>
                            <br/>
                            <Col><h5>Actions</h5></Col>
                            <Col>
                                <Button variant="light">Sync database schema now</Button>
                            </Col>
                            <br/>
                            <Col>
                                <Button variant="light">Re-scan field values now</Button>
                            </Col>
                            <br/>
                            <Col><h5>Danger Zone</h5></Col>
                            <Col>
                                <Button variant="danger">Discard saved field values</Button>
                            </Col>
                            <br/>
                            <Col>
                                <Button variant="danger">Remove this database</Button>
                            </Col>
                            <br/>
                        </Col>
                    </Row>
                </Card>
            </Col>
        )
    }

    switch (engine) {
        case "postgres":
            return <Postgres
                        inputting={inputting}
                        engine={engine}
                        sslSwitch={sslSwitch}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        dbname={dbname}
                        username={username}
                        password={password}
                        jdbc={jdbc}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
                    />;
        case "sqlite":
            return <SQLite
                        inputting={inputting}
                        engine={engine}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        switches={switches}
                        db={db}
                        d={d}
                        b={b}
                        c={c}
            />
        case "redshift":
            return <RedShift
                        inputting={inputting}
                        engine={engine}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        dbname={dbname}
                        username={username}
                        password={password}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
            />
        case "bigquery":
            return <BigQuery
                        inputting={inputting}
                        engine={engine}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        jvmTimezone={jvmTimezone}
                        datasetId={datasetId}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
                    />
        case "mysql":
            return <MySQL
                        inputting={inputting}
                        engine={engine}
                        sslSwitch={sslSwitch}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        dbname={dbname}
                        username={username}
                        password={password}
                        jdbc={jdbc}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
                    />;
        case "druid":
            return <Druid
                        inputting={inputting}
                        engine={engine}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
                    />;
        case "googleanalytics":
            return <GoogleAnalytics
                        inputting={inputting}
                        engine={engine}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        GaAccountID={GaAccountID}
                        GaClientID={GaClientID}
                        GaSecret={GaSecret}
                        authCode={authCode}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
                    />;
        case "h2":
            return <H2
                        inputting={inputting}
                        engine={engine}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        db={db}
                        datasetId={datasetId}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
                    />;
        case "mongo":
            return <MongoDB
                        inputting={inputting}
                        engine={engine}
                        sslSwitch={sslSwitch}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        dbname={dbname}
                        username={username}
                        password={password}
                        jdbc={jdbc}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
            />;
        case "presto":
            return <Presto
                        inputting={inputting}
                        engine={engine}
                        sslSwitch={sslSwitch}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        dbname={dbname}
                        username={username}
                        password={password}
                        jdbc={jdbc}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
                    />
        case "snowflake":
            return <Snowflake
                        inputting={inputting}
                        engine={engine}
                        sslSwitch={sslSwitch}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        dbname={dbname}
                        username={username}
                        password={password}
                        jdbc={jdbc}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
                    />
        case "sparksql":
            return <SparkSQL
                        inputting={inputting}
                        engine={engine}
                        sslSwitch={sslSwitch}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        dbname={dbname}
                        username={username}
                        password={password}
                        jdbc={jdbc}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
            />
        case "sqlserver":
            return <SqlServer
                        inputting={inputting}
                        engine={engine}
                        sslSwitch={sslSwitch}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        dbname={dbname}
                        username={username}
                        password={password}
                        jdbc={jdbc}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
                    />
        default:
            return <Postgres
                        inputting={inputting}
                        engine={engine}
                        sslSwitch={sslSwitch}
                        sshTunnel={sshTunnel}
                        autoRunQueries={autoRunQueries}
                        userControlScheduling={userControlScheduling}
                        name={name}
                        host={host}
                        port={port}
                        dbname={dbname}
                        username={username}
                        password={password}
                        jdbc={jdbc}
                        switches={switches}
                        d={d}
                        b={b}
                        c={c}
                    />;
    }
}

export default DatabaseContainer
