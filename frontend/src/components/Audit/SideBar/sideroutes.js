import React from 'react'
import DatabaseAudit from '../Database/Database'
import Members from '../TeamMember/Members'
import Schema from '../Schema/schema'
import { FiUsers, FiDatabase, FiEdit } from "react-icons/fi"
import Tables from '../Table/Table'
import Questions from '../Questions/question'
import Dashboards from '../Dashboards/dashboard'

const sideroutes = [
    {
        pathname: "/audit/members/all",
        icons: <FiUsers />,
        title: "Team Member",
        submenu1: "Overview",
        submenu2: "All Members",
        components: Members,
    },
    {
        pathname: "/audit/databases/all",
        icons: <FiDatabase />,
        title: "Database",
        submenu1: "Overview",
        submenu2: "All Databases",
        components: DatabaseAudit,
    },
    {
        pathname: "/audit/tables/all",
        icons: <FiDatabase />,
        title: "Database",
        submenu1: "Overview",
        submenu2: "All Tables",
        components: Tables,
    },
    {
        pathname: "/audit/schemas/all",
        icons: <FiEdit />,
        title: "Schema",
        submenu1: "Overview",
        submenu2: "All Schemas",
        components: Schema,
    },
    {
        pathname: "/audit/questions/all",
        icons: <FaQuestionCircle />,
        title: "Question",
        submenu1: "Overview",
        submenu2: "All Questions",
        components: Questions,
    },
    {
        pathname: "/audit/dashboards/all",
        icons: <FaBuromobelexperte />,
        title: "Dashboard",
        submenu1: "Overview",
        submenu2: "All Dashboards",
        components: Dashboards,
    },
]

export default sideroutes
