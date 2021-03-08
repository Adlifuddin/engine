import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Table , Button} from 'react-bootstrap'
import Select from 'react-select'
import { FaBeer, FaEdit } from 'react-icons/fa';

function ActivePeople(){

    const [id, setID] = useState("");

    const options = [
        { value: 'all', label: 'All Users' },
        { value: 'admin', label: 'Administrators' },
        { value: 'creator', label: 'Creator' },
        { value: 'viewer', label: 'Viewer' }
      ]


      const toggleEdit = (e) => {
        const id = e.target.value
        setID(id)
        toggleEdit()
    }
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
            <Table hover borderless>
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
                                        <td style={{ width: '80.22px', height: '35px' }}><Button id='edit-button' style={{ float: 'right' }} onClick={toggleEdit} value={peopleactive.id} >Edit</Button></td>

                                    </tr>
                                    </tbody>
                            ))}
            </Table>
        </div>
    )
}

export default ActivePeople