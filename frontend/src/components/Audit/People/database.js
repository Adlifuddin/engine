import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Container, Row, Table } from 'react-bootstrap'

function DatabaseAudit(){
    const [databaseAudit,setDatabase] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/audit/database")
            .then(res => {
                console.log(res.data)
                setDatabase(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

   
    
    return(
        <div>
           <Container>
                <Row>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Schema</th>
                                <th>Table</th>
                                <th>Added On</th>        
                            </tr>
                        </thead>
                        {databaseAudit.map(databaseAudit => (
                            <tbody key={databaseAudit.id}>
                                <tr>
                                    <td>{databaseAudit.name}</td>
                                    <td>{databaseAudit.schema}</td>
                                    <td>{databaseAudit.table}</td>
                                    <td>{databaseAudit.created_at}</td>
                                </tr>
                            </tbody>
                        ))}
                    </Table>
                </Row>
            </Container>       
        </div>
    )
}

export default DatabaseAudit