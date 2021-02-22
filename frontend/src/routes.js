import GoogleAPI from './views/Integration/GoogleApi'
import HomePage from './components/Home/HomePage'
import Integration from './views/Integration/Integration'
import Members from './components/Audit/TeamMember/Members'
import DatabaseView from './views/database/DatabaseView'
import DatabaseUpdate from './views/database/DatabaseUpdate'
import DatabaseList from './views/database/DatabaseList'
import DatabaseAudit from './components/Audit/Database/Database'
import Tables from './components/Audit/Table/Table'
import Schema from './components/Audit/Schema/schema'

var routes = [
    {
        path: "home",
        name: "Home",
        component: HomePage,
        layout: "/",
    },
    {
        path: "integration",
        name: "Integration",
        component: Integration,
        layout: "/",
    },
    {
        path: "google-drive",
        name: "Google Drive",
        component: GoogleAPI,
        invisible: true,
        layout: "/",
    },
    {
        path: "audit",
        name: "Audit",
        component: Members,
        layout: "/",
    },
    {
        path: "database",
        name: "Database",
        component: DatabaseList,
        layout: "/",
        exact: true,
    },
    {
        path: "database/add",
        name: "AddDatabase",
        component: DatabaseView,
        layout: "/",
        invisible: true,
    },
    {
        path: "database/:id",
        name: "updateDatabase",
        component: DatabaseUpdate,
        layout: "/",
        invisible: true,
    },
    {
        pathname: "/audit/members/all",
        name: "Audit-AllMember",
        components: Members,
    },
    {
        pathname: "/audit/databases/all",
        name: "Audit-AllDatabase",
        components: DatabaseAudit,
    },
    {
        pathname: "/audit/tables/all",
        name: "Audit-AllTable",
        components: Tables,
    },
    {
        pathname: "/audit/schemas/all",
        name: "Audit-AllSChema",
        components: Schema,
    }
]

export default routes
