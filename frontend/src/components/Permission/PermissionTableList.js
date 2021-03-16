import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import { Container, Table, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap'
import {TiTick} from 'react-icons/ti'
import { ImCross } from 'react-icons/im'
import api from '../../api/metabaseApi'
import ApiLoader from '../Loader/ApiLoader'
import { tableHeader, table2Header, table1Row, tableRow } from '../customStyle/PermissionColor'
import Create from './components/PermissionApi'
import {BsGrid3X3Gap} from 'react-icons/bs'

function PermissionTableList(props) {
    const {match} = props
    const [tableDats, setTableDats] = useState()
    const [permissionGraph, setPermissionGraph] = useState()
    const [schema, setSchema] = useState([])
    const [load, setLoad] = useState(false)
    const [dataName, setDataName] = useState([])

    useEffect(() => {
        setLoad(true)
        Create.CallData(setPermissionGraph, setLoad)
        api.databaseListID(match.params.id)
            .then(res => {
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
    }, [])

    const click = (e) => {
        console.log(e.target.id)
    }

    return (
        <Container fluid>
            {load ? 
                <ApiLoader apiload={load}/>
                :
                <>
                {tableDats !== undefined ?
                    <>
                        
                            {permissionGraph !== undefined ?
                                <>
                                <Breadcrumbs a="Databases" id={match.params.id} b={dataName.name} c={match.params.index} schema={match.params.index} links="/permission" />
                                <Table>
                                    <thead>
                                        <tr>
                                            <th style={tableHeader}></th>
                                            <th style={{ textAlign: 'center', ...tableHeader }} colSpan="1">Analyst</th>
                                            <th style={{ textAlign: 'center', ...tableHeader }} colSpan="1">Architect</th>
                                        </tr>
                                    </thead>
                                    <thead>
                                        <tr>
                                            <th style={tableHeader}></th>
                                            <th style={{ ...table2Header, borderTopLeftRadius: "1em" }}>DATA ACCESS</th>
                                            <th style={{ ...table2Header, borderTopRightRadius: "1em" }}>DATA ACCESS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableDats.map(x => (
                                            <tr key={x.id}>
                                                <td style={{ ...table1Row, width: "250px" }}>
                                                    <Row>
                                                        <Col md="1">
                                                            <BsGrid3X3Gap id="data" />
                                                        </Col>
                                                        <Col md="6">
                                                            <span style={{ fontWeight: 700, }}>{x.display_name}</span>
                                                            <br />
                                                            <span style={{ color: 'rgb(120, 144, 156)', fontWeight: 400, fontSize: '14px' }}>{x.name}</span>
                                                        </Col>
                                                    </Row>
                                                </td>
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{permissionGraph[dataName.name].Analyst.native === 'none' ? "No access" : "Unrestricted Access"}</Tooltip>}>
                                                    <td onClick={click} 
                                                        id={`native${permissionGraph[dataName.name].Analyst.native}`} 
                                                        style={tableRow}>
                                                        {permissionGraph[dataName.name].Analyst.native=== 'none'? 
                                                            <ImCross id={`nativecross`}/> 
                                                            : 
                                                            <TiTick id={`nativetick`}/>
                                                        }
                                                    </td>
                                                </OverlayTrigger>
                                                
                                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{permissionGraph[dataName.name].Architect.native === 'none' ? "No access" : "Unrestricted Access"}</Tooltip>}>
                                                    <td id={`native${permissionGraph[dataName.name].Architect.native}`}
                                                        style={{...tableRow, borderRight: "1px solid #dee2e6", borderLeft: "1px solid rgb(184, 187, 195)"}}>
                                                    {permissionGraph[dataName.name].Architect.native === 'none' ?
                                                        <ImCross id={`nativecross`}/> 
                                                        : 
                                                            <TiTick id={`nativetick`} />}
                                                    </td>
                                                </OverlayTrigger>
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
