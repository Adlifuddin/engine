import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import { Line, LineChart , ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


function DashboardOverview(){
    const [mostpopular,setMostpopular] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/dashboards/mostpopular")
            .then(res => {
                setMostpopular(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    const [mostcommon,setMostCommon] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/dashboards/commonquestion")
            .then(res => {
                setMostCommon(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const [viewsnsaved,setViewsnsaved] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/dashboards/viewsnsaved")
            .then(res => {
                setViewsnsaved(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const formatXAxis = (tickItem) => {
        tickItem = new Date(tickItem).toLocaleDateString()
        return tickItem
    }

   
    
    return(
        <div>
            <Container fluid>
                <Row>
                    <Col style={{marginLeft:"0px"}}>
                        <SideBar />
                    </Col>
                    <Col style={{marginTop:"10px", marginRight:"50px"}} xs lg={9}>  
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Audit</Breadcrumb.Item>
                            <Breadcrumb.Item active>Dashboards Overview</Breadcrumb.Item>
                        </Breadcrumb> 
                        <Row>
                            <Col style={{backgroundColor:"rgb(255, 255, 255, 0.75)", marginBottom:"10px", borderRadius:"5px"}} fluid>
                                <h4 style={{color:"black", fontWeight:"bold", marginBottom:"10px", marginTop:"10px"}}>Dashboard Views and Saved</h4>
                                <ResponsiveContainer width="90%" height={250}>
                                    <LineChart margin={{left:100,right:20, bottom:40}} data={viewsnsaved}>
                                        <CartesianGrid stroke="#545454" vertical={false}  />
                                        <XAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="category" dataKey="date" label={{ value: "Day",fill:"black", dy: 25}} tickFormatter={formatXAxis}/>
                                        <YAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="number" dataKey="count" label={{ value: "views & saved dashboard",fill:"black", angle:270, dx:-25}} />
                                        <Tooltip />                                  
                                        <Line type="linear" dataKey="count" strokeWidth={2} stroke="#0000b3" dot={false} />
                                    </LineChart>   
                                </ResponsiveContainer>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{backgroundColor:"rgb(255, 255, 255, 0.75)", marginRight:'10px', borderRadius:"5px"}} fluid>
                                <h4 style={{color:"black", fontWeight:"bold", marginBottom:"20px", marginTop:"10px"}}>Most popular dashboards & average loading times</h4>
                                <Table striped bordered hover variant="light" size="sm">
                                    <thead>
                                        <tr>
                                            <th>Dashboards</th>
                                            <th>Views</th>
                                            <th>Avg.Question Load Time(ms)</th>  
                                        </tr>
                                    </thead>
                                    {mostpopular.map(mostpopular => (
                                        <tbody key={mostpopular.id}>
                                            <tr>
                                                <td>{mostpopular.dashboard}</td>
                                                <td>{mostpopular.views}</td>
                                                <td>{mostpopular.avgrunningtime}</td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </Table> 
                            </Col>

                            <Col style={{backgroundColor:"rgb(255, 255, 255, 0.75)",borderRadius:"5px"}} fluid>
                                <h4 style={{color:"black", fontWeight:"bold", marginBottom:"20px", marginTop:"10px"}}>Questions included the most in dashboards</h4>
                                <Table striped bordered hover variant="light" size="sm">
                                    <thead>
                                        <tr>
                                            <th>Card</th>
                                            <th>Count</th>
                                        </tr>
                                    </thead>
                                    {mostcommon.map(mostcommon => (
                                        <tbody key={mostcommon.id}>
                                            <tr>
                                                <td>{mostcommon.card}</td>
                                                <td>{mostcommon.count}</td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </Table> 
                            </Col>
                        </Row>
                    </Col>
                </Row>  
            </Container>      
        </div>
    )
}

export default DashboardOverview