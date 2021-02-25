import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import { Line, LineChart ,Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function DatabaseOverview(){

    const [queriesnavgexec,setQueriesnavgexec] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/databases/queriesnavgexec")
            .then(res => {
                setQueriesnavgexec(res.data)
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
                            <Breadcrumb.Item active>Database Overview</Breadcrumb.Item>
                        </Breadcrumb>
                        <Row>
                            <Col>
                                <h3 style={{color:"white",marginBottom:"20px"}}>Total Queries And Their Average Speed</h3>
                                <BarChart margin={{left:150}} layout="horizontal" width={600} height={600} data={queriesnavgexec}>
                                    <CartesianGrid vertical={false} horizontal={true} />
                                    <XAxis tick={{ fontWeight:"bold" }} stroke="white" type="category" dataKey="db"/>
                                    <YAxis tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="white" type="number" dataKey="queries" />
                                    <YAxis tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="white" type="number" dataKey="avgexectime" />
                                    <Tooltip />
                                    <Bar dataKey="queries" fill="#54C571" />
                                    <Bar dataKey="avgexectime" fill="#8884d8" />
                                </BarChart>  
                            </Col>
                        </Row>
                    </Col>
                </Row>  
            </Container> 
            
        </div>
    )
}

export default DatabaseOverview
