import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import { Line, LineChart ,Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

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
                    <Col style={{marginLeft:"0px"}}>
                        <SideBar />
                    </Col>
                    <Col style={{marginTop:"10px", marginRight:"50px"}} xs lg={9}>  
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Schemas</Breadcrumb.Item>
                            <Breadcrumb.Item active>Schemas Overview</Breadcrumb.Item>
                        </Breadcrumb>
                        <Row>
                            <Col>
                                <h3 style={{color:"white",marginBottom:"20px"}}>Most-queried schemas</h3>
                                <BarChart margin={{left:150}} layout="vertical" width={600} height={600} data={mostQueried}>
                                    <CartesianGrid vertical={true} horizontal={false} />
                                    <XAxis tick={{ fontWeight:"bold" }} stroke="white" type="number" dataKey="exec"/>
                                    <YAxis tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="white" type="category" dataKey="schema" />
                                    <Tooltip />
                                    <Bar dataKey="exec" fill="#8884d8" />
                                </BarChart>  
                            </Col>

                            <Col>
                                <h3 style={{color:"white",marginBottom:"20px"}}>Slowest schemas</h3>
                                <BarChart margin={{left:150}} layout="vertical" width={600} height={600} data={slowestSchema}>
                                    <CartesianGrid vertical={true} horizontal={false} />
                                    <XAxis tick={{ fontWeight:"bold" }} stroke="white" type="number" dataKey="avgexec"/>
                                    <YAxis tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="white" type="category" dataKey="schema" />
                                    <Tooltip />
                                    <Bar dataKey="avgexec" fill="#8884d8" />
                                </BarChart>  
                            </Col>
                        </Row>
                    </Col>
                </Row>  
            </Container> 
            
        </div>
    )
}

export default SchemaOverview
