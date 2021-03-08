import React,{useState, useEffect} from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar'
import ApiLoader from '../../Loader/ApiLoader'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import { titleHeadingColor, titleRowColor } from '../../customStyle/TableColor'
import api from '../../../api/index'

function AuditLog(){
    const [loading,setLoading] = useState(false)
    const [logs,setLogs] = useState([])

    useEffect(() => {
        setLoading(true)
        api.memberLogs()
            .then(res => {
                setLogs(res.data)
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
                        <Breadcrumbs b="Logs"/>
                        {loading === true ? <ApiLoader apiload={loading} /> :
                        <Table hover borderless>
                            <thead>
                                <tr>
                                    <th style={titleHeadingColor}>Query</th>
                                    <th style={titleHeadingColor}>Viewed By</th>
                                    <th style={titleHeadingColor}>Type</th>
                                    <th style={titleHeadingColor}>Source DB</th>
                                    <th style={titleHeadingColor}>Table</th>
                                    <th style={titleHeadingColor}>Collection</th>    
                                    <th style={titleHeadingColor}>Viewed On</th>   
                                </tr>
                            </thead>
                            <tbody >
                                {logs.map((log,index) => (
                                    <tr key={index}>
                                        <td style={titleRowColor}>{log.query}</td>
                                        <td style={titleRowColor}>{log.viewedby}</td>
                                        {log.type === true ? <td style={titleRowColor}>Native</td> : <td style={titleRowColor}>GUI</td>}
                                        <td style={titleRowColor}>{log.sourcedb}</td>
                                        <td style={titleRowColor}>{log.table}</td> 
                                        <td style={titleRowColor}>{log.collection}</td>
                                        <td style={titleRowColor}>{log.viewedon}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>}
                    </Col>
                </Row>  
            </Container>      
        </div>
    )
}

export default AuditLog