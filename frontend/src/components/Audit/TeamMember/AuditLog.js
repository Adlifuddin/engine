import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar'
import ApiLoader from '../../Loader/ApiLoader'



function AuditLog(){
    const [loading,setLoading] = useState(false)
    const [logs,setLogs] = useState([])

    useEffect(() => {
        setLoading(true)
        axios
            .get("http://localhost:5000/api/audit/members/log")
            .then(res => {
                setLogs(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

   
    
    return(
        <div>
            <Container fluid>
                <Row> 
                    <SideBar />
                    <Col style={{marginTop:"10px", marginLeft:"100px"}} xs lg={9}>  
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Audit</Breadcrumb.Item>
                            <Breadcrumb.Item active>Logs</Breadcrumb.Item>
                        </Breadcrumb>
                        {loading === true ? <ApiLoader apiload={loading} /> :
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Query</th>
                                    <th>Viewed By</th>
                                    <th>Type</th>
                                    <th>Source DB</th>
                                    <th>Table</th>
                                    <th>Collection</th>    
                                    <th>Viewed On</th>   
                                </tr>
                            </thead>
                            {logs.map((log,index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{log.query}</td>
                                        <td>{log.viewedby}</td>
                                        {log.type === true ? <td>Native</td> : <td>GUI</td>}
                                        <td>{log.sourcedb}</td>
                                        <td>{log.table}</td> 
                                        <td>{log.collection}</td>
                                        <td>{log.viewedon}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>}
                    </Col>
                </Row>  
            </Container>      
        </div>
    )
}

export default AuditLog