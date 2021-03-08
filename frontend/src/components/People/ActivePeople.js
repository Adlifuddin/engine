import React from 'react'
import { Table } from 'react-bootstrap'
import Select from 'react-select'

function ActivePeople(){
    const options = [
        { value: 'all', label: 'All Users' },
        { value: 'admin', label: 'Administrators' },
        { value: 'creator', label: 'Creator' },
        { value: 'viewer', label: 'Viewer' }
      ]
      
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
                <tbody>
                    <tr>
                        <td>Muhammad Faizal Mat Yaacob</td>
                        <td>example@gmail.com</td>
                        <td style={{fontSize:"14px",width:"400px"}}>
                            <Select isMulti={true} defaultValue={[{ value: 'all', label: 'All Users' },{ value: 'creator', label: 'Creator' }]} options={options} />
                        </td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default ActivePeople