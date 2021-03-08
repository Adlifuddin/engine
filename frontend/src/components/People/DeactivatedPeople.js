import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Table, Tooltip, Button, OverlayTrigger } from 'react-bootstrap'
import { FaRedoAlt } from 'react-icons/fa'

function DeactivatedPeople(){

    const [deactivepeople,setdeactivepeople] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/people/deactivepeople")
            .then(res => {
                setdeactivepeople(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Reactivate this account
        </Tooltip>
      );

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Deactivated</th>
                    <th></th>
                    </tr>
                </thead>
                {deactivepeople.map(peopledeactive => (
                                <tbody key={peopledeactive.id}>
                                    <tr>
                                        <td>{peopledeactive.first_name} {peopledeactive.last_name}</td>
                                        <td>{peopledeactive.email}</td>
                                        <td>{peopledeactive.deactivated}</td>
                                        <td style={{width:"30px"}}>
                                            <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                                                <Button variant="success"><FaRedoAlt /></Button>
                                            </OverlayTrigger>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
            </Table>
        </div>
    )
}

export default DeactivatedPeople