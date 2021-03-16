import React,{useState, useEffect} from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { ResponsiveContainer ,Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Loading from '../../Loader/Loading'
import { CardHeaderColor, CardColor, colors } from '../../customStyle/DatabaseColor'
import api from '../../../api/index';
import Audit from '../Audit';

function TableOverview(){

    const [mostQueried, setmostQueried] = useState([])
    const [mostQueriedLoading, setmostQueriedLoading] = useState(true)

    useEffect(() => {
        setmostQueriedLoading(true)
        api.tablesMostQueried()
            .then(res => {
                setmostQueried(res.data)
                setmostQueriedLoading(false)
            })
            .catch(err => {
                setmostQueriedLoading(true)
                console.log(err)
            })

    }, [])

    const [leastQueried, setleastQueried] = useState([])
    const [leastQueriedLoading, setleastQueriedLoading] = useState(true)

    useEffect(() => {
        setleastQueriedLoading(true)
        api.tableLeastQueried()
            .then(res => {
                setleastQueried(res.data)
                setleastQueriedLoading(false)
            })
            .catch(err => {
                setleastQueriedLoading(true)
                console.log(err)
            })

    }, [])


    

    return (
        <Audit b="Tables Overview">
            <Row>
                <Col>
                    <Card style={CardColor}>
                        {!mostQueriedLoading?
                            <Card.Header style={{ ...CardHeaderColor, fontWeight: 'bold'}}>
                                Most-queried tables
                            </Card.Header>
                            :
                            <></>
                        }
                        <Card.Body>
                            {mostQueriedLoading ?
                                <Loading />
                                :
                                <ResponsiveContainer width="99%" height={630}>
                                    <BarChart margin={{left:80,top:15}} layout="vertical" data={mostQueried}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} />
                                        <XAxis tick={{ fontWeight:"bold" }} stroke="black" type="number" dataKey="exec"/>
                                        <YAxis tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="black" type="category" dataKey="tables" />
                                        <Tooltip />
                                        <Bar dataKey="exec" fill={colors[1]} />
                                    </BarChart>  
                                </ResponsiveContainer>
                            }
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={CardColor}>
                        {!leastQueriedLoading ?
                            <Card.Header style={{...CardHeaderColor, fontWeight: "bold"}}>
                                Least-queried tables
                            </Card.Header>
                            :
                            <></>
                        }
                        <Card.Body>
                            {leastQueriedLoading ?
                                <Loading/>
                                :
                                <ResponsiveContainer width="99%" height={630}>
                                    <BarChart margin={{left:80,top:15}} layout="vertical" data={leastQueried}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={false} />
                                        <XAxis tick={{ fontWeight:"bold" }} stroke="black" type="number" dataKey="exec"/>
                                        <YAxis tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="black" type="category" dataKey="tables" />
                                        <Tooltip />
                                        <Bar dataKey="exec" fill={colors[2]}/>
                                    </BarChart>  
                                </ResponsiveContainer>
                            }
                        </Card.Body>
                    </Card>
                    <h4 style={{color:"black", fontWeight:"bold", marginBottom:"20px", marginTop:"10px"}}></h4>
                </Col>
            </Row>
        </Audit>
    )
}

export default TableOverview
