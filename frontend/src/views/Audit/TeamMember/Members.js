import React,{useState, useEffect} from 'react'
import { Table } from 'react-bootstrap'
import ApiLoader from '../../../components/Loader/ApiLoader';
import { titleHeadingColor, titleRowColor} from '../../../components/customStyle/TableColor'
import api from '../../../api/index'
import Audit from '../Audit';

function Members(){
    const [loading,setLoading] = useState(false)
    const [members,setMembers] = useState([])

    useEffect(() => {
        setLoading(true)
        api.members()
            .then(res => {
                setMembers(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    return(
        <Audit b="Team Members">
            {loading === true ?
                <ApiLoader apiload={loading} />
                :
                <Table hover borderless>
                    <thead>
                        <tr>
                            <th style={titleHeadingColor}>Name</th>
                            <th style={titleHeadingColor}>Email</th>
                            <th style={titleHeadingColor}>Date Joined</th>
                            <th style={titleHeadingColor}>Group</th>
                            <th style={titleHeadingColor}>Last Login</th>     
                        </tr>
                        </thead>
                    <tbody >
                    {members.map(member => (
                        
                            <tr key={member.id}>
                                <td style={{ ...titleRowColor, fontWeight: 'bold' }}>{member.first_name} {member.last_name}</td>
                                <td style={titleRowColor}>{member.email}</td>
                                <td style={titleRowColor}>{member.date_joined}</td>
                                <td style={titleRowColor}>{member.user}</td>
                                <td style={titleRowColor}>{member.last_login}</td>
                            </tr>
                        
                    ))}
                    </tbody>
                </Table>
            }
        </Audit>
    )
}

export default Members