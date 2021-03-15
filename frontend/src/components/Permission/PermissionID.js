import React, {useEffect, useState} from 'react'
import { Table, Row, Col, OverlayTrigger, Tooltip, Container } from 'react-bootstrap'
import Create from './components/PermissionApi'
import api from '../../api/metabaseApi'
import { tableHeader, table2Header, table1Row, tableRow } from '../customStyle/PermissionColor'
import { AiFillFolder } from 'react-icons/ai'
import {TiTick} from 'react-icons/ti'
import { ImCross } from 'react-icons/im'
import {Link} from 'react-router-dom'
import {AiOutlineConsoleSql} from 'react-icons/ai'
import Breadcrumbs from './components/Breadcrumbs'
import ApiLoader from '../Loader/ApiLoader'

function PermissionID(props) {
    const { match } = props
    const [permissionGraph, setPermissionGraph] = useState()
    const [schema, setSchema] = useState([])
    const [load, setLoad] = useState(false)
    const [dataName, setDataName] = useState([])


    const click = (e) => {
        console.log(e.target.id)
    }

    useEffect(() => {
        setLoad(true)
        Create.CallData(setPermissionGraph, setLoad)
        api.databaseListID(match.params.id)
            .then(res => {
                setDataName(res.data)
            })
            .catch(error => {
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

    return (
        <Container fluid>
            {load?
                <ApiLoader apiload={load} />
                :
                <>
                <Breadcrumbs b={dataName.name} id={dataName.id} active={true}/>
                {permissionGraph !== undefined ?
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
                            {schema.map(x => (
                                <tr key={x}>
                                    <td style={{...table1Row, width: "250px"}}>
                                        <Row>
                                            <Col md="1">
                                                <AiFillFolder id="data" />
                                            </Col>
                                            <Col md="6">
                                                <span style={{fontWeight: 700, }}> {x}</span>
                                                <br/>
                                                <Link to={`/permission/${dataName.id}/schemas/${x}/tables`} id="links" style={{ color: 'rgb(120, 144, 156)', fontWeight: 400, fontSize: '14px'}}>View Tables</Link>
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
                    :
                    <>
                    </>
                }
                </>
            }
        </Container>
    )
}

export default PermissionID
