import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar'
import ApiLoader from '../../Loader/ApiLoader'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import { titleHeadingColor, titleRowColor} from '../../customStyle/TableColor'

function Dashboards(){
    const [loading,setLoading] = useState(false)
    const [dashboard,setDatabase] = useState([])

    useEffect(() => {
        setLoading(true)
        axios
            .get("http://localhost:5000/api/audit/dashboards")
            .then(res => {
                setDatabase(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

   
    
    return(
        <div>
            <Container fluid>
                <Row>
                    <SideBar />
                    <Col>
                        <Breadcrumbs b="Dashboards"/>
                        {loading === true ? <ApiLoader apiload={loading}/> : 
                        <Table hover borderless>
                            <thead>
                                <tr>
                                    <th style={titleHeadingColor} >Title</th>
                                    <th style={titleHeadingColor}>Total Views</th>
                                    <th style={titleHeadingColor}>Avg.exec.time(ms)</th>
                                    <th style={titleHeadingColor}>Cards</th>
                                    <th style={titleHeadingColor}>Saved By</th>
                                    <th style={titleHeadingColor}>Public Link</th>
                                    <th style={titleHeadingColor}>Saved on</th>
                                    <th style={titleHeadingColor}>Last edited on</th>   
                                </tr>
                            </thead>
                            <tbody >
                            {dashboard.map(dashboard => (
                                    <tr key={dashboard.id}>
                                        <td style={titleRowColor}>{dashboard.name}</td>
                                        <td style={titleRowColor}>{dashboard.views}</td>
                                        <td style={titleRowColor}>{dashboard.exectime}</td>
                                        <td style={titleRowColor}>{dashboard.cards}</td>
                                        <td style={titleRowColor}>{dashboard.creator}</td>
                                        <td style={titleRowColor}>{dashboard.publicLink}</td>
                                        <td style={titleRowColor}>{dashboard.created}</td>
                                        <td style={titleRowColor}>{dashboard.updated}</td>
                                    </tr>
                            ))}
                            </tbody>
                        </Table> }
                    </Col>
                </Row>  
            </Container>      
        </div>
    )
}

export default Dashboards