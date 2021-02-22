
import axios from 'axios'

const api = axios.create({
    baseURL: 'https://dashboard-demo.nexent.co/api/'
})

const sessions = localStorage.getItem('sessions')

const config = {
    headers: {
        "X-Metabase-Session": sessions
    }
}
// Database Settings
//List Database
export const databaseList = () => api.get("database/", config)
//List Database by Id
export const databaseListID = (id) => api.get(`database/${id}`, config)

//add Database
export const createDatabase = (payload) => api.post("database/", payload, config)


// Create Sessions
export const session = (payload) => api.post("session/", payload)


const apis = {
    databaseList,
    session,
    createDatabase,
    databaseListID,
}

export default apis