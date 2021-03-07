import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import './custom.scss'

function PeopleSideBar(){
    return (

        <div>
            <ProSidebar>
                <Menu iconShape="square">
                    <MenuItem>People</MenuItem>
                    <MenuItem>Group</MenuItem>
                </Menu>
            </ProSidebar>
        </div>
    )
}

export default PeopleSideBar