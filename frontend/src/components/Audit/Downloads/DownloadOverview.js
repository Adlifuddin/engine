import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Card } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import { ResponsiveContainer, Scatter, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip , Bar, BarChart} from 'recharts';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import moment from 'moment'
import Loading from '../../Loader/Loading'
import { CardHeaderColor, CardColor, colors } from '../../customStyle/DatabaseColor'

function DownloadOverview(){

    const [download, setDownload] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        axios
            .get("http://localhost:5000/api/audit/downloads/overview")
            .then(res => {
                setDownload(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(true)
            })

    }, [])

    const [downloadperUser, setDownloadPerUser] = useState([])
    const [userLoading, setUserLoading] = useState(true)

    useEffect(() => {
        setUserLoading(true)
        axios
            .get("http://localhost:5000/api/audit/downloads/downloadperuser")
            .then(res => {
                setDownloadPerUser(res.data)
                setUserLoading(false)
            })
            .catch(err => {
                setUserLoading(true)
                console.log(err)
            })

    }, [])

    const [downloadperSize, setDownloadPerSize] = useState([])
    const [sizeLoading, setSizeLoading] = useState(true)

    useEffect(() => {
        setSizeLoading(true)
        axios
            .get("http://localhost:5000/api/audit/downloads/downloadpersize")
            .then(res => {
                setDownloadPerSize(res.data)
                setSizeLoading(false)
            })
            .catch(err => {
                setSizeLoading(true)
                console.log(err)
            })

    }, [])


    const formatAxis = (tickItem) => {
        tickItem = moment(tickItem).format("DD MMM YY")
        return tickItem
    }
    
    return (
        <div>
            <Container fluid>
                <Row>
                    <SideBar />
                    <Col>  
                        <Breadcrumbs b="Downloads Overview"/> 
                        <Row>
                            <Col>
                                <Card style={CardColor}>
                                    {!loading ?
                                        <Card.Header style={{...CardHeaderColor, fontWeight: 'bold'}}>
                                            Largest downloads in the last 30 days
                                        </Card.Header>
                                        :
                                        <></>
                                    }
                                    <Card.Body>
                                        {loading ?
                                            <Loading />
                                            :
                                            <ResponsiveContainer width="100%" height={300}>
                                                <ScatterChart margin={{ bottom: 30 }}>
                                                    <CartesianGrid strokeDasharray="3 3"  />
                                                    <XAxis type="category" tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" dataKey="date" label={{ value: "Day",fill:"black", dy: 25}} tickFormatter={formatAxis} />
                                                    <YAxis type="number" tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" dataKey="rows" label={{ value: "Rows in Query",fill:"black", angle:270, dx:-25}} />
                                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                                    <Scatter data={download} fill={colors[2]} r={250}  />
                                                </ScatterChart>
                                            </ResponsiveContainer>
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>  
                        <Row>
                            <Col>
                                {!userLoading ?
                                    <Card.Header style={{...CardHeaderColor, fontWeight: 'bold', marginTop: '20px'}}>
                                        Downloads Per User
                                    </Card.Header>
                                    :
                                    <></>
                                }
                                <Card.Body>
                                    {userLoading ?
                                        <Loading/>
                                        :
                                        <ResponsiveContainer width="100%" height={280}>
                                            <BarChart margin={{ bottom: 20}} layout="vertical"  data={downloadperUser}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} />
                                                <XAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="number" dataKey="count" allowDecimals={false} label={{ value: "Download",fill:"black", dy: 25}} />
                                                <YAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="category" dataKey="name" label={{ value: "User",fill:"black", angle:270, dx:-60}} />
                                                <Tooltip />
                                                <Bar dataKey="count" fill={colors[1]} />
                                            </BarChart>  
                                        </ResponsiveContainer>
                                    }
                                </Card.Body>
                            </Col>
                            <Col>
                                <Card style={CardColor}>
                                    {!sizeLoading ?
                                        <Card.Header style={{...CardHeaderColor, fontWeight: 'bold'}}>
                                            Downloads Per Size
                                        </Card.Header>
                                        :
                                        <></>
                                    }
                                    <Card.Body>
                                        {sizeLoading ?
                                            <Loading />
                                            :
                                            <ResponsiveContainer width="100%" height={280}>
                                                <BarChart margin={{bottom: 30}} layout="horizontal" width={500} height={280} data={downloadperSize}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={true} />
                                                    <XAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="category" dataKey="rows"  label={{ value: "Rows Downloaded",fill:"black", dy: 25}} />
                                                    <YAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="number" dataKey="download" allowDecimals={false} label={{ value: "Downloads",fill:"black", angle:270, dx:-35}} />
                                                    <Tooltip />
                                                    <Bar dataKey="download" fill={colors[0]} />
                                                </BarChart>  
                                            </ResponsiveContainer>
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>  
            </Container> 
            
        </div>
    )
}

export default DownloadOverview
