import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import { Line, LineChart ,Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function QuestionOverview(){

    const [popularqueries,setPopularqueries] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/questions/popularqueries")
            .then(res => {
                setPopularqueries(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const [slowestqueries,setSlowestqueries] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/questions/slowestqueries")
            .then(res => {
                setSlowestqueries(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col style={{marginLeft:"0px"}}>
                        <SideBar />
                    </Col>
                    <Col style={{marginTop:"10px", marginRight:"50px"}} xs lg={9}>  
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Audit</Breadcrumb.Item>
                            <Breadcrumb.Item active>Questions Overview</Breadcrumb.Item>
                        </Breadcrumb>
                        <Row>
                            <Col>
                                <h3 style={{color:"white",marginBottom:"20px"}}>Most Popular Queries</h3>
                                <BarChart margin={{left:100,top:15}} layout="vertical" width={600} height={680} data={popularqueries}>
                                    <CartesianGrid vertical={true} horizontal={false} />
                                    <XAxis tick={{ fontWeight:"bold" }} stroke="white" type="number" dataKey="executions"/>
                                    <YAxis tick={{ fontSize:"9px",fontWeight:"bold" }} stroke="white" type="category" dataKey="card" />
                                    <Tooltip />
                                    <Bar dataKey="executions" fill="#8884d8" />
                                </BarChart>  
                            </Col>

                            <Col>
                                <h3 style={{color:"white",marginBottom:"20px"}}>Slowest Queries</h3>
                                <BarChart margin={{left:100,top:15}} layout="vertical" width={600} height={680} data={slowestqueries}>
                                    <CartesianGrid vertical={true} horizontal={false} />
                                    <XAxis tick={{ fontWeight:"bold" }} stroke="white" type="number" dataKey="avgrunningtime"/>
                                    <YAxis tick={{ fontSize:"8px",fontWeight:"bold" }} stroke="white" type="category" dataKey="card" />
                                    <Tooltip />
                                    <Bar dataKey="avgrunningtime" fill="#8884d8" />
                                </BarChart>  
                            </Col>
                        </Row>
                    </Col>
                </Row>  
            </Container> 
            
        </div>
    )
}

export default QuestionOverview
