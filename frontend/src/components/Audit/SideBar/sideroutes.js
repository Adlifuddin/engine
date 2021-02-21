import React from 'react'
import DatabaseAudit from '../Database/Database'
import Members from '../TeamMember/Members'
import { FiUsers, FiDatabase } from "react-icons/fi"
import Tables from '../Table/Table'

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
]

export default sideroutes
