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
  
function SideBarSubMenu(props){

  const [buttonActive,setButtonActive] = useState(false)

  function handleClick(){
    setButtonActive(!buttonActive)
  }

    return(
            <div className="submenubg">
                {props.children}
            </div>        
    )
}

export default SideBarSubMenu