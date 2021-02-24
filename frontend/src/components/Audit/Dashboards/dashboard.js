import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar'
import ApiLoader from '../../Loader/ApiLoader'


function Dashboards(){
    const [loading,setLoading] = useState(false)
    const [dashboard,setDatabase] = useState([])

    useEffect(() => {
        setLoading(true)
        axios
            .get("http://localhost:5000/api/audit/dashboard")
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
                            <Breadcrumb.Item active>Dashboards</Breadcrumb.Item>
                        </Breadcrumb>
                        {loading === true ? <ApiLoader apiload={loading}/> : 
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Total Views</th>
                                    <th>Avg.exec.time(ms)</th>
                                    <th>Cards</th>
                                    <th>Saved By</th>
                                    <th>Public Link</th>
                                    <th>Saved on</th>
                                    <th>Last edited on</th>   
                                </tr>
                            </thead>
                            {dashboard.map(dashboard => (
                                <tbody key={dashboard.id}>
                                    <tr>
                                        <td>{dashboard.name}</td>
                                        <td>{dashboard.views}</td>
                                        <td>{dashboard.exectime}</td>
                                        <td>{dashboard.cards}</td>
                                        <td>{dashboard.creator}</td>
                                        <td>{dashboard.publicLink}</td>
                                        <td>{dashboard.created}</td>
                                        <td>{dashboard.updated}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table> }
                    </Col>
                </Row>  
            </Container>      
        </div>
    )
}

export default Dashboards