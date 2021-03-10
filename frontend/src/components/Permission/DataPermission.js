import React, { useEffect, useState } from 'react'
import api from '../../api/metabaseApi'
import { Row, Col, Tab, Table} from 'react-bootstrap'
import { FcDatabase } from 'react-icons/fc'
import {TiTick} from 'react-icons/ti'
import { ImCross } from 'react-icons/im'
import {AiOutlineConsoleSql} from 'react-icons/ai'
import ApiLoader from '../Loader/ApiLoader'

function DataPermission() {
    const [databaseTable, setDatabaseTable] = useState([])
    const [permissionGraph, setPermissionGraph] = useState()
    const [permissionGroup, setPermissionGroup] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
        async function CallData() {
            await api.databaseTables()
                .then(res => {
                    setDatabaseTable(res.data)
                    api.getPermissionGroup()
                        .then(response => {
                            const data = response.data
                            const filters = data.filter(x => (x.id !== 1) && (x.id !== 2))
                            setPermissionGroup(filters)
                            api.getPermissionGraph()
                                .then(responses => {
                                    const datas = responses.data.groups
                                    var file = {}
                                    var analyst = {}
                                    Object.keys(datas[2]).forEach(e => {
                                        analyst[e] = { native: "none", schemas: "none" }
                                    })
                                    filters.forEach(x => {
                                        if (x.name === 'Analyst') {
                                            file["Analyst"] = datas[x.id]
                                        } else if (x.name === 'Architect') {
                                            file["Architect"] = datas[x.id]
                                        }
                                    })
                                    file.Analyst = analyst
                                    var files = {}
                                    res.data.forEach(x => {
                                        files[x.name] = {
                                            Analyst: {
                                                ...file.Analyst[x.id],
                                            },
                                            Architect: {
                                                ...file.Architect[x.id],
                                            },
                                            ...x
                                        }
                                    })
                                    setPermissionGraph(files)
                                    setLoad(false)
                                })
                                .catch(error => {
                                    console.log(error)
                                })

                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
        }

        CallData()

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
                    <Table>
                        <thead>
                            <tr>
                                <th style={{borderTop: 'transparent', borderBottom: 'transparent'}}></th>
                                <th style={{textAlign: 'right', borderTop: 'transparent', borderBottom: 'transparent'}}>Analyst</th>
                                <th style={{borderTop: 'transparent', borderBottom: 'transparent'}}></th>
                                <th style={{textAlign: 'right', borderTop: 'transparent', borderBottom: 'transparent'}}>Architect</th>
                                <th style={{borderTop: 'transparent', borderBottom: 'transparent'}}></th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <th style={{borderTop: 'transparent', borderBottom: 'transparent'}}></th>
                                <th style={{borderLeft: "1px solid #dee2e6", textAlign: 'center'}}>DATA ACCESS</th>
                                <th style={{borderLeft: "1px solid #dee2e6",  textAlign: 'center'}}>SQL QUERIES</th>
                                <th style={{borderLeft: "1px solid #dee2e6",  textAlign: 'center'}}>DATA ACCESS</th>
                                <th style={{borderLeft: "1px solid #dee2e6", borderRight: "1px solid #dee2e6", textAlign: 'center'}}>SQL QUERIES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(permissionGraph).map(x => (
                                <tr key={permissionGraph[x].id}>
                                    <td style={{borderTop: 'transparent', borderBottom: 'transparent', borderRight: "1px solid #dee2e6"}}>
                                        <span><FcDatabase /> {permissionGraph[x].name}</span>
                                        <br/>
                                        <a href="#">Your Schemas</a>
                                    </td>
                                    <td 
                                    onClick={click} 
                                    id={`native${permissionGraph[x].Analyst.native}`} 
                                    style={{borderRight: "1px solid #dee2e6", borderBottom: "1px solid #dee2e6", textAlign: 'center'}}>
                                        {permissionGraph[x].Analyst.native=== 'none'? 
                                            <ImCross id={`nativecross`}/> 
                                            : 
                                            <TiTick id={`nativetick`}/>
                                        }
                                    </td>
                                    <td onClick={click} id={`schemas${permissionGraph[x].Analyst.schemas}`} style={{borderRight: "1px solid #dee2e6", borderBottom: "1px solid #dee2e6", textAlign: 'center'}}>
                                        {permissionGraph[x].Analyst.schemas=== 'none'? 
                                            <ImCross id={`schemacross`}/> 
                                            : 
                                            <AiOutlineConsoleSql id={`schemastick`}/>
                                        }
                                    </td>
                                    <td id={`native${permissionGraph[x].Architect.native}`}  style={{borderRight: "1px solid #dee2e6", borderBottom: "1px solid #dee2e6", textAlign: 'center'}}>{permissionGraph[x].Architect.native=== 'none'? 
                                            <ImCross id={`nativecross`}/> 
                                            : 
                                            <TiTick id={`nativetick`}/>}</td>
                                    <td id={`schemas${permissionGraph[x].Architect.schemas}`} style={{borderRight: "1px solid #dee2e6", borderBottom: "1px solid #dee2e6", textAlign: 'center'}}>{permissionGraph[x].Architect.schemas=== 'none'? 
                                            <ImCross id={`schemacross`}/> 
                                            : 
                                            <AiOutlineConsoleSql id={`schemastick`}/>}</td>
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
