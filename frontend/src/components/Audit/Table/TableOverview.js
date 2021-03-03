import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import { Line, LineChart ,Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

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
                    <Col style={{marginLeft:"0px"}}>
                        <SideBar />
                    </Col>
                    <Col style={{marginTop:"10px", marginRight:"50px"}} xs lg={9}>  
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Tables</Breadcrumb.Item>
                            <Breadcrumb.Item active>Tables Overview</Breadcrumb.Item>
                        </Breadcrumb>
                        <Row>
                            <Col>
                                <h4 style={{color:"white",marginBottom:"20px"}}>Most-queried tables</h4>
                                <BarChart margin={{left:120}} layout="vertical" width={600} height={630} data={mostQueried}>
                                    <CartesianGrid vertical={true} horizontal={false} />
                                    <XAxis tick={{ fontWeight:"bold" }} stroke="white" type="number" dataKey="exec"/>
                                    <YAxis tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="white" type="category" dataKey="tables" />
                                    <Tooltip />
                                    <Bar dataKey="exec" fill="#8884d8" />
                                </BarChart>  
                            </Col>
                            <Col>
                                <h4 style={{color:"white",marginBottom:"20px"}}>Least-queried tables</h4>
                                <BarChart margin={{left:120}} layout="vertical" width={600} height={630} data={leastQueried}>
                                    <CartesianGrid vertical={true} horizontal={false} />
                                    <XAxis tick={{ fontWeight:"bold" }} stroke="white" type="number" dataKey="exec"/>
                                    <YAxis tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="white" type="category" dataKey="tables" />
                                    <Tooltip />
                                    <Bar dataKey="exec" fill="#8884d8" />
                                </BarChart>  
                            </Col>
                        </Row>                    
                    </Col>
                </Row>  
            </Container> 
            
        </div>
    )
}

export default TableOverview
