import GoogleAPI from './views/Integration/GoogleApi'
import HomePage from './components/Home/HomePage'
import Integration from './views/Integration/Integration'
import Members from './components/Audit/TeamMember/Members'
import Database from './views/database/Database'
import DatabaseAudit from './components/Audit/Database/Database'
import Tables from './components/Audit/Table/Table'

const routes = [
    {
        pathname: "/",
        name: "Home",
        components: HomePage,
    },
    {
        pathname: "/integration",
        name: "Integration",
        components: Integration,
    },
    {
        pathname: "/google-drive",
        name: "Google Drive",
        components: GoogleAPI,
        isVisible: true,
    },
    {
        pathname: "/audit",
        name: "Audit",
        components: Members,
    },
    {
        pathname: "/database",
        name: "Database",
        components: Database,
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
    }
]

export default routes
