import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import { ResponsiveContainer ,Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function TableOverview(){

    const [mostQueried,setmostQueried] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/tables/mostqueried")
            .then(res => {
                setmostQueried(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const [leastQueried,setleastQueried] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/tables/leastqueried")
            .then(res => {
                setleastQueried(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    

    return (
        <div>
            <Container fluid>
                <Row>
                    <SideBar />
                    <Col style={{marginTop:"10px", marginLeft:"100px"}} xs lg={9}>  
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Tables</Breadcrumb.Item>
                            <Breadcrumb.Item active>Tables Overview</Breadcrumb.Item>
                        </Breadcrumb>
                        <Row>
                            <Col style={{backgroundColor:"rgb(240, 240, 245, 0.75)", borderRadius:"5px", marginRight:"10px"}} fluid>
                                <h4 style={{color:"black", fontWeight:"bold", marginBottom:"20px", marginTop:"10px"}}>Most-queried tables</h4>
                                <ResponsiveContainer width="90%" height={630}>
                                    <BarChart margin={{left:120,top:20}} layout="vertical" data={mostQueried}>
                                        <CartesianGrid stroke="#545454" vertical={true} horizontal={false} />
                                        <XAxis tick={{ fontWeight:"bold" }} stroke="black" type="number" dataKey="exec"/>
                                        <YAxis tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="black" type="category" dataKey="tables" />
                                        <Tooltip />
                                        <Bar dataKey="exec" fill="#009933" />
                                    </BarChart>  
                                </ResponsiveContainer>
                            </Col>
                            <Col style={{backgroundColor:"rgb(240, 240, 245, 0.75)", borderRadius:"5px", marginRight:"10px"}} fluid>
                                <h4 style={{color:"black", fontWeight:"bold", marginBottom:"20px", marginTop:"10px"}}>Least-queried tables</h4>
                                <ResponsiveContainer width="90%" height={630}>
                                    <BarChart margin={{left:120,top:20}} layout="vertical" data={leastQueried}>
                                        <CartesianGrid stroke="#545454" vertical={true} horizontal={false} />
                                        <XAxis tick={{ fontWeight:"bold" }} stroke="black" type="number" dataKey="exec"/>
                                        <YAxis tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="black" type="category" dataKey="tables" />
                                        <Tooltip />
                                        <Bar dataKey="exec" fill="#730099" />
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

export default TableOverview
