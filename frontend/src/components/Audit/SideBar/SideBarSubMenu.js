import React, {useState} from 'react'
import { Link } from 'react-router-dom';
//import react pro sidebar components
import {
    SubMenu,
    MenuItem,

  } from "react-pro-sidebar";
  
//import icons from react icons
import { FiUsers, FiDatabase, FiEdit, FiDownload } from "react-icons/fi"
import { FaTable, FaQuestionCircle, FaBuromobelexperte } from "react-icons/fa"
  
//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css"
import "./SideBar.css"



function SideBarSubMenu(){

  const [buttonActive,setButtonActive] = useState(false)

  function handleClick(){
    setButtonActive(!buttonActive)
  }

    return(
            <div className="submenubg">
                <SubMenu title="Team Members" icon={<FiUsers />}>
                  <MenuItem >Overview<Link to="/audit/members/overview" /></MenuItem>
                  <MenuItem>All Members<Link to="/audit/members/all" /></MenuItem>
                  <MenuItem>Audit Log<Link to="/audit/members/log" /></MenuItem>
                </SubMenu>
         
                <SubMenu title="Databases" icon={<FiDatabase />}>
                  <MenuItem>Overview</MenuItem>
                  <MenuItem>All Databases<Link to="/audit/databases/all" /></MenuItem>
                </SubMenu>
              
                <SubMenu title="Schemas" icon={<FiEdit />}>
                  <MenuItem>Overview<Link to="/audit/schemas/overview" /></MenuItem>
                  <MenuItem>All Schemas<Link to="/audit/schemas/all" /></MenuItem>
                </SubMenu>

                <SubMenu title="Tables" icon={<FaTable />}>
                  <MenuItem active={true}>Overview<Link to="/audit/tables/overview" /></MenuItem>
                  <MenuItem>All Tables<Link to="/audit/tables/all" /></MenuItem>
                </SubMenu>

                <SubMenu title="Questions" icon={<FaQuestionCircle />}>
                  <MenuItem>Overview</MenuItem>
                  <MenuItem>All Questions<Link to="/audit/questions/all" /></MenuItem>
                </SubMenu>

                <SubMenu title="Dashboards" icon={<FaBuromobelexperte />}>
                  <MenuItem>Overview</MenuItem>
                  <MenuItem>All Dashboards<Link to="/audit/dashboards/all" /></MenuItem>
                </SubMenu>

                <SubMenu title="Downloads" icon={<FiDownload />}>
                  <MenuItem>Overview</MenuItem>
                  <MenuItem>All Downloads<Link to="/audit/downloads/all" /></MenuItem>
                </SubMenu>
            </div>        
    )
}

export default SideBarSubMenu