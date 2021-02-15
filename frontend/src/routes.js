import GoogleAPI from './views/Integration/GoogleApi'
import HomePage from './components/Home/HomePage'
import Integration from './views/Integration/Integration'

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
    }
]

export default routes
