
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/'
})

export const uploadDrive = (payload) => api.post("add", payload)
export const updateDrive = (payload) => api.put("update", payload)

//Audit
//Team Members
export const memberOverview = () => api.get("audit/members/overview")
export const memberMostCreated = () => api.get("audit/members/mostCreated")
export const memberActiveNNew = () => api.get("audit/members/activennew")
export const members = () => api.get("audit/members")
export const memberLogs = () => api.get("audit/members/log")

//Table
export const tables = () => api.get("audit/tables")
export const tablesMostQueried = () => api.get("audit/tables/mostqueried")
export const tableLeastQueried = () => api.get("audit/tables/leastqueried")

//Schemas
export const schemas = () => api.get("audit/schemas")
export const schemasMostQueried = () => api.get("audit/schemas/mostqueried")
export const schemasSlowestQueried = () => api.get("audit/schemas/slowestschema")

//Questions
export const questions = () => api.get("audit/questions")
export const questionsPopularQueries = () => api.get("audit/questions/popularqueries")
export const questionSlowestQueries = () => api.get("audit/questions/slowestqueries")

//Downloads
export const downloads = () => api.get("audit/downloads")
export const downloadsOverview = () => api.get("audit/downloads/overview")
export const downloadsUser = () => api.get("audit/downloads/downloadperuser")
export const downloadSize = () => api.get("audit/downloads/downloadpersize")

//Databases
export const databases = () => api.get("audit/databases")
export const databasesAvgExec = () => api.get("audit/databases/queriesnavgexec")
export const databasesQueries = () => api.get("audit/databases/queries")

//Dashboards
export const dashboards = () => api.get("audit/dashboards")
export const dashboardsMostPopular = () => api.get("audit/dashboards/mostpopular")
export const dashboardsCommon = () => api.get("audit/dashboards/commonquestion")
export const dashboardsSaved = () => api.get("audit/dashboards/viewsnsaved")


//People
//Active
export const peopleActive = () => api.get("people/activepeople")
export const peopleGroupList = () => api.get("people/listgroups")
export const peopleDeactivate = () => api.get("people/deactivepeople")
export const peopleAllGroup = () => api.get("people/groups")

//Integration
export const googleAPILink = (payload) => api.post("integration/google-drive/apiLink", payload)

//UserIdentification
export const userCredentials = () => api.get("user/credentials")
export const userPost = (payload) => api.post("user/login", payload)


const apis = {
    uploadDrive,
    updateDrive,
    memberOverview,
    memberMostCreated,
    memberActiveNNew,
    members,
    memberLogs,
    tables,
    tablesMostQueried,
    tableLeastQueried,
    schemas,
    schemasMostQueried,
    schemasSlowestQueried,
    questions,
    questionsPopularQueries,
    questionSlowestQueries,
    downloads,
    downloadsOverview,
    downloadsUser,
    downloadSize,
    databases,
    databasesAvgExec,
    databasesQueries,
    dashboards,
    dashboardsMostPopular,
    dashboardsCommon,
    dashboardsSaved,
    peopleActive,
    peopleGroupList,
    peopleDeactivate,
    peopleAllGroup,
    googleAPILink,
    userCredentials,
    userPost,
}

export default apis