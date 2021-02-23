import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';


function Tables(){
    const [tables,setTables] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/tables")
            .then(res => {
                console.log(res.data)
                setTables(res.data)
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
                            <Breadcrumb.Item active>Tables</Breadcrumb.Item>
                        </Breadcrumb>
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Database</th>
                                    <th>Schema</th>
                                    <th>Table in Database</th>
                                    <th>Table Display Name</th>   
                                </tr>
                            </thead>
                            {tables.map(table => (
                                <tbody key={table.id}>
                                    <tr>
                                        <td>{table.db_name}</td>
                                        <td>{table.schema}</td>
                                        <td>{table.table_name}</td>
                                        <td>{table.display_name}</td>
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

export default Tables