import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar'
import ApiLoader from '../../Loader/ApiLoader'


function Questions(){
    const [loading,setLoading] = useState(false)
    const [question,setDatabase] = useState([])

    useEffect(() => {
        setLoading(true)
        axios
            .get("http://localhost:5000/api/audit/questions")
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
                    <Col style={{marginLeft:"0px"}}>
                        <SideBar />
                    </Col>
                    <Col style={{marginTop:"10px", marginRight:"50px"}} xs lg={9}>  
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Audit</Breadcrumb.Item>
                            <Breadcrumb.Item active>Questions</Breadcrumb.Item>
                        </Breadcrumb>
                        {loading === true ? <ApiLoader apiload={loading}/> :
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Collection</th>
                                    <th>Database</th>
                                    <th>Table</th>
                                    <th>Created By</th>
                                    <th>Public Link</th>
                                    <th>Cache TTL</th>
                                    <th>Views</th>   
                                </tr>
                            </thead>
                            {question.map(question => (
                                <tbody key={question.id}>
                                    <tr>
                                        <td>{question.name}</td>
                                        <td>{question.collection}</td>
                                        <td>{question.database}</td>
                                        <td>{question.table}</td>
                                        <td>{question.created}</td>
                                        <td>{question.publicLink}</td>
                                        <td>{question.cacheTTL}</td>
                                        <td>{question.views}</td>
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

export default Questions