import React from 'react'
import {
    Menu,
    MenuItem,
} from "react-pro-sidebar";
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'
import { FaUser, FaUsers } from 'react-icons/fa'
import { Container} from 'react-bootstrap'

function PeopleGroups(props) {
    return (
        <div className="body">
            <div className="sidenav">
                <Sidebar>
                    <Menu title="People">
                        <MenuItem icon={<FaUser />}>People<Link to="/people" /></MenuItem>
                        <MenuItem icon={<FaUsers />}>Group<Link to="/people/groups"/></MenuItem>
                    </Menu>
                </Sidebar>
            </div>
            <div className="content">
                <Container fluid>
                    {props.children}
                </Container>
            </div>
        </div>
    )
}

export default PeopleGroups
