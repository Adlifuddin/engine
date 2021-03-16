import React,{useState, useEffect} from 'react'
import {  Table } from 'react-bootstrap'
import ApiLoader from '../../../components/Loader/ApiLoader'
import { titleHeadingColor, titleRowColor} from '../../../components/customStyle/TableColor'
import api from '../../../api/index'
import Audit from '../Audit'

function Tables(){
    const [loading,setLoading] = useState(false)
    const [tables,setTables] = useState([])

    useEffect(() => {
        setLoading(true)
        api.tables()
            .then(res => {
                setTables(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

   
    
    return(
        <Audit b="Tables">
            {loading === true ?
                <ApiLoader apiload={loading} />
                :
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
                </Table>
            }
       </Audit>
    )
}

export default Tables