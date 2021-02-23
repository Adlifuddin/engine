import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';


function Schema(){
    const [schema,setDatabase] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/schemas")
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
                    <Col style={{marginTop:"10px", marginRight:"50px"}} xs lg={10}>  
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Audit</Breadcrumb.Item>
                            <Breadcrumb.Item active>Schema</Breadcrumb.Item>
                        </Breadcrumb>
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Schema</th>
                                    <th>Table</th>
                                    <th>Saved query</th>   
                                </tr>
                            </thead>
                            {schema.map(schema => (
                                <tbody key={schema.id}>
                                    <tr>
                                        <td>{schema.name}</td>
                                        <td>{schema.schema}</td>
                                        <td>{schema.table}</td>
                                        <td>{schema.query}</td>
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

export default Schema