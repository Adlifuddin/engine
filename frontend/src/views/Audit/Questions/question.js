import React,{useState, useEffect} from 'react'
import { Table } from 'react-bootstrap'
import ApiLoader from '../../../components/Loader/ApiLoader'
import { titleHeadingColor, titleRowColor} from '../../../components/customStyle/TableColor'
import api from '../../../api/index'
import Audit from '../Audit'

function Questions(){
    const [loading,setLoading] = useState(false)
    const [question,setDatabase] = useState([])

    useEffect(() => {
        setLoading(true)
        api.questions()
            .then(res => {
                setDatabase(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

   
    
    return(
        <Audit b="Questions">
            {loading === true ?
                <ApiLoader apiload={loading} />
                :
                <Table hover borderless>
                    <thead>
                        <tr>
                            <th style={titleHeadingColor}>Name</th>
                            <th style={titleHeadingColor}>Collection</th>
                            <th style={titleHeadingColor}>Database</th>
                            <th style={titleHeadingColor}>Table</th>
                            <th style={titleHeadingColor}>Created By</th>
                            <th style={titleHeadingColor}>Public Link</th>
                            <th style={titleHeadingColor}>Cache TTL</th>
                            <th style={titleHeadingColor}>Views</th>   
                        </tr>
                    </thead>
                    <tbody >
                    {question.map(question => (
                        <tr key={question.id}>
                            <td style={titleRowColor}>{question.name}</td>
                            <td style={titleRowColor}>{question.collection}</td>
                            <td style={titleRowColor}>{question.database}</td>
                            <td style={titleRowColor}>{question.table}</td>
                            <td style={titleRowColor}>{question.created}</td>
                            <td style={titleRowColor}>{question.publicLink}</td>
                            <td style={titleRowColor}>{question.cacheTTL}</td>
                            <td style={titleRowColor}>{question.views}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            }
        </Audit>
    )
}

export default Questions