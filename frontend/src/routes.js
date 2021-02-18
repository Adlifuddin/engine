import GoogleAPI from './views/Integration/GoogleApi'
import HomePage from './components/Home/HomePage'
import Integration from './views/Integration/Integration'
import Members from './components/Audit/People/Members'
import Database from './components/Audit/People/database'

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
    }
]

export default routes
