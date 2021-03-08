import React from 'react'
import { Link } from 'react-router-dom'
import { ProSidebar, Menu, MenuItem, SidebarContent } from 'react-pro-sidebar'
import { FaUser, FaUsers } from 'react-icons/fa'
import './custom.scss'

function PeopleSideBar(){
    return (

        <div>
            <ProSidebar>
                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaUser />}>People<Link to="/people/people" /></MenuItem>
                        <MenuItem icon={<FaUsers />}>Group<Link to="/people/groups" /></MenuItem>
                    </Menu>
                </SidebarContent>   
            </ProSidebar>
        </div>
    )
}

export default PeopleSideBar