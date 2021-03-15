import React, { useEffect, useState } from 'react'
import Breadcrumbs from './components/Breadcrumbs'
import {Container, Table, Row, Col} from 'react-bootstrap'
import api from '../../api/metabaseApi'
import ApiLoader from '../Loader/ApiLoader'
import { tableHeader, table2Header, table1Row, tableRow } from '../customStyle/PermissionColor'
import axios from 'axios'

function PermissionTableList(props) {
    const {match} = props
    const [tableDats, setTableDats] = useState()
    const [schema, setSchema] = useState([])
    const [load, setLoad] = useState(false)
    const [dataName, setDataName] = useState([])

    useEffect(() => {
        setLoad(true)
        api.databaseListID(match.params.id)
            .then(res => {
                setLoad(false)
                const datas = res.data
                const dats = datas['tables'].filter(x => x.schema === match.params.index)
                setDataName(res.data)
                setTableDats(dats)
            })
            .catch(error => {
                setLoad(true)
                console.log(error)
            })
        api.getSchemaID(match.params.id)
            .then(res => {
                setSchema(res.data)
            })
            .catch(error => {
                console.log(error)
            })

        const sessions = localStorage.getItem('sessions')

        axios.get('https://dashboard-demo.nexent.co/api/user/current', {
            headers: {
                "X-Metabase-Session": sessions
            }
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <Container fluid>
            {load ? 
                <ApiLoader apiload={load}/>
                :
                <>
                {tableDats !== undefined ?
                    <>
                        <Breadcrumbs id={match.params.id} b={dataName.name} c={match.params.index} schema={match.params.index}/>
                        <Table>
                            <thead>
                                <tr>
                                    <th style={tableHeader}></th>
                                    <th style={{textAlign: 'center', ...tableHeader}} colSpan="1">Analyst</th>
                                    <th style={{textAlign: 'center', ...tableHeader}} colSpan="1">Architect</th>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <th style={tableHeader}></th>
                                    <th style={{...table2Header, borderTopLeftRadius: "1em"}}>DATA ACCESS</th>
                                    <th style={{...table2Header, borderTopRightRadius: "1em"}}>DATA ACCESS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableDats.map(x => (
                                    <tr key={x.id}>
                                        <td style={{...table1Row, width: "250px"}}>
                                            <Row>
                                                <Col md="1">
                                                    {/* <AiFillFolder id="data" /> */}
                                                </Col>
                                                <Col md="6">
                                                    <span style={{fontWeight: 700, }}>{x.display_name}</span>
                                                    <br/>
                                                    <span style={{ color: 'rgb(120, 144, 156)', fontWeight: 400, fontSize: '14px'}}>{x.name}</span>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                    :
                    <>
                    </>
                }
                </>
            }
        </Container>
    )
}

export default PermissionTableList
