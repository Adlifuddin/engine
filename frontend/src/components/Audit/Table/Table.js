import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Col, Table, Breadcrumb } from 'react-bootstrap'
import SideBar from '../SideBar/SideBar'
import ApiLoader from '../../Loader/ApiLoader'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import { titleHeadingColor, titleRowColor} from '../../customStyle/TableColor'

function Tables(){
    const [loading,setLoading] = useState(false)
    const [tables,setTables] = useState([])

    useEffect(() => {
        setLoading(true)
        axios
            .get("http://localhost:5000/api/audit/tables")
            .then(res => {
                setTables(res.data)
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
                        <Breadcrumbs b="Tables"/>
                        {loading === true ? <ApiLoader apiload={loading}/> :
                        <Table hover borderless>
                            <thead>
                                <tr>
                                    <th style={titleHeadingColor}>Database</th>
                                    <th style={titleHeadingColor}>Schema</th>
                                    <th style={titleHeadingColor}>Table in Database</th>
                                    <th style={titleHeadingColor}>Table Display Name</th>   
                                </tr>
                            </thead>
                            <tbody >
                                {tables.map(table => (
                                    <tr key={table.id}>
                                        <td style={titleRowColor}>{table.db_name}</td>
                                        <td style={titleRowColor}>{table.schema}</td>
                                        <td style={titleRowColor}>{table.table_name}</td>
                                        <td style={titleRowColor}>{table.display_name}</td>
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

export default Tables