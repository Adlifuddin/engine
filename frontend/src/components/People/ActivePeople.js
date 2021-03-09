import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Table , Button, DropdownButton, Dropdown} from 'react-bootstrap'
import Select from 'react-select'
import { FaEllipsisH } from 'react-icons/fa';

function ActivePeople(){

    const [id, setID] = useState("");
    const[listGroup, setListGroup] = useState([])

    useEffect(() => {
        axios
        .get("http://localhost:5000/api/people/listgroups")
        .then(res => {
            console.log(res.data)
            setListGroup(res.data)
        })
        .catch(err => {
            console.log(err)
        })    
    }, [])

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

    const options = listGroup.map(data => ({value:data.name,label:data.name}))
    
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
                                            <Select isMulti={true} defaultValue={getGroups(peopleactive.groups).map(data => ({value:data,label:data}))} options={options} />
                                        </td>
                                        <td>{peopleactive.last_login}</td>
                                        <td style={{textAlign:"center"}}>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                    <FaEllipsisH />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">Edit user</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-2">Reset password</Dropdown.Item>
                                                    <Dropdown.Item href="#/action-3">Deactivate user</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                    </tbody>
                            ))}
            </Table>
        </div>
    )
}

export default ActivePeople