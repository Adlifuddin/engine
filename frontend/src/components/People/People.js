import React, {useState} from 'react' 
import { Container, Row, Col, Tabs, Tab, Button, Modal, Form } from 'react-bootstrap'
import ActivePeople from './ActivePeople'
import DeactivatedPeople from './DeactivatedPeople'
import AddSomeoneModal from './Modal/AddSomeoneModal'
import PeopleGroups from './PeopleGroups'

function People(){
    const [AddSomeoneModalShow, setAddSomeoneModalShow] = useState(false);

    return (
        <PeopleGroups>
            <Tabs defaultActiveKey="active-people" id="uncontrolled-tab-example">
                <Tab eventKey="active-people" title="Active">
                    <Button onClick={() => setAddSomeoneModalShow(true)} style={{float:"right", fontSize:"18px", marginTop:"15px",marginBottom:"15px"}} variant="secondary">Add someone</Button>
                    <ActivePeople /> 
                    <AddSomeoneModal show={AddSomeoneModalShow} onHide={() => setAddSomeoneModalShow(false)} />
                </Tab>
                <Tab eventKey="deactive-people" title="Deactivated">
                    <DeactivatedPeople />
                </Tab>
            </Tabs>
        </PeopleGroups>
    )

}

export default People