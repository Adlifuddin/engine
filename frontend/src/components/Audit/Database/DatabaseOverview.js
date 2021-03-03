import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, ButtonGroup, ToggleButton, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar';
import { Legend, Line, LineChart ,Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

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
                    <Col style={{marginLeft:"0px"}}>
                        <SideBar />
                    </Col>
                    <Col style={{marginTop:"10px", marginRight:"50px"}} xs lg={9}>  
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Audit</Breadcrumb.Item>
                            <Breadcrumb.Item active>Databases Overview</Breadcrumb.Item>
                        </Breadcrumb>
                        <Row>
                            <Col>
                                <h3 style={{color:"white",marginBottom:"20px"}}>Total Queries And Their Average Speed</h3>
                                <BarChart margin={{left:150,right:20, bottom:40}} layout="horizontal" width={1200} height={300} data={queriesnavgexec}>
                                    <CartesianGrid vertical={false} horizontal={true} />
                                    <XAxis tick={{ fontSize:"11.5px",fontWeight:"bold" }} stroke="white" type="category" dataKey="db" label={{ value: "Database",fill:"white", dy: 25}}/>
                                    <YAxis yAxisId="left" tick={{ fontSize:"11.5px",fontWeight:"bold" }} stroke="white" type="number" dataKey="queries" label={{ value: "Queries",fill:"white", angle:270, dx:-25}} />
                                    <YAxis yAxisId="right" orientation='right' tick={{ fontSize:"10.5px",fontWeight:"bold" }} stroke="white" type="number" dataKey="avgexectime" label={{ value: "Avg. Running Time (ms)",fill:"white", angle:90, dx:25}} />
                                    <Tooltip />
                                    <Legend verticalAlign="top" height={30} />
                                    <Bar yAxisId="left" dataKey="queries" fill="#54C571" />
                                    <Bar yAxisId="right" dataKey="avgexectime" fill="#8884d8" />
                                </BarChart>  
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3 style={{color:"white",marginBottom:"20px"}}>Queries per database each day</h3>
                                
                                {uniqueValues.map((value, index) => (
                                    <div>
                                        <ButtonGroup toggle className="mb-2">
                                            <ToggleButton
                                            type="checkbox"
                                            variant="secondary"
                                            checked={null}
                                            value="1"
                                            onClick={(e) => setChecked(!checked)}
                                            >
                                            {value !== null && value}
                                            </ToggleButton>
                                        </ButtonGroup>

                                        <LineChart key={index} margin={{left:150,right:20, bottom:40}} width={1200} height={300} data={filtering(query,value)}>
                                            <CartesianGrid vertical={false}  />
                                            <XAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="white" type="category" dataKey="date" label={{ value: "Day",fill:"white", dy: 25}} tickFormatter={formatXAxis}/>
                                            <YAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="white" type="number" dataKey="queries" label={{ value: "Total Query",fill:"white", angle:270, dx:-25}} />
                                            <Tooltip />                                  
                                            <Line type="linear" dataKey="queries" strokeWidth={2} fill="#8884d8" dot={false} />
                                        </LineChart>   
                                    </div>
                                    
                                ))}
                                <LineChart margin={{left:150,right:20, bottom:40}} width={1200} height={300} data={query}>
                                    <CartesianGrid vertical={false}  />
                                    <XAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="white" type="category" dataKey="date" label={{ value: "Day",fill:"white", dy: 25}} tickFormatter={formatXAxis}/>
                                    <YAxis tick={{ fontSize:"12px",fontWeight:"bold" }} stroke="white" type="number" dataKey="queries" label={{ value: "Total Query",fill:"white", angle:270, dx:-25}} />
                                    <Tooltip />                                  
                                    <Line type="linear" dataKey="queries" strokeWidth={2} fill="#8884d8" dot={false} />
                                </LineChart>   
                            </Col>
                        </Row>
                    </Col>
                </Row>  
            </Container> 
            
        </div>
    )
}

export default DatabaseOverview
