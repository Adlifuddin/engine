import { FaEllipsisH } from 'react-icons/fa'
import { Dropdown } from 'react-bootstrap'

function EditGroupOption(){
    return (
        <td>
            <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        <FaEllipsisH />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item >Edit Name</Dropdown.Item>
                        <Dropdown.Item >Remove Group</Dropdown.Item>   
                    </Dropdown.Menu>
            </Dropdown> 
        </td>
    )
}

export default EditGroupOption