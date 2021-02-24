import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import { Line, LineChart ,Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function MemberOverview(){

    const [overview,setOverview] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/members/overview")
            .then(res => {
                setOverview(res.data)
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
                            <Breadcrumb.Item active>Team Members Overview</Breadcrumb.Item>
                        </Breadcrumb>
                        <BarChart margin={{left:25}} layout="vertical" width={1300} height={450} data={overview}>
                            <CartesianGrid vertical={true} horizontal={false} />
                            <XAxis tick={{ fontWeight:"bold" }} stroke="white" type="number" dataKey="exectime"/>
                            <YAxis tick={{ fontWeight:"bold" }} stroke="white" type="category" dataKey="user" />
                            <Tooltip />
                            <Bar dataKey="exectime" fill="#8884d8" />
                        </BarChart>  
                        <br />
                        <LineChart margin={{left:25}} width={1300} height={450} data={overview}>
                            <CartesianGrid  />
                            <XAxis tick={{ fontWeight:"bold" }} stroke="white" type="category" dataKey="user"/>
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="exectime" fill="#8884d8" />
                        </LineChart>   
                    </Col>
                </Row>  
            </Container> 
            
        </div>
    )
}

export default MemberOverview
