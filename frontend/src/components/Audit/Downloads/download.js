import React,{useState, useEffect} from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar'
import ApiLoader from '../../Loader/ApiLoader'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import { titleHeadingColor, titleRowColor } from '../../customStyle/TableColor'
import api from '../../../api/index'

function Downloads(){
    const [loading,setLoading] = useState(false)
    const [download,setDatabase] = useState([])

    useEffect(() => {
        setLoading(true)
        api.downloads()
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
                        <Breadcrumbs b="Downloads"/>
                        {loading === true? <ApiLoader apiload={loading}/> :
                        <Table borderless hover>
                            <thead>
                                <tr>
                                    <th style={titleHeadingColor}>Downloaded At</th>
                                    <th style={titleHeadingColor}>Rows Downloaded</th>
                                    <th style={titleHeadingColor}>Query</th>
                                    <th style={titleHeadingColor}>Query Type</th>
                                    <th style={titleHeadingColor}>Database</th>
                                    <th style={titleHeadingColor}>Source Table</th>
                                    <th style={titleHeadingColor}>User</th>
                                </tr>
                            </thead>
                            {download.map(download => (
                                <tbody key={download.id}>
                                    <tr>
                                        <td style={titleRowColor}>{download.downloadat}</td>
                                        <td style={titleRowColor}>{download.rowsdownloaded}</td>
                                        <td style={titleRowColor}>{download.query}</td>
                                        {download.type === true ? <td style={titleRowColor}>Native</td> : <td style={titleRowColor}>GUI</td>}
                                        <td style={titleRowColor}>{download.sourcedatabases}</td>
                                        <td style={titleRowColor}>{download.tables}</td>
                                        <td style={titleRowColor}>{download.user}</td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table>}
                    </Col>
                </Row>  
            </Container>      
        </div>
    )
}

export default Downloads