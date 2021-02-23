import GoogleAPI from './views/Integration/GoogleApi'
import HomePage from './components/Home/HomePage'
import Integration from './views/Integration/Integration'
import Members from './components/Audit/TeamMember/Members'
import DatabaseView from './views/database/DatabaseView'
import DatabaseUpdate from './views/database/DatabaseUpdate'
import DatabaseList from './views/database/DatabaseList'
import Tables from './components/Audit/Table/Table'
import Schema from './components/Audit/Schema/schema'
import DatabaseAudit from './components/Audit/Database/Database'
import Questions from './components/Audit/Questions/question'
import Dashboards from './components/Audit/Dashboards/dashboard'
import MemberOverview from './components/Audit/TeamMember/MemberOverview'

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
        exact: true,
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
        path: "audit/members/all",
        name: "Audit-AllMember",
        component: Members,
        layout: "/",
        invisible: true,
    },
    {
        path: "audit/members/overview",
        name: "Audit-MemberOverview",
        component: MemberOverview,
        layout: "/",
        invisible: true,
    },
    {
        path: "audit/databases/all",
        name: "Audit-AllDatabase",
        component: DatabaseAudit,
        layout: "/",
        invisible: true,
    },
    {
        path: "audit/tables/all",
        name: "Audit-AllTable",
        component: Tables,
        layout: "/",
        invisible: true,
    },
    {
        path: "audit/schemas/all",
        name: "Audit-AllSChema",
        component: Schema,
        layout: "/",
        invisible: true,
    },
    {
        path: "audit/questions/all",
        name: "Audit-AllQuestion",
        component: Questions,
        layout: "/",
        invisible: true,
    },
    {
        path: "audit/dashboards/all",
        name: "Audit-AllDasboard",
        component: Dashboards,
        layout: "/",
        invisible: true,
    }
    
    
]

export default routes
