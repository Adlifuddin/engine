import React, {useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
function Modals(props) {
    const { toggle, modal, targetId } = props


    
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                    <ModalBody>
                    </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Modals
