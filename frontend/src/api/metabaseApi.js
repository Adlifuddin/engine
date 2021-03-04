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
export const syncSchema = (payload, id) => api.post(`database/${id}/sync_schema`, payload, config)
export const reScanValue = (payload, id) => api.post(`database/${id}/rescan_values`, payload, config)
export const discardValue = (payload, id) => api.post(`database/${id}/discard_values`, payload, config)
export const deleteDatabase = (id) => api.delete(`database/${id}`, config)
export const validateDatabase = (payload) => api.post(`database/validate`, payload, config)
export const updateDatabase = (payload, id) => api.put(`database/${id}`, payload, config)

//group
export const getPermissionGroup = () => api.get(`permissions/group`, config)
export const getPermissionGraph = () => api.get(`permissions/graph`, config)
export const putPermissionGraph = (payload) => api.put(`permissions/graph`, payload, config)

// Create Sessions
export const session = (payload) => api.post("session/", payload)


const apis = {
    databaseList,
    session,
    createDatabase,
    databaseListID,
    syncSchema,
    reScanValue,
    discardValue,
    deleteDatabase,
    validateDatabase,
    updateDatabase,
    getPermissionGraph,
    getPermissionGroup,
    putPermissionGraph,
}

export default apis