import React from 'react'
import { Table, Tooltip, Button, OverlayTrigger } from 'react-bootstrap'
import { FaRedoAlt } from 'react-icons/fa'

function DeactivatedPeople(){
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
                <tbody>
                    <tr>
                        <td>Muhammad Faizal Mat Yaacob</td>
                        <td>example@gmail.com</td>
                        <td>a month ago</td>
                        <td style={{width:"30px"}}>
                            <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                                <Button variant="success"><FaRedoAlt /></Button>
                            </OverlayTrigger>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default DeactivatedPeople