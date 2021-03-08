import React,{useState, useEffect} from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar'
import ApiLoader from '../../Loader/ApiLoader'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import { titleHeadingColor, titleRowColor } from '../../customStyle/TableColor'
import api from '../../../api/index'

function Schema(){
    const [loading,setLoading] = useState(false)
    const [schema,setDatabase] = useState([])

    useEffect(() => {
        setLoading(true)
        api.schemas()
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