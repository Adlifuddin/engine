import React from 'react'
import { Link } from 'react-router-dom';
//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    SubMenu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
  } from "react-pro-sidebar";
  
  //import icons from react icons
  import { FiUsers, FiDatabase, FiEdit, FiDownload } from "react-icons/fi"
  import { FaTable, FaQuestionCircle, FaBuromobelexperte } from "react-icons/fa"
  
  
  
  //import sidebar css from react-pro-sidebar module and our custom css 
  import "react-pro-sidebar/dist/css/styles.css";
  import "./SideBar.css"
  import {BrowserRouter as Router, Route} from 'react-router-dom'


function SideBarSubMenu(){
    return(
            <div className="submenubg">
                <SubMenu title="Team Members" icon={<FiUsers />}>
                  <MenuItem active={true}>Overview</MenuItem>
                  <MenuItem>All Members<Link to="/audit/members/all" /></MenuItem>
                  <MenuItem>Audit Log</MenuItem>
                </SubMenu>
         
                <SubMenu title="Databases" icon={<FiDatabase />}>
                  <MenuItem active={true}>Overview</MenuItem>
                  <MenuItem>All Databases<Link to="/audit/databases/all" /></MenuItem>
                </SubMenu>
              
                <SubMenu title="Schemas" icon={<FiEdit />}>
                  <MenuItem active={true}>Overview</MenuItem>
                  <MenuItem>All Schemas</MenuItem>
                </SubMenu>

                <SubMenu title="Tables" icon={<FaTable />}>
                  <MenuItem active={true}>Overview</MenuItem>
                  <MenuItem>All Tables</MenuItem>
                </SubMenu>

                <SubMenu title="Questions" icon={<FaQuestionCircle />}>
                  <MenuItem active={true}>Overview</MenuItem>
                  <MenuItem>All Questions</MenuItem>
                </SubMenu>

                <SubMenu title="Dashboards" icon={<FaBuromobelexperte />}>
                  <MenuItem active={true}>Overview</MenuItem>
                  <MenuItem>All Dashboards</MenuItem>
                </SubMenu>

                <SubMenu title="Downloads" icon={<FiDownload />}>
                  <MenuItem active={true}>Overview</MenuItem>
                  <MenuItem>All Downloads</MenuItem>
                </SubMenu>
            </div>        
    )
}

export default SideBarSubMenu