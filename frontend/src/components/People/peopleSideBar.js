import React from 'react'
import { ProSidebar, Menu, MenuItem, SidebarContent } from 'react-pro-sidebar'
import { FaUser, FaUsers } from 'react-icons/fa'
import './custom.scss'

function PeopleSideBar(){
    return (

        <div>
            <ProSidebar>
                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaUser />}>People</MenuItem>
                        <MenuItem icon={<FaUsers />}>Group</MenuItem>
                    </Menu>
                </SidebarContent>   
            </ProSidebar>
        </div>
    )
}

export default PeopleSideBar