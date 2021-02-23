import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';


function Downloads(){
    const [download,setDatabase] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/download")
            .then(res => {
                console.log(res.data)
                setDatabase(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

   
    
    return(
        <div>
            <Container fluid>
                <Row>
                    <Col style={{marginLeft:"0px"}}>
                        <SideBar />
                    </Col>
                    <Col style={{marginTop:"10px", marginRight:"50px"}} xs lg={9}>  
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Audit</Breadcrumb.Item>
                            <Breadcrumb.Item active>Downloads</Breadcrumb.Item>
                        </Breadcrumb>
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Downloaded At</th>
                                    <th>Rows Downloaded</th>
                                    <th>Query</th>
                                    <th>Query Type</th>
                                    <th>Database</th>
                                    <th>Source Table</th>
                                    <th>User</th>
                                </tr>
                            </thead>
                            {download.map(download => (
                                <tbody key={download.id}>
                                    <tr>
                                        <td>{download.downloadat}</td>
                                        <td>{download.rowsdownloaded}</td>
                                        <td>{download.query}</td>
                                        {download.type === true ? <td>Native</td> : <td>GUI</td>}
                                        <td>{download.sourcedatabases}</td>
                                        <td>{download.tables}</td>
                                        <td>{download.user}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>
                    </Col>
                </Row>  
            </Container>      
        </div>
    )
}

export default Downloads