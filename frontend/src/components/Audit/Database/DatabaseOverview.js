import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Tab, Tabs, Card, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import { Legend, Line, LineChart ,Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function DatabaseOverview(){

    const [queriesnavgexec,setQueriesnavgexec] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/databases/queriesnavgexec")
            .then(res => {
                setQueriesnavgexec(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const [query,setQuery] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/databases/queries")
            .then(res => {
                setQuery(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const formatXAxis = (tickItem) => {
        tickItem = new Date(tickItem).toLocaleDateString()
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
                    <Col style={{marginTop:"10px", marginLeft:"100px"}} xs lg={9}>  
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Audit</Breadcrumb.Item>
                            <Breadcrumb.Item active>Databases Overview</Breadcrumb.Item>
                        </Breadcrumb>
                        <Row>
                            <Col style={{backgroundColor:"rgb(240, 240, 245, 0.75)", borderRadius:"5px", marginBottom:"20px"}} fluid>
                                <h4 style={{color:"black", fontWeight:"bold", marginBottom:"20px", marginTop:"10px"}}>Total queries & average speed</h4>
                                <ResponsiveContainer width="95%" height={300}>
                                    <BarChart margin={{left:80,right:20, bottom:40}} layout="horizontal" data={queriesnavgexec}>
                                        <CartesianGrid stroke="#545454" vertical={false} horizontal={true} />
                                        <XAxis tick={{ fontSize:"11.5px",fontWeight:"bold" }} stroke="black" type="category" dataKey="db" label={{ value: "Database",fill:"black", dy: 25}}/>
                                        <YAxis yAxisId="left" tick={{ fontSize:"11.5px",fontWeight:"bold" }} stroke="black" type="number" dataKey="queries" label={{ value: "Queries",fill:"black", angle:270, dx:-25}} />
                                        <YAxis yAxisId="right" orientation='right' tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="black" type="number" dataKey="avgexectime" label={{ value: "Avg. Running Time (ms)",fill:"black", angle:90, dx:25}} />
                                        <Tooltip />
                                        <Legend verticalAlign="top" height={30} />
                                        <Bar yAxisId="left" dataKey="queries" fill="#009933" />
                                        <Bar yAxisId="right" dataKey="avgexectime" fill="#730099" />
                                    </BarChart>  
                                </ResponsiveContainer>   
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{backgroundColor:"rgb(240, 240, 245, 0.75)", borderRadius:"5px"}} fluid>
                                <h4 style={{color:"black", fontWeight:"bold", marginBottom:"20px", marginTop:"10px"}}>Queries per database each day</h4>
                                <Tabs  id="uncontrolled-tab">
                                    <Tab style={{Textcolor:"white"}} eventKey="all" title="All">
                                        <ResponsiveContainer width="95%" height={280}>
                                            <LineChart margin={{left:50,right:20, bottom:40}} data={query}>
                                                <CartesianGrid stroke="#545454" vertical={false}  />
                                                <XAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="category" dataKey="date" label={{ value: "Day",fill:"black", dy: 25}} tickFormatter={formatXAxis}/>
                                                <YAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="number" dataKey="queries" label={{ value: "Total Query",fill:"black", angle:270, dx:-25}} />
                                                <Tooltip />                                  
                                                <Line type="linear" dataKey="queries" strokeWidth={2} stroke="#0000b3" dot={false} />
                                            </LineChart> 
                                        </ResponsiveContainer>
                                    </Tab> 
                                    {uniqueValues.map((value, index) => (
                                        <Tab eventKey={value} title={value}>
                                            <ResponsiveContainer width="95%" height={280}>
                                                <LineChart key={index} margin={{left:50,right:20, bottom:40}} data={filtering(query,value)}>
                                                    <CartesianGrid vertical={false}  />
                                                    <XAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="category" dataKey="date" label={{ value: "Day",fill:"black", dy: 25}} tickFormatter={formatXAxis}/>
                                                    <YAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="black" type="number" dataKey="queries" label={{ value: "Total Query",fill:"black", angle:270, dx:-25}} />
                                                    <Tooltip />                                  
                                                    <Line type="linear" dataKey="queries" strokeWidth={2} stroke="#0000b3" dot={false} />
                                                </LineChart>   
                                            </ResponsiveContainer>
                                        </Tab>  
                                    ))}
                                </Tabs>  
                      
                            </Col>

                        </Row>
                    </Col>
                </Row>  
            </Container> 
            
        </div>
    )
}

export default DatabaseOverview
