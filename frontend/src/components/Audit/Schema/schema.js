import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar'
import ApiLoader from '../../Loader/ApiLoader'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import { titleHeadingColor, titleRowColor } from '../../customStyle/TableColor'

function Schema(){
    const [loading,setLoading] = useState(false)
    const [schema,setDatabase] = useState([])

    useEffect(() => {
        setLoading(true)
        axios
            .get("http://localhost:5000/api/audit/schemas")
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
                        <Breadcrumbs b="Schema"/>
                        {loading === true ?
                            <ApiLoader apiload={loading} />
                            :
                            <Table hover borderless>
                                <thead>
                                    <tr>
                                        <th style={titleHeadingColor}>Title</th>
                                        <th style={titleHeadingColor}>Schema</th>
                                        <th style={titleHeadingColor}>Table</th>
                                        <th style={titleHeadingColor}>Saved query</th>   
                                    </tr>
                                </thead>
                                <tbody >
                                    {schema.map(schema => (
                                        <tr key={schema.id}>
                                            <td style={titleRowColor}>{schema.name}</td>
                                            <td style={{...titleRowColor, textTransform: "uppercase"}}>{schema.schema}</td>
                                            <td style={titleRowColor}>{schema.table}</td>
                                            <td style={titleRowColor}>{schema.query}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        }
                    </Col>
                </Row>  
            </Container>      
        </div>
    )
}

export default Schema