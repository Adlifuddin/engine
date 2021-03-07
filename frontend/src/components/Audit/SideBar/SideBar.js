//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi"

//import sidebar scss from react-pro-sidebar module and our custom css 
import SideBarSubMenu from "./SideBarSubMenu"

function SideBar(){
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)

  return (
      <div>
        <ProSidebar>
          <SidebarContent>
            <Menu iconShape="circle">
              <SideBarSubMenu />
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>

      
  )
}

export default SideBar;