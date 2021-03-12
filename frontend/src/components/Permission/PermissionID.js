import React, {useEffect, useState} from 'react'
import { Table, Row, Col } from 'react-bootstrap'
import Create from './components/PermissionApi'
import api from '../../api/metabaseApi'
import { tableHeader, table2Header, table1Row, tableRow } from '../customStyle/PermissionColor'
import { AiFillFolder } from 'react-icons/ai'
import {Link} from 'react-router-dom'
import Breadcrumbs from './components/Breadcrumbs'
function PermissionID(props) {
    const {match, location} = props
    const [permissionGraph, setPermissionGraph] = useState()
    const [schema, setSchema] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
        Create.CallData(setPermissionGraph, setLoad)
        api.databaseListID(match.params.id)
            .then(res => {
                console.log(res.data)
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
        <div>
            {console.log(props)}
            <Breadcrumbs />
            {permissionGraph !== undefined ?
                <Table>
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
                        {schema.map(x => (
                            <tr>
                                <td style={{...table1Row, width: "250px"}}>
                                    <Row>
                                        <Col md="1">
                                            <AiFillFolder id="data" />
                                        </Col>
                                        <Col md="6">
                                            <span style={{fontWeight: 700, }}> {x}</span>
                                            <br/>
                                            <Link to={{pathname:`#`}} id="links" style={{ color: 'rgb(120, 144, 156)', fontWeight: 400, fontSize: '14px'}}>View Tables</Link>
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                :
                <>
                </>
            }
        </div>
    )
}

export default PermissionID
