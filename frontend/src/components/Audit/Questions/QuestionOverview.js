import React,{useState, useEffect} from 'react'
import {  Row, Col, Card } from 'react-bootstrap'
import { ResponsiveContainer ,Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Loading from '../../Loader/Loading'
import { CardHeaderColor, CardColor, colors } from '../../customStyle/DatabaseColor'
import api from '../../../api/index'
import Audit from '../Audit';

function QuestionOverview(){

    const [popularqueries, setPopularqueries] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        api.questionsPopularQueries()
            .then(res => {
                setPopularqueries(res.data)
                setLoading(false)
            })
            .catch(err => {
                setLoading(true)
                console.log(err)
            })

    }, [])

    const [slowestqueries, setSlowestqueries] = useState([])
    const [slowLoading, setSlowLoading] = useState(true)

    useEffect(() => {
        setSlowLoading(true)
        api.questionSlowestQueries()
            .then(res => {
                setSlowestqueries(res.data)
                setSlowLoading(false)
            })
            .catch(err => {
                setSlowLoading(true)
                console.log(err)
            })

    }, [])


    

    return (
        <Audit b="Questions Overview">
            <Row>
                <Col>
                    <Card style={CardColor}>
                        {!loading?
                            <Card.Header style={{...CardHeaderColor, fontWeight: 'bold'}}>
                                Most Popular Queries
                            </Card.Header>
                            :
                            <></>
                        }
                        <Card.Body>
                            {loading ?
                                <Loading />
                                :
                                <ResponsiveContainer width="99%" height={670}>
                                    <BarChart margin={{left:10, top:15}} layout="vertical" data={popularqueries}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} />
                                        <XAxis tick={{ fontWeight:"bold" }} stroke="black" type="number" dataKey="executions"/>
                                        <YAxis tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="black" type="category" dataKey="card" />
                                        <Tooltip />
                                        <Bar dataKey="executions" fill={colors[1]} />
                                    </BarChart>  
                                </ResponsiveContainer>
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={CardColor}>
                        {!slowLoading ?
                            <Card.Header style={{...CardHeaderColor, fontWeight: 'bold'}}>
                                Slowest Queries
                            </Card.Header>
                            :
                            <></>
                        }
                        <Card.Body>
                            {slowLoading ?
                                <Loading />
                                :
                                <ResponsiveContainer width="99%" height={670}>
                                    <BarChart margin={{left:10, top:15}} layout="vertical" data={slowestqueries}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} />
                                        <XAxis tick={{ fontWeight:"bold" }} stroke="black" type="number" dataKey="avgrunningtime"/>
                                        <YAxis tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="black" type="category" dataKey="card" />
                                        <Tooltip />
                                        <Bar dataKey="avgrunningtime" fill={colors[2]} />
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

export default QuestionOverview
