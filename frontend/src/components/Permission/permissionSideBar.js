import React from 'react'
import { ProSidebar, Menu, MenuItem, SidebarContent } from 'react-pro-sidebar'
import { FaUser, FaUsers } from 'react-icons/fa'

function PermissionSideBar(){
    return (

        <div>
            <ProSidebar>
                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaUser />}>Permission Menu 1</MenuItem>
                        <MenuItem icon={<FaUsers />}>Permission Menu 2</MenuItem>
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        </div>
    )
}

export default PermissionSideBar