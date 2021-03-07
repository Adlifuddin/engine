import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import { ResponsiveContainer ,Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function SchemaOverview(){

    const [mostQueried,setmostQueried] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/schemas/mostqueried")
            .then(res => {
                setmostQueried(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const [slowestSchema,setslowestSchema] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/schemas/slowestschema")
            .then(res => {
                setslowestSchema(res.data)
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
                            <Breadcrumb.Item href="/">Schemas</Breadcrumb.Item>
                            <Breadcrumb.Item active>Schemas Overview</Breadcrumb.Item>
                        </Breadcrumb>
                        <Row>
                            <Col style={{backgroundColor:"rgb(240, 240, 245, 0.75)", borderRadius:"5px", marginRight:"10px"}} fluid>
                                <h4 style={{color:"black", fontWeight:"bold", marginBottom:"20px", marginTop:"10px"}}>Most-queried schemas</h4>
                                <ResponsiveContainer width="90%" height={600}>
                                    <BarChart margin={{left:100}} layout="vertical" data={mostQueried}>
                                        <CartesianGrid stroke="#545454" vertical={true} horizontal={false} />
                                        <XAxis tick={{ fontWeight:"bold" }} stroke="black" type="number" dataKey="exec"/>
                                        <YAxis tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="black" type="category" dataKey="schema" />
                                        <Tooltip />
                                        <Bar dataKey="exec" fill="#009933" />
                                    </BarChart>  
                                </ResponsiveContainer>
                            </Col>

                            <Col style={{backgroundColor:"rgb(240, 240, 245, 0.75)", borderRadius:"5px"}} fluid>
                                <h4 style={{color:"black", fontWeight:"bold", marginBottom:"20px", marginTop:"10px"}}>Slowest schemas</h4>
                                <ResponsiveContainer width="90%" height={600}>
                                    <BarChart margin={{left:100}} layout="vertical" data={slowestSchema}>
                                        <CartesianGrid stroke="#545454" vertical={true} horizontal={false} />
                                        <XAxis tick={{ fontWeight:"bold" }} stroke="black" type="number" dataKey="avgexec"/>
                                        <YAxis tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="black" type="category" dataKey="schema" />
                                        <Tooltip />
                                        <Bar dataKey="avgexec" fill="#730099" />
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

export default SchemaOverview
