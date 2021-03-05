import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import { ResponsiveContainer, Line, LineChart ,Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

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


    const [mostCreated,setmostCreated] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/members/mostCreated")
            .then(res => {
                setmostCreated(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    const formatXAxis = (tickItem) => {
        tickItem = new Date(tickItem).toLocaleDateString()
        return tickItem
    }

    const formatTime = (Item) => {
        Item = Math.round(Item/60000)
        return Item
    }


    const [activennew,setactivenew] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/members/activennew")
            .then(res => {
                setactivenew(res.data)
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
                        <Row>
                            <Col style={{backgroundColor:"rgb(255, 255, 255, 0.75)", borderRadius:"5px"}}>
                                <h4 style={{color:"black", fontWeight:"bold", marginBottom:"20px", marginTop:"10px"}}>Active and New User</h4>
                                <ResponsiveContainer width="95%" height={250}>
                                    <LineChart margin={{left:100,right:20, bottom:40}} data={activennew}>
                                        <CartesianGrid stroke="#545454" vertical={false}  />
                                        <XAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="category" dataKey="date" label={{ value: "Day",fill:"black", dy: 25}} tickFormatter={formatXAxis}/>
                                        <YAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="number" dataKey="active" label={{ value: "active and new users",fill:"black", angle:270, dx:-25}} />
                                        <Tooltip />                                  
                                        <Line type="linear" dataKey="active" strokeWidth={2} stroke="#0000b3" dot={false} />
                                    </LineChart>   
                                </ResponsiveContainer>
                            </Col>
                        </Row>
                        <Row style={{marginTop:"10px"}}>
                            <Col style={{backgroundColor:"rgb(255, 255, 255, 0.75)", borderRadius:"5px", marginRight:"10px"}}>
                                <h4 style={{color:"black", fontWeight:"bold", marginBottom:"20px", marginTop:"10px"}}>Most active user</h4>
                                <ResponsiveContainer width="90%" height={360}>
                                    <BarChart margin={{left:100, bottom:40}} layout="vertical" width={600} height={360} data={overview}>
                                        <CartesianGrid stroke="#545454" vertical={true} horizontal={false} />
                                        <XAxis tick={{ fontSize:"12px", fontWeight:"bold" }} stroke="black" type="number" allowDecimals={false} dataKey="exectime" label={{ value: "Total execution time (minutes)",fill:"black", dy: 25}} />
                                        <YAxis tick={{ fontSize:"10px", fontWeight:"bold" }} stroke="black" type="category" dataKey="user" />
                                        <Tooltip />
                                        <Bar dataKey="exectime" fill="#009933" />
                                    </BarChart> 
                                </ResponsiveContainer>
                            </Col>

                            <Col style={{backgroundColor:"rgb(255, 255, 255, 0.75)", borderRadius:"5px"}}>
                                <h4 style={{color:"black", fontWeight:"bold", marginBottom:"20px", marginTop:"10px"}}>Members who are creating most things</h4>
                                <ResponsiveContainer width="90%" height={360}>
                                    <BarChart margin={{left:100, bottom:40}} layout="vertical" width={600} height={360} data={mostCreated}>
                                        <CartesianGrid vertical={true} horizontal={false} />
                                        <XAxis tick={{ fontSize:"12px", fontWeight:"bold" }} stroke="black" type="number" dataKey="total" label={{ value: "Total",fill:"black", dy: 25}} />
                                        <YAxis tick={{ fontSize:"10px", fontWeight:"bold" }} stroke="black" type="category" dataKey="name" />
                                        <Tooltip />
                                        <Bar dataKey="total" fill="#730099" />
                                    </BarChart> 
                                </ResponsiveContainer>
                            </Col>
                        </Row>
                    </Col>
                </Row>  
            </Container> 
            
        </div>
    )
}

export default MemberOverview
