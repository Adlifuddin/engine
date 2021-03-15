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

// Permissions
export const databaseTables = () => api.get("database?include=tables", config)

//list
export const getTableIDMeta = (id) => api.get(`table/${id}/query_metadata`, config)
export const getSchemaID = (id) => api.get(`database/${id}/schemas`, config)
export const getSchemaTableID = (id, schema) => api.get(`database/${id}/schema/${schema}`, config)

//update
export const updateField = (payload, id) => api.put(`field/${id}`, payload, config)

//post
export const fieldReScan = (payload, id) => api.post(`field/${id}/rescan_values`, payload, config)
export const fieldDiscard = (payload, id) => api.post(`field/${id}/discard_values`, payload, config)

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
    databaseTables,
    getTableIDMeta,
    getSchemaID,
    getSchemaTableID,
    updateField,
    fieldReScan,
    fieldDiscard,
}

export default apis