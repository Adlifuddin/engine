import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar'
import ApiLoader from '../../Loader/ApiLoader'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import { titleHeadingColor, titleRowColor} from '../../customStyle/TableColor'

function DatabaseAudit(){
    const [loading,setLoading] = useState(false)
    const [databaseAudit,setDatabase] = useState([])

    useEffect(() => {
        setLoading(true)
        axios
            .get("http://localhost:5000/api/audit/databases")
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
                        <Breadcrumbs b="Databases"/>
                        {loading === true ? <ApiLoader apiload={loading}/> :
                        <Table hover borderless>
                            <thead>
                                <tr>
                                    <th style={titleHeadingColor}>Title</th>
                                    <th style={titleHeadingColor}>Schema</th>
                                    <th style={titleHeadingColor}>Table</th>
                                    <th style={titleHeadingColor}>Added On</th>   
                                </tr>
                            </thead>
                            <tbody>
                                {databaseAudit.map(databaseAudit => ( 
                                    <tr key={databaseAudit.id}>
                                        <td style={titleRowColor}>{databaseAudit.name}</td>
                                        <td style={titleRowColor}>{databaseAudit.schema}</td>
                                        <td style={titleRowColor}>{databaseAudit.table}</td>
                                        <td style={titleRowColor}>{databaseAudit.created_at}</td>
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

export default DatabaseAudit