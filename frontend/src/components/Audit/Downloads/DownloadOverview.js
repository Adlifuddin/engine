import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import { Legend, Scatter, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip , Bar, BarChart} from 'recharts';

function DownloadOverview(){

    const [download,setDownload] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/downloads/overview")
            .then(res => {
                setDownload(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const [downloadperUser,setDownloadPerUser] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/downloads/downloadperuser")
            .then(res => {
                setDownloadPerUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const formatAxis = (tickItem) => {
        tickItem = new Date(tickItem).toLocaleDateString()
        return tickItem
    }
    
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
                            <Breadcrumb.Item active>Downloads Overview</Breadcrumb.Item>
                        </Breadcrumb>
                        <Row>
                            <Col>
                                <h3 style={{color:"white",marginBottom:"20px"}}>Largest downloads in the last 30 days</h3>
                                <ScatterChart width={1200} height={300} margin={{ top: 20, right: 20, bottom: 30, left: 150 }}>
                                    <CartesianGrid  />
                                    <XAxis type="category" tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="white" dataKey="date" label={{ value: "Day",fill:"white", dy: 25}} tickFormatter={formatAxis} />
                                    <YAxis type="number" tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="white" dataKey="rows" label={{ value: "Rows in Query",fill:"white", angle:270, dx:-25}} />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter data={download} fill="red" r={250}  />
                                </ScatterChart>
                            </Col>

                            <Col>
                                <h3 style={{color:"white",marginBottom:"20px"}}>Downloads Per User</h3>
                                <BarChart margin={{left:150, bottom: 30}} layout="vertical" width={600} height={300} data={downloadperUser}>
                                    <CartesianGrid vertical={true} horizontal={false} />
                                    <XAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="white" type="number" dataKey="count" allowDecimals={false} label={{ value: "Download",fill:"white", dy: 25}} />
                                    <YAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="white" type="category" dataKey="name" label={{ value: "User",fill:"white", angle:270, dx:-35}} />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#8884d8" />
                                </BarChart>  
                            </Col>

                        </Row>  
                    </Col>
                </Row>  
            </Container> 
            
        </div>
    )
}

export default DownloadOverview
