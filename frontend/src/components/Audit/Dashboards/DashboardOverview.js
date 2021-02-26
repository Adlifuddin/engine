import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import { Line, LineChart ,Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


function DashboardOverview(){
    const [mostpopular,setMostpopular] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/dashboards/mostpopular")
            .then(res => {
                setMostpopular(res.data)
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
                            <Breadcrumb.Item active>Dashboards Overview</Breadcrumb.Item>
                        </Breadcrumb>
                        <Row>
                            <Col>
                                <h5 style={{color:"white",marginBottom:"20px"}}>Most popular dashboards and their average loading times</h5>
                                <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Dashboards</th>
                                    <th>Views</th>
                                    <th>Avg.Question Load Time(ms)</th>  
                                </tr>
                            </thead>
                            {mostpopular.map(mostpopular => (
                                <tbody key={mostpopular.id}>
                                    <tr>
                                        <td>{mostpopular.dashboard}</td>
                                        <td>{mostpopular.views}</td>
                                        <td>{mostpopular.avgrunningtime}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table> 
                            </Col>
                        </Row>
                    </Col>
                </Row>  
            </Container>      
        </div>
    )
}

export default DashboardOverview