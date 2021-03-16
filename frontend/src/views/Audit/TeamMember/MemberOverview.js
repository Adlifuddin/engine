import React,{useState, useEffect} from 'react'
import {  Row, Col, Card } from 'react-bootstrap'
import { ResponsiveContainer, Line, LineChart ,Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import moment from 'moment'
import Loading from '../../../components/Loader/Loading'
import { CardHeaderColor, CardColor, colors } from '../../../components/customStyle/DatabaseColor'
import api from '../../../api/index'
import Audit from '../Audit';

function MemberOverview(){

    const [overview, setOverview] = useState([])
    const [overviewLoading,setOverviewLoading] = useState(true)

    useEffect(() => {
        setOverviewLoading(true)
        api.memberOverview()
            .then(res => {
                setOverview(res.data)
                setOverviewLoading(false)
            })
            .catch(err => {
                setOverviewLoading(true)
                console.log(err)
            })

    }, [])


    const [mostCreated, setmostCreated] = useState([])
    const [mostCreatedLoading,setMostCreatedLoading] = useState(true)

    useEffect(() => {
        setMostCreatedLoading(true)
        api.memberMostCreated()
            .then(res => {
                setmostCreated(res.data)
                setMostCreatedLoading(false)
            })
            .catch(err => {
                setMostCreatedLoading(true)
                console.log(err)
            })

    }, [])


    const formatXAxis = (tickItem) => {
        tickItem = moment(tickItem).format("DD MMM YY");
        return tickItem
    }

    const formatTime = (Item) => {
        Item = Math.round(Item/60000)
        return Item
    }


    const [activennew, setactivenew] = useState([])
    const [activenNewLoading,setActivenNewLoading] = useState(true)


    useEffect(() => {
        setActivenNewLoading(true)
        api.memberActiveNNew()
            .then(res => {
                setactivenew(res.data)
                setActivenNewLoading(false)
            })
            .catch(err => {
                console.log(err)
                setActivenNewLoading(true)
            })

    }, [])

    return (
        <Audit b="Team Members Overview">
            <Row>
                <Col>
                    <Card style={CardColor}>
                        {!overviewLoading ?
                            <Card.Header style={{ ...CardHeaderColor, fontWeight: 'bold' }}>Active and New User</Card.Header>
                            :
                            <></>
                        }
                    <Card.Body>
                    {overviewLoading ?
                        <Loading />
                        :
                        <ResponsiveContainer width="99%" height={250}>
                            <LineChart margin={{bottom: 30}} data={activennew}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false}  />
                                <XAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="category" dataKey="date" label={{ value: "Day",fill:"black", dy: 25}} tickFormatter={formatXAxis}/>
                                <YAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="number" dataKey="active" label={{ value: "Active and New Users",fill:"black", angle:270, dx:-25}} />
                                <Tooltip labelFormatter={formatXAxis}/>
                                <Line type="linear" dataKey="active" strokeWidth={2} stroke={colors[0]} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    }
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row style={{marginTop:"10px"}}>
                <Col>
                    <Card style={CardColor}>
                        {!mostCreatedLoading?
                            <Card.Header style={{ ...CardHeaderColor, fontWeight: 'bold' }}>Most active user</Card.Header>
                            :
                            <></>
                        }
                        <Card.Body>
                            {mostCreatedLoading ?
                                <Loading />
                                :
                                <ResponsiveContainer width="99%" height={360}>
                                    <BarChart layout="vertical" width={600} height={360} data={overview}>
                                        <CartesianGrid stroke="#545454" vertical={true} horizontal={false} />
                                        <XAxis tick={{ fontSize:"12px", fontWeight:"bold" }} stroke="black" type="number" allowDecimals={false} dataKey="exectime" label={{ value: "Total execution time (minutes)",fill:"black", dy: 25}} />
                                        <YAxis tick={{ fontSize:"10px", fontWeight:"bold" }} stroke="black" type="category" dataKey="user" />
                                        <Tooltip />
                                        <Bar dataKey="exectime" fill={colors[9]} />
                                    </BarChart> 
                                </ResponsiveContainer>
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={CardColor}>
                        {!activenNewLoading?
                            <Card.Header style={{ ...CardHeaderColor, fontWeight: 'bold' }}>Members who are creating most things</Card.Header>
                            :
                            <></>
                        }
                        <Card.Body>
                            {activenNewLoading ?
                                <Loading />
                                :
                                <ResponsiveContainer width="99%" height={360}>
                                    <BarChart layout="vertical" width={600} height={360} data={mostCreated}>
                                        <CartesianGrid vertical={true} horizontal={false} />
                                        <XAxis tick={{ fontSize:"12px", fontWeight:"bold" }} stroke="black" type="number" dataKey="total" label={{ value: "Total",fill:"black", dy: 25}} />
                                        <YAxis tick={{ fontSize:"10px", fontWeight:"bold" }} stroke="black" type="category" dataKey="name" />
                                        <Tooltip />
                                        <Bar dataKey="total" fill={colors[7]} />
                                    </BarChart> 
                                </ResponsiveContainer>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Audit>
    )
}

export default MemberOverview
