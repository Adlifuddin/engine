import React, { useState } from 'react'
import { FaEllipsisH } from 'react-icons/fa'
import { Dropdown } from 'react-bootstrap'
import EditGroupModal from './Modal/EditGroupModal'

function EditGroupOption(props){

    const [EditGroupModalShow, setEditGroupModalShow] = useState(false)

    return (
        <td>
            <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <FaEllipsisH />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setEditGroupModalShow(true)} >Edit Name</Dropdown.Item>
                        <EditGroupModal groupName={props.groupName} show={EditGroupModalShow} onHide={() => setEditGroupModalShow(false)} />
                        <Dropdown.Item >Remove Group</Dropdown.Item>   
                    </Dropdown.Menu>
            </Dropdown> 
        </td>
    )
}

export default EditGroupOption