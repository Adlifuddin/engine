import React,{useState, useEffect} from 'react'
import { Container, Row, Col, Tab, Tabs, Card } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import { Legend, Line, LineChart ,Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Loading from '../../Loader/Loading'
import { CardHeaderColor, CardColor, colors } from '../../customStyle/DatabaseColor'
import moment from 'moment'
import api from '../../../api/index'

function DatabaseOverview(){

    const [queriesnavgexec, setQueriesnavgexec] = useState([])
    
    const [queriesnavgexecLoading, setqueriesnavgexecLoading] = useState(true)
    useEffect(() => {
        setqueriesnavgexecLoading(true)
        api.databasesAvgExec()
            .then(res => {
                setQueriesnavgexec(res.data)
                setqueriesnavgexecLoading(false)
            })
            .catch(err => {
                console.log(err)
                setqueriesnavgexecLoading(true)
            })

    }, [])

    const [query, setQuery] = useState([])
    const [queryLoading, setQueryLoading] = useState(true)

    useEffect(() => {
        setQueryLoading(true)
        api.databasesQueries()
            .then(res => {
                setQuery(res.data)
                setQueryLoading(false)
            })
            .catch(err => {
                setQueryLoading(true)
                console.log(err)
            })

    }, [])

    const formatXAxis = (tickItem) => {
        tickItem = moment(tickItem).format("DD MMM YY")
        return tickItem
    }

    function getUniqueValue(data){
        const uniqueNames = []
        for( var i = 0; i< data.length; i++){    
            if(uniqueNames.indexOf(data[i].db) === -1){
                uniqueNames.push(data[i].db);        
            }        
        }
        return uniqueNames
    }

    const uniqueValues = getUniqueValue(query)

   function filtering(data, values){
        return data.filter(x => x.db == values)
   }
  
   function nestedFilter(filteredData){
       return filteredData.date
   }

   function nestedFilter(filteredData){
    return filteredData.db
   }
   const [checked, setChecked] = useState(false);

    return (
        <div>
            <Container fluid>
                <Row>
                    <SideBar />
                    <Col>  
                        <Breadcrumbs b="Databases Overview" />
                        <Row>
                            <Col>
                                <Card style={CardColor}>
                                    {!queriesnavgexecLoading?
                                        <Card.Header style={{ ...CardHeaderColor, fontWeight: 'bold' }}>
                                            Total queries & average speed
                                        </Card.Header>
                                        :
                                        <></>
                                    }
                                    <Card.Body>
                                        {queriesnavgexecLoading ?
                                            <Loading />
                                            :
                                            <ResponsiveContainer width="99%" height={300}>
                                                <BarChart margin={{bottom: 30}} layout="horizontal" data={queriesnavgexec}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={true} />
                                                    <XAxis tick={{ fontSize:"11.5px",fontWeight:"bold" }} stroke="black" type="category" dataKey="db" label={{ value: "Database",fill:"black", dy: 25}}/>
                                                    <YAxis yAxisId="left" tick={{ fontSize:"11.5px",fontWeight:"bold" }} stroke="black" type="number" dataKey="queries" label={{ value: "Queries",fill:"black", angle:270, dx:-25}} />
                                                    <YAxis yAxisId="right" orientation='right' tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="black" type="number" dataKey="avgexectime" label={{ value: "Avg. Running Time (ms)",fill:"black", angle:90, dx:25}} />
                                                    <Tooltip />
                                                    <Legend verticalAlign="top" height={30} />
                                                    <Bar yAxisId="left" dataKey="queries" fill={colors[3]} />
                                                    <Bar yAxisId="right" dataKey="avgexectime" fill={colors[2]} />
                                                </BarChart>
                                            </ResponsiveContainer>   
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card style={CardColor}>
                                    {!queryLoading ?
                                        <Card.Header style={{ ...CardHeaderColor, fontWeight: 'bold' }}>
                                            Queries per database each day
                                        </Card.Header>
                                        :
                                        <></>
                                    }
                                    <Card.Body>
                                        {queryLoading ?
                                            <Loading />
                                            :
                                            <Tabs  id="uncontrolled-tab">
                                                <Tab style={{Textcolor:"white", marginBottom: '100px'}} eventKey="all" title="All">
                                                    <ResponsiveContainer width="99%" height={280}>
                                                        <LineChart data={query}>
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false}  />
                                                            <XAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="category" dataKey='date' label={{ value: "Day",fill:"black", dy: 25}} tickFormatter={formatXAxis}/>
                                                            <YAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="number" dataKey="queries" label={{ value: "Total Query",fill:"black", angle:270, dx:-25}} />
                                                            <Tooltip labelFormatter={formatXAxis} />
                                                            <Line type="linear" dataKey="queries" strokeWidth={2} stroke={colors[0]} dot={false} />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </Tab> 
                                                {uniqueValues.map((value, index) => (
                                                    <Tab eventKey={value} title={value}>
                                                        <ResponsiveContainer width="99%" height={280}>
                                                            <LineChart key={index} data={filtering(query,value)}>
                                                                <CartesianGrid strokeDasharray="3 3" vertical={false}  />
                                                                <XAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="category" dataKey="date" label={{ value: "Day",fill:"black", dy: 25}} tickFormatter={formatXAxis}/>
                                                                <YAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="number" dataKey="queries" label={{ value: "Total Query",fill:"black", angle:270, dx:-25}} />
                                                                <Tooltip labelFormatter={formatXAxis}/>
                                                                <Line type="linear" dataKey="queries" strokeWidth={2} stroke={colors[index]} dot={false} />
                                                            </LineChart>   
                                                        </ResponsiveContainer>
                                                    </Tab>  
                                                ))}
                                            </Tabs> 
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

export default DatabaseOverview
