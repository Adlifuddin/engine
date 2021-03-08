import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Table , Button} from 'react-bootstrap'
import Select from 'react-select'
import { FaEllipsisH } from 'react-icons/fa';

function ActivePeople(){

    const [id, setID] = useState("");

    const options = [
        { value: 'All Users', label: 'All Users' },
        { value: 'Administrators', label: 'Administrators' },
        { value: 'Creator', label: 'Creator' },
        { value: 'Viewer', label: 'Viewer' }
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

    function getGroups(data){
        return data.split(",")
    }
    
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Groups</th>
                    <th>Last Login</th>
                    <th>Action</th>
                    </tr>
                </thead>
                {activepeople.map(peopleactive => (
                                <tbody key={peopleactive.id}>
                                    <tr>
                                        <td>{peopleactive.first_name} {peopleactive.last_name}</td>
                                        <td>{peopleactive.email}</td>
                                        <td style={{fontSize:"14px",width:"400px"}}>
                                            <Select isMulti={true} defaultValue={getGroups(peopleactive.groups).map(x => ({value:x,label:x}))} options={options} />
                                        </td>
                                        <td>{peopleactive.last_login}</td>
                                        <td style={{textAlign:"center"}}>
                                            <FaEllipsisH />
                                        </td>
                                    </tr>
                                    </tbody>
                            ))}
            </Table>
        </div>
    )
}

export default ActivePeople