import React,{useState, useEffect} from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { ResponsiveContainer ,Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Loading from '../../Loader/Loading'
import { CardHeaderColor, CardColor, colors } from '../../customStyle/DatabaseColor'
import api from '../../../api/index'
import Audit from '../Audit';

function SchemaOverview(){

    const [mostQueried, setmostQueried] = useState([])
    const [mostQueriedLoading, setmostQueriedLoading] = useState(true)

    useEffect(() => {
        setmostQueriedLoading(true)
        api.schemasMostQueried()
            .then(res => {
                setmostQueried(res.data)
                setmostQueriedLoading(false)
            })
            .catch(err => {
                setmostQueriedLoading(true)
                console.log(err)
            })

    }, [])

    const [slowestSchema, setslowestSchema] = useState([])
    const [slowestSchemaLoading, setslowestSchemaLoading] = useState(true)

    useEffect(() => {
        setslowestSchemaLoading(true)
        api.schemasSlowestQueried()
            .then(res => {
                setslowestSchema(res.data)
                setslowestSchemaLoading(false)
            })
            .catch(err => {
                setslowestSchemaLoading(true)
                console.log(err)
            })

    }, [])


    

    return (
        <Audit b="Schemas Overview">
            <Row>
                <Col>
                    <Card style={CardColor}>
                        {!mostQueriedLoading ?
                            <Card.Header style={{...CardHeaderColor, fontWeight: 'bold'}}>
                                Most-queried schemas
                            </Card.Header>
                            :
                            <></>
                        }
                        <Card.Body>
                            {mostQueriedLoading ?
                                <Loading />
                                :
                                <ResponsiveContainer width="99%" height={600}>
                                    <BarChart layout="vertical" data={mostQueried}>
                                        <CartesianGrid stroke="#545454" vertical={true} horizontal={false} />
                                        <XAxis tick={{ fontWeight:"bold" }} stroke="black" type="number" dataKey="exec"/>
                                        <YAxis tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="black" type="category" dataKey="schema" />
                                        <Tooltip />
                                        <Bar dataKey="exec" fill={colors[1]} />
                                    </BarChart>  
                                </ResponsiveContainer>
                            }
                        </Card.Body>
                    </Card>
                    <h4 style={{color:"black", fontWeight:"bold", marginBottom:"20px", marginTop:"10px"}}></h4>
                    
                </Col>

                <Col>
                    <Card style={CardColor}>
                        {!slowestSchemaLoading?
                            <Card.Header style={{...CardHeaderColor, fontWeight: 'bold'}}>Slowest schemas</Card.Header>
                            :
                            <></>
                        }
                        <Card.Body>
                            {slowestSchemaLoading?
                                <Loading />
                                :
                                <ResponsiveContainer width="99%" height={600}>
                                    <BarChart layout="vertical" data={slowestSchema}>
                                        <CartesianGrid stroke="#545454" vertical={true} horizontal={false} />
                                        <XAxis tick={{ fontWeight:"bold" }} stroke="black" type="number" dataKey="avgexec"/>
                                        <YAxis tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="black" type="category" dataKey="schema" />
                                        <Tooltip />
                                        <Bar dataKey="avgexec" fill={colors[3]} />
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

export default SchemaOverview
