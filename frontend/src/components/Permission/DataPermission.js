import React, { useEffect, useState } from 'react'
import { Row, Col, OverlayTrigger, Tooltip, Table} from 'react-bootstrap'
import { FcDatabase } from 'react-icons/fc'
import {TiTick} from 'react-icons/ti'
import { ImCross } from 'react-icons/im'
import {AiOutlineConsoleSql} from 'react-icons/ai'
import ApiLoader from '../Loader/ApiLoader'
import {tableHeader, table2Header, table1Row, tableRow} from '../customStyle/PermissionColor'
import Create from './components/PermissionApi'
import {Link} from 'react-router-dom'

function DataPermission() {
    const [permissionGraph, setPermissionGraph] = useState()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
        Create.CallData(setPermissionGraph, setLoad)
    }, [])

    const click = (e) => {
        console.log(e.target.id)
    }

    return (
        <div>
            {load?
                <ApiLoader apiload={load} />
                :
                permissionGraph !== undefined ?
                    <Table borderless>
                        <thead>
                            <tr>
                                <th style={tableHeader}></th>
                                <th style={{textAlign: 'center', ...tableHeader}} colSpan="2">Analyst</th>
                                <th style={{textAlign: 'center', ...tableHeader}} colSpan="2">Architect</th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <th style={tableHeader}></th>
                                <th style={{...table2Header, borderTopLeftRadius: "1em"}}>DATA ACCESS</th>
                                <th style={table2Header}>SQL QUERIES</th>
                                <th style={table2Header}>DATA ACCESS</th>
                                <th style={{...table2Header, borderTopRightRadius: "1em"}}>SQL QUERIES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(permissionGraph).map(x => (
                                <tr key={permissionGraph[x].id}>
                                    <td style={{...table1Row, width: "250px"}}>
                                        <Row>
                                            <Col md="1">
                                                <FcDatabase id="data" />
                                            </Col>
                                            <Col md="6">
                                                <span style={{fontWeight: 700, }}> {permissionGraph[x].name}</span>
                                                <br/>
                                                <Link to={`permission/${permissionGraph[x].id}`} id="links" style={{ color: 'rgb(120, 144, 156)', fontWeight: 400, fontSize: '14px'}}>Your Schemas</Link>
                                            </Col>
                                        </Row>
                                    </td>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{permissionGraph[x].Analyst.native === 'none' ? "No access" : "Unrestricted Access"}</Tooltip>}>
                                        <td onClick={click} 
                                            id={`native${permissionGraph[x].Analyst.native}`} 
                                            style={tableRow}>
                                            {permissionGraph[x].Analyst.native=== 'none'? 
                                                <ImCross id={`nativecross`}/> 
                                                : 
                                                <TiTick id={`nativetick`}/>
                                            }
                                        </td>
                                    </OverlayTrigger>
        
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{permissionGraph[x].Analyst.schemas === 'none' ? "No access" : "Can write raw queries"}</Tooltip>}>
                                        <td onClick={click}
                                            id={`schemas${permissionGraph[x].Analyst.schemas}`}
                                            style={{...tableRow, borderLeft: "1px solid #dee2e6"}}>
                                            {permissionGraph[x].Analyst.schemas=== 'none'? 
                                                <ImCross id={`schemacross`}/> 
                                                : 
                                                <AiOutlineConsoleSql id={`schemastick`}/>
                                            }
                                        </td>
                                    </OverlayTrigger>
                                    
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{permissionGraph[x].Architect.native === 'none' ? "No access" : "Unrestricted Access"}</Tooltip>}>
                                        <td id={`native${permissionGraph[x].Architect.native}`}
                                            style={{...tableRow, borderRight: "1px solid #dee2e6", borderLeft: "1px solid rgb(184, 187, 195)"}}>
                                        {permissionGraph[x].Architect.native === 'none' ?
                                            <ImCross id={`nativecross`}/> 
                                            : 
                                                <TiTick id={`nativetick`} />}
                                        </td>
                                    </OverlayTrigger>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled"> {permissionGraph[x].Architect.schemas === 'none' ? "No access" : "Can write raw queries"}</Tooltip>}>
                                        <td id={`schemas${permissionGraph[x].Architect.schemas}`}
                                            style={{ ...tableRow, borderRight: "1px solid rgb(184, 187, 195)" }}>
                                            
                                                {permissionGraph[x].Architect.schemas === 'none' ?
                                                <ImCross id={`schemacross`}/> 
                                                : 
                                                <AiOutlineConsoleSql id={`schemastick`} />}
                                        </td>
                                    </OverlayTrigger>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    :
                    <></>
            }
        </div>
    )
}

export default DataPermission
