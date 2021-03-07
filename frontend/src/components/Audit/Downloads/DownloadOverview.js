import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import { ResponsiveContainer, Scatter, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip , Bar, BarChart} from 'recharts';

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

    const [downloadperSize,setDownloadPerSize] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/downloads/downloadpersize")
            .then(res => {
                setDownloadPerSize(res.data)
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
                    <SideBar />
                    <Col style={{marginTop:"10px", marginLeft:"100px"}} xs lg={9}>  
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Audit</Breadcrumb.Item>
                            <Breadcrumb.Item active>Downloads Overview</Breadcrumb.Item>
                        </Breadcrumb>
                        <Row>
                            <Col style={{backgroundColor:"rgb(240, 240, 245, 0.75)", marginBottom:"10px", borderRadius:"5px"}} fluid>
                                <h4 style={{color:"black", fontWeight:"bold", marginBottom:"10px", marginTop:"10px"}}>Largest downloads in the last 30 days</h4>
                                <ResponsiveContainer width="99%" height={300}>
                                    <ScatterChart margin={{ top: 20, right: 20, bottom: 30, left: 50 }}>
                                        <CartesianGrid stroke="#545454" />
                                        <XAxis type="category" tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" dataKey="date" label={{ value: "Day",fill:"black", dy: 25}} tickFormatter={formatAxis} />
                                        <YAxis type="number" tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" dataKey="rows" label={{ value: "Rows in Query",fill:"black", angle:270, dx:-25}} />
                                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                        <Scatter data={download} fill="red" r={250}  />
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </Col>
                        </Row>  
                        <Row>
                            <Col style={{backgroundColor:"rgb(240, 240, 245, 0.75)", marginRight:'10px', marginBottom:"10px", borderRadius:"5px"}} fluid>
                                <h4 style={{color:"black", fontWeight:"bold", marginBottom:"10px", marginTop:"10px"}}>Downloads Per User</h4>
                                <ResponsiveContainer width="90%" height={280}>
                                    <BarChart margin={{left:50, bottom: 30}} layout="vertical"  data={downloadperUser}>
                                        <CartesianGrid stroke="#545454" vertical={true} horizontal={false} />
                                        <XAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="number" dataKey="count" allowDecimals={false} label={{ value: "Download",fill:"black", dy: 25}} />
                                        <YAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="category" dataKey="name" label={{ value: "User",fill:"black", angle:270, dx:-60}} />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#009933" />
                                    </BarChart>  
                                </ResponsiveContainer>
                            </Col>

                            <Col style={{backgroundColor:"rgb(240, 240, 245, 0.75)", marginBottom:"10px", borderRadius:"5px"}} fluid>
                                <h4 style={{color:"black", fontWeight:"bold", marginBottom:"10px", marginTop:"10px"}}>Downloads Per Size</h4>
                                <ResponsiveContainer width="90%" height={280}>
                                    <BarChart margin={{left:50, bottom: 30}} layout="horizontal" width={500} height={280} data={downloadperSize}>
                                        <CartesianGrid stroke="#545454" vertical={false} horizontal={true} />
                                        <XAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="category" dataKey="rows"  label={{ value: "Rows Downloaded",fill:"black", dy: 25}} />
                                        <YAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="number" dataKey="download" allowDecimals={false} label={{ value: "Downloads",fill:"black", angle:270, dx:-35}} />
                                        <Tooltip />
                                        <Bar dataKey="download" fill="#730099" />
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

export default DownloadOverview
