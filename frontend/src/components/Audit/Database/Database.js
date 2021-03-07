import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar'
import ApiLoader from '../../Loader/ApiLoader'



function DatabaseAudit(){
    const [loading,setLoading] = useState(false)
    const [databaseAudit,setDatabase] = useState([])

    useEffect(() => {
        setLoading(true)
        axios
            .get("http://localhost:5000/api/audit/databases")
            .then(res => {
                setDatabase(res.data)
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
                            <Breadcrumb.Item active>Databases</Breadcrumb.Item>
                        </Breadcrumb>
                        {loading === true ? <ApiLoader apiload={loading}/> :
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Schema</th>
                                    <th>Table</th>
                                    <th>Added On</th>   
                                </tr>
                            </thead>
                            {databaseAudit.map(databaseAudit => (
                                <tbody key={databaseAudit.id}>
                                    <tr>
                                        <td>{databaseAudit.name}</td>
                                        <td>{databaseAudit.schema}</td>
                                        <td>{databaseAudit.table}</td>
                                        <td>{databaseAudit.created_at}</td>
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

export default DatabaseAudit