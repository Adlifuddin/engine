import React,{useState, useEffect} from 'react'
import { Row, Col, Table, Card } from 'react-bootstrap'
import { Line, LineChart , ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import moment from 'moment'
import Loading from '../../Loader/Loading'
import { CardHeaderColor, CardColor, colors } from '../../customStyle/DatabaseColor'
import { titleHeadingColor, titleRowColor } from '../../customStyle/TableColor'
import api from '../../../api/index'
import Audit from '../Audit'

function DashboardOverview(){
    const [mostpopular, setMostpopular] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        api.dashboardsMostPopular()
            .then(res => {
                setMostpopular(res.data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(true)
                console.log(err)
            })

    }, [])


    const [mostcommon, setMostCommon] = useState([])
    const [commonLoading, setCommonLoading] = useState(true)

    useEffect(() => {
        setCommonLoading(true)
        api.dashboardsCommon()
            .then(res => {
                setMostCommon(res.data)
                setCommonLoading(false)
            })
            .catch(err => {
                console.log(err)
                setCommonLoading(true)
            })

    }, [])

    const [viewsnsaved, setViewsnsaved] = useState([])
    const [viewLoading, setViewLoading] = useState(true)

    useEffect(() => {
        setViewLoading(true)
        api.dashboardsSaved()
            .then(res => {
                setViewsnsaved(res.data)
                setViewLoading(false)
            })
            .catch(err => {
                setViewLoading(true)
                console.log(err)
            })

    }, [])

    const formatXAxis = (tickItem) => {
        tickItem = moment(tickItem).format("DD MMM YY")
        return tickItem
    }

   
    
    return(
        <Audit b="Dashboards Overview">
            <Row>
                <Col>
                    <Card style={CardColor}>
                        {!viewLoading ?
                            <Card.Header style={{...CardHeaderColor, fontWeight: 'bold'}}>
                                Dashboard Views and Saved
                            </Card.Header>
                            :
                            <></>
                        }
                        <Card.Body>
                            {viewLoading ?
                                <Loading />
                                :
                                <ResponsiveContainer width="99%" height={250}>
                                    <LineChart margin={{bottom: 30}} data={viewsnsaved}>
                                        <CartesianGrid strokeDasharray="3 3"  vertical={false}  />
                                        <XAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="category" dataKey="date" label={{ value: "Day",fill:"black", dy: 25}} tickFormatter={formatXAxis}/>
                                        <YAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="number" dataKey="count" label={{ value: "Views & Saved Dashboard", fill:"black", angle:270, dx:-25}} />
                                        <Tooltip />
                                        <Line type="linear" dataKey="count" strokeWidth={2} stroke={colors[3]} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card style={CardColor}>
                        {!loading ?
                            <Card.Header style={{...CardHeaderColor, fontWeight: 'bold'}}>
                                Most popular dashboards & average loading times
                            </Card.Header>
                            :
                            <></>
                        }
                        <Card.Body>
                            {loading?
                                <Loading />
                                :
                                <Table hover borderless>
                                    <thead>
                                        <tr>
                                            <th style={titleHeadingColor}>Dashboards</th>
                                            <th style={titleHeadingColor}>Views</th>
                                            <th style={titleHeadingColor}>Avg.Question Load Time(ms)</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                    {mostpopular.map(mostpopular => (
                                        <tr key={mostpopular.id}>
                                            <td style={titleRowColor}>{mostpopular.dashboard}</td>
                                            <td style={titleRowColor}>{mostpopular.views}</td>
                                            <td style={titleRowColor}>{mostpopular.avgrunningtime}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table> 
                            }
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card style={CardColor}>
                        {!commonLoading ?
                            <Card.Header style={{...CardHeaderColor, fontWeight: 'bold'}}>
                                Questions included the most in dashboards
                            </Card.Header>
                            :
                            <></>
                        }
                        <Card.Body>
                            {commonLoading ?
                                <Loading />
                                :
                                <Table borderless hover>
                                    <thead>
                                        <tr>
                                            <th style={titleHeadingColor}>Card</th>
                                            <th style={titleHeadingColor}>Count</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                    {mostcommon.map(mostcommon => (
                                        <tr key={mostcommon.id}>
                                            <td style={titleRowColor}>{mostcommon.card}</td>
                                            <td style={titleRowColor}>{mostcommon.count}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Audit>
    )
}

export default DashboardOverview