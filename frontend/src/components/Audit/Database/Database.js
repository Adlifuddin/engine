import React,{useState, useEffect} from 'react'
import { Table } from 'react-bootstrap'
import ApiLoader from '../../Loader/ApiLoader'
import { titleHeadingColor, titleRowColor} from '../../customStyle/TableColor'
import api from '../../../api/index'
import Audit from '../Audit'

function DatabaseAudit(){
    const [loading,setLoading] = useState(false)
    const [databaseAudit,setDatabase] = useState([])

    useEffect(() => {
        setLoading(true)
        api.databases()
            .then(res => {
                setDatabase(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

   
    
    return(
        <Audit b="Databases">
            {loading === true ?
                <ApiLoader apiload={loading} />
                :
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
                </Table>
            }
        </Audit>
    )
}

export default DatabaseAudit