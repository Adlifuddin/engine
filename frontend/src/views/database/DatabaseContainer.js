

import React, {useEffect, useState} from 'react'
import { Card, Row, Modal, ModalHeader, ModalBody, Col, ModalFooter } from 'reactstrap'
import { Button, Spinner, Navbar, Nav } from 'react-bootstrap'
import api from '../../api/metabaseApi'
import { TiTick } from 'react-icons/ti'
import DatabaseDriver from './components/DatabaseDriver'
import Scheduling from './driver/components/Scheduling'

function DatabaseContainer(props) {
    const { status } = props
    const [modal, setModal] = useState(false);
    const [Delete, setDelete] = useState("")
    const toggle = () => setModal(!modal);
    const [modalDelete, setModalDelete] = useState(false);
    const toggleDelete = () => setModalDelete(!modalDelete);
    const [disabling, setDisabling] = useState(true);
    const [loading, setLoading] = useState("nothing")
    const [ReScanLoading, setReScanLoading] = useState("nothing")
    const [error, setError] = useState("")

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
    const [json, setJSON] = useState()
    const [tunnelPort, setTunnelPort] = useState("22")
    const [tunnelHost, setTunnelHost] = useState("")
    const [tunnelUser, setTunnelUser] = useState("")
    const [tunnelPrivateKey, setTunnelPrivateKey] = useState("")
    const [tunnelPassword, setTunnelPassword] = useState("")
    const [sshAuth, setSSHAuth] = useState("ssh-key")
    const [sslCert, setSSLCert] = useState("")
    const [authDatabase, setAuthDatabase] = useState("")
    const [dnsSRV, setDnsSRV] = useState("")
    const [warehouse, setWarehouse] = useState("")
    const [account, setAccount] = useState("")
    const [region, setRegion] = useState("")
    const [schema, setSchema] = useState("")
    const [role, setRole] = useState("")
    const [dbInstanceName, setDbInstanceName] = useState("")

    const [changes, setChanges] = useState('hourly')
    const [time, setTime] = useState('0')
    const [day, setDay] = useState('am')
    
    const [filterChange, setFilterChange] = useState('daily')
    const [filterTime, setFilterTime] = useState('0')
    const [filterDate, setFilterDate] = useState('am')

    const [onThe, setonThe] = useState('first')
    const [onTheChange, setonTheChange] = useState('mon')
    const [oriChange, setOriChange] = useState('mon')
    const [page, setPage] = useState(false)

    useEffect(() => {
        if (status !== 'add') {
            api.databaseListID(status)
                .then(response => {
                    if (response.data.details) {
                        const data = response.data
                        setName(data.name)
                        setEngine(data.engine)
                        setDatabaseData(data)
                        setAutoRunQueries(data.auto_run_queries)
                        setUserControlScheduling(data.details["let-user-control-scheduling"])
                        switch (data.engine) {
                            case "h2":
                                setDB(data.details.db)
                                break;
                            case "sqlite":
                                setDB(data.details.db)
                                break;
                            case "bigquery":
                                setJvmTimezone()
                                setDatasetId()
                                setJSON()
                                break;
                            case "druid":                
                                setHost(data.details.host)
                                setPort(data.details.port)
                                setSSHTunnel(data.details['tunnel-enabled'])
                                if (data.details['tunnel-enabled']) {
                                    setTunnelHost()
                                    setTunnelPort()
                                    setTunnelUser()
                                    setSSHAuth()
                                    setTunnelPrivateKey()
                                    setTunnelPassword()
                                }
                                break;
                            case "googleanalytics":
                                setGaAccountID()
                                setGaClientID()
                                setGaSecret()
                                setAuthCode()
                                break;
                            case 'mongo':
                                setDB(data.details.db)
                                setAuthDatabase()
                                setHost(data.details.host)
                                setPort(data.details.port)
                                setDbName(data.details.dbname)
                                setUsername(data.details.user)
                                setPassword(data.details.password)
                                setDnsSRV()
                                setSSLSwitch(data.details.ssl)
                                if (data.details.ssl) {
                                    setSSLCert()
                                }
                                setSSHTunnel(data.details['tunnel-enabled'])
                                if (data.details['tunnel-enabled']) {
                                    setTunnelHost()
                                    setTunnelPort()
                                    setTunnelUser()
                                    setSSHAuth()
                                    setTunnelPrivateKey()
                                    setTunnelPassword()
                                }
                                break;
                            case 'presto', 'redshift':
                                setSSLSwitch(data.details.ssl)
                                setSSHTunnel(data.details['tunnel-enabled'])
                                if (data.details['tunnel-enabled']) {
                                    setTunnelHost()
                                    setTunnelPort()
                                    setTunnelUser()
                                    setSSHAuth()
                                    setTunnelPrivateKey()
                                    setTunnelPassword()
                                }
                                setHost(data.details.host)
                                setPort(data.details.port)
                                setDbName(data.details.dbname)
                                setUsername(data.details.user)
                                setPassword(data.details.password)
                                break;
                            case 'snowflake':
                                setDbName(data.details.dbname)
                                setUsername(data.details.user)
                                setPassword(data.details.password)
                                setWarehouse()
                                setSchema()
                                setAccount()
                                setRegion()
                                setRole()
                                setJDBC(data.details["additional-options"])
                                setSSHTunnel(data.details['tunnel-enabled'])
                                if (data.details['tunnel-enabled']) {
                                    setTunnelHost()
                                    setTunnelPort()
                                    setTunnelUser()
                                    setSSHAuth()
                                    setTunnelPrivateKey()
                                    setTunnelPassword()
                                }
                                break;
                            case 'sparksql':
                                setHost(data.details.host)
                                setPort(data.details.port)
                                setDbName(data.details.dbname)
                                setUsername(data.details.user)
                                setPassword(data.details.password)
                                setJDBC(data.details["additional-options"])
                            case "sqlserver":
                                setSSLSwitch(data.details.ssl)
                                setSSHTunnel(data.details['tunnel-enabled'])
                                if (data.details['tunnel-enabled']) {
                                    setTunnelHost()
                                    setTunnelPort()
                                    setTunnelUser()
                                    setSSHAuth()
                                    setTunnelPrivateKey()
                                    setTunnelPassword()
                                }
                                setHost(data.details.host)
                                setPort(data.details.port)
                                setDbName(data.details.dbname)
                                setUsername(data.details.user)
                                setPassword(data.details.password)
                                setJDBC(data.details["additional-options"])
                                setDbInstanceName()
                            default:
                                setJDBC(data.details["additional-options"])
                                setSSLSwitch(data.details.ssl)
                                setSSHTunnel(data.details['tunnel-enabled'])
                                if (data.details['tunnel-enabled']) {
                                    setTunnelHost()
                                    setTunnelPort()
                                    setTunnelUser()
                                    setSSHAuth()
                                    setTunnelPrivateKey()
                                    setTunnelPassword()
                                }
                                setHost(data.details.host)
                                setPort(data.details.port)
                                setDbName(data.details.dbname)
                                setUsername(data.details.user)
                                setPassword(data.details.password)
                                break;
                        }
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
            case 'dnsSRV':
                setDnsSRV(e.target.checked)
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
            case "tunnelHost":
                setTunnelHost(e.target.value)
                break;
            case "tunnelPort":
                setTunnelPort(e.target.value)
                break;
            case "tunnelUser":
                setTunnelUser(e.target.value)
                break;
            case "sshAuth":
                setSSHAuth(e.target.value)
                break;
            case "tunnelPrivateKey":
                setTunnelPrivateKey(e.target.value)
                break;
            case "tunnelPassword":
                setTunnelPassword(e.target.value)
                break;
            case "schema":
                setSchema(e.target.value)
                break;
            case "warehouse":
                setWarehouse(e.target.value)
                break;
            case "account":
                setAccount(e.target.value)
                break;
            case "region":
                setRegion(e.target.value)
                break;
            case "role":
                setRole(e.target.value)
                break;
            case "dbInstanceName":
                setDbInstanceName(e.target.value)
                break;
            case "sslCert":
                setSSLCert(e.target.value)
                break;
            default:
                break;
        }
    }
    
    const errorInput = (errors) => {
        setError(errors)
        window.setTimeout(() => {
            setError("")
        }, 5000)
    }

    let b
    if (databaseData.details) {
        b = databaseData.name
    } else {
        b = "Add Database"
    }

    let c 
    if (databaseData.details) {
        c = (
            <Row>
                <Col md="3">
                    <Button variant="success" type="submit">Save Changes</Button>
                </Col>
                <Col>
                    <p style={{color: 'red'}}>{error}</p>
                </Col>
            </Row>
        )
    } else if (userControlScheduling && status === 'add') {
        c = (
             <Row>
                <Col md="1">
                    {page?
                        <Button variant="success" type="submit">Save</Button>
                        :
                        <Button variant="success" type="submit">Next</Button>
                    }
                </Col>
                <Col>
                    <p style={{color: 'red'}}>{error}</p>
                </Col>
            </Row>
        )
    } else if(page){
        c = (
            <Row>
                <Col md="1">
                    <Button variant="success" type="submit">Save</Button>
                </Col>
                <Col>
                    <p style={{color: 'red'}}>{error}</p>
                </Col>
            </Row>
        )
    } else {
        c = (
            <Row>
                <Col md="1">
                    <Button variant="success" type="submit">Save</Button>
                </Col>
                <Col>
                    <p style={{color: 'red'}}>{error}</p>
                </Col>
            </Row>
        )
    }

    const syncSchema = () => {
        setLoading("loading")
        api.syncSchema({}, status)
            .then(response => {
                const data = response.data
                setLoading("loaded")
                window.setTimeout(() => {
                    setLoading("nothing")
                }, 3000)
            })
            .catch(error => {
                console.log(error)
                setLoading("nothing")
            })
    }

    const reScanValue = () => {
        setReScanLoading("loading")
        api.reScanValue({}, status)
            .then(response => {
                const data = response.data
                setReScanLoading("loaded")
                window.setTimeout(() => {
                    setReScanLoading("nothing")
                }, 3000)
            })
            .catch(error => {
                console.log(error)
                setReScanLoading("nothing")
            })
    }

    const discardSavedFiled = () => {
        api.discardValue({}, status)
            .then(response => {
                const data = response.data
                if (data) {
                    if (data.status === 'ok') {
                        setModal(false)
                    }
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const deleteDatabase = () => {
        if (Delete === 'delete') {
            api.deleteDatabase(status)
                .then(response => {
                    window.location.href = "/database"
                })
                .catch(error => {
                    console.log(error)
                })
        } else {

        }
    }

    const deleting = (e) => {
        const data = e.target.value.toLowerCase()
        if (data === 'delete') {
            setDisabling(false)
        } else {
            setDisabling(true)
        }
        setDelete(data)
    }

    let loadings
    if (loading === 'loading') {
        loadings = (
            <Button variant="light">
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                /> 
                <span className="sr-only">Loading...</span>
            </Button>
        )
    } else if (loading === 'nothing') {
        loadings = (
            <Button variant="light" onClick={syncSchema}>Sync database schema now</Button>
        )
    } else if (loading === 'loaded') {
        loadings = (
            <Button variant="success"><TiTick/> Sync triggered!</Button>
        )
    }

    let loads
    if (ReScanLoading === 'loading') {
        loads = (
            <Button variant="light">
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                /> 
                <span className="sr-only">Loading...</span>
            </Button>
        )
    } else if (ReScanLoading === 'nothing') {
        loads = (
            <Button variant="light" onClick={reScanValue}>Re-scan field values now</Button>
        )
    } else if (ReScanLoading === 'loaded') {
        loads = (
            <Button variant="success"><TiTick/> Sync triggered!</Button>
        )
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
                                {loadings}
                            </Col>
                            <br/>
                            <Col>
                                {loads}
                            </Col>
                            <br/>
                            <Col><h5>Danger Zone</h5></Col>
                            <Col>
                                <Button variant="danger" onClick={toggle}>Discard saved field values</Button>
                            </Col>
                            <Modal isOpen={modal} toggle={toggle}>
                                <ModalHeader toggle={toggle}>Discard saved field values</ModalHeader>
                                <ModalBody>
                                    Are you sure you want to do this?
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant="light" onClick={toggle}>Cancel</Button>{' '}
                                    <Button variant="danger" onClick={discardSavedFiled}>Yes</Button>
                                </ModalFooter>
                            </Modal>
                            <br/>
                            <Col>
                                <Button variant="danger" onClick={toggleDelete}>Remove this database</Button>
                            </Col>
                            <br />
                            <Modal isOpen={modalDelete} toggle={toggleDelete}>
                                <ModalHeader toggle={toggleDelete}>Delete this database?</ModalHeader>
                                <ModalBody>
                                    <Row>
                                        <Col>
                                            All saved questions, metrics, and segments that rely on this database will be lost. 
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <p style={{fontWeight: 'bold'}}>This cannot be undone.</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            If you're sure, please type DELETE in this box:
                                        </Col>
                                    </Row>
                                    <br/>
                                    <input type="text" value={Delete} onChange={deleting}/>
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant="light" onClick={toggleDelete}>Cancel</Button>{' '}
                                    <Button variant="danger" onClick={deleteDatabase} disabled={disabling}>Delete</Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                    </Row>
                </Card>
            </Col>
        )
    }

    const onChanges = (e) => {
        setChanges(e.target.value)
    }

    const onDayChange = (e) => {
        setDay(e.target.value)
    }

    const onTimeChange = (e) => {
        setTime(e.target.value)
    }

    const filterChanges = (e) => {
        setFilterChange(e.target.value)
    }

    const filterDayChanges = (e) => {
        setFilterDate(e.target.value)
    }

    const filterTimeChanges = (e) => {
        setFilterTime(e.target.value)
    }

    const changingOnThe = (e)  => {
        setonThe(e.target.value)
    }

    const changeOnTheChange = (e) => {
        setonTheChange(e.target.value)
    }

    const changeOriChange = (e) => {
        setOriChange(e.target.value)
    }

    return (
        <>
            <DatabaseDriver
                errorInput={errorInput}
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
                tunnelPort={tunnelPort}
                tunnelHost={tunnelHost}
                tunnelUser={tunnelUser}
                tunnelPrivateKey={tunnelPrivateKey}
                tunnelPassword={tunnelPassword}
                sshAuth={sshAuth}
                jdbc={jdbc}
                switches={switches}
                jvmTimezone={jvmTimezone}
                datasetId={datasetId}
                GaAccountID={GaAccountID}
                GaClientID={GaClientID}
                GaSecret={GaSecret}
                authCode={authCode}
                d={d}
                b={b}
                c={c}
                page={page}
                setPage={setPage}
                status={status}
                dnsSRV={dnsSRV}
                account={account}
                region={region}
                schema={schema}
                role={role}
                warehouse={warehouse}
                db={db}
                dbInstanceName={dbInstanceName}
                json={json}
                authDatabase={authDatabase}
                sslCert={sslCert}
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
        </>
    )

}

export default DatabaseContainer
