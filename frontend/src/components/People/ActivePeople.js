import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import Select from 'react-select'

function ActivePeople(){


    const options = [
        { value: 'all', label: 'All Users' },
        { value: 'admin', label: 'Administrators' },
        { value: 'creator', label: 'Creator' },
        { value: 'viewer', label: 'Viewer' }
      ]


    const [activepeople,setactivepeople] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/people/activepeople")
            .then(res => {
                setactivepeople(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

      
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Groups</th>
                    <th>Last Login</th>
                    </tr>
                </thead>
                {activepeople.map(peopleactive => (
                                <tbody key={peopleactive.id}>
                                    <tr>
                                        <td>{peopleactive.first_name} {peopleactive.last_name}</td>
                                        <td>{peopleactive.email}</td>
                                        <td>{peopleactive.groups}</td>
                                        <td>{peopleactive.last_login}</td>
                                    </tr>
                                    </tbody>
                            ))}
            </Table>
        </div>
    )
}

export default ActivePeople