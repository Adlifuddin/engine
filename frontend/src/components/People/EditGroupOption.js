import React, { useState } from 'react'
import { FaEllipsisH } from 'react-icons/fa'
import { Dropdown } from 'react-bootstrap'
import EditGroupModal from './Modal/EditGroupModal'
import DeleteGroupModal from './Modal/DeleteGroupModal'

function EditGroupOption(props){

    const [EditGroupModalShow, setEditGroupModalShow] = useState(false)
    const [DeleteGroupModalShow, setDeleteGroupModalShow] = useState(false)

    return (
        <td>
            <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <FaEllipsisH />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setEditGroupModalShow(true)} >Edit Name</Dropdown.Item>
                        <EditGroupModal groupName={props.groupName} show={EditGroupModalShow} onHide={() => setEditGroupModalShow(false)} />
                        <Dropdown.Item onClick={() => setDeleteGroupModalShow(true)} >Remove Group</Dropdown.Item>   
                        <DeleteGroupModal groupId={props.groupId} show={DeleteGroupModalShow} onHide={() => setDeleteGroupModalShow(false)} />
                    </Dropdown.Menu>
            </Dropdown> 
        </td>
    )
}

export default EditGroupOption