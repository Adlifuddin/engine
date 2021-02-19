import GoogleAPI from './views/Integration/GoogleApi'
import HomePage from './components/Home/HomePage'
import Integration from './views/Integration/Integration'
import Members from './components/Audit/TeamMember/Members'
import DatabaseAudit from './components/Audit/database/database'
import Database from './views/database/Database'

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
        pathname: "/databaseAudit",
        name: "Database Audit",
        components: DatabaseAudit,
    },
    {
        pathname: "/database",
        name: "Database",
        components: Database,
    }
]

export default routes
