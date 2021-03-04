import api from '../../../api/metabaseApi'

export const createDatabases = (data) => {
    api.createDatabase(data)
        .then(response => {
            const id = response.data.id
            api.getPermissionGraph()
            .then(response => {
                var datas = response.data
                var groups = response.data.groups

                var payload = {
                    ...datas,
                    groups: {
                        ...groups,
                        "1": {
                            [id]: {native: "none", schemas: "none"}
                        },
                        "5": {
                            [id]: { native: "write", schemas: "all" }
                        }
                    }
                }
                api.putPermissionGraph(payload)
                    .then(response => {
                        console.log(response)
                        window.location.href = '/database'
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
        })
}

export const validateDatabases = (validate, setPage, errorInput) => {
     api.validateDatabase(validate)
        .then(response => {
            if (response.data.valid) {
                setPage(true)
            } else {
                setPage(false)
                errorInput("Couldn't connect to the database. Please check the connection details.")
            }
        })
        .catch(error => {
            console.log(error)
        })
}

export const updateDatabases = (datas, status, updateLoading) => { 
    api.updateDatabase(datas, status)
        .then(response => {
            updateLoading('done')
            console.log(response)
            window.location.reload()
            
        })
        .catch(error => {
            console.log(error)
        })
}

export const deleteDatabases = (id) => {
    api.deleteDatabase(id)
        .then(response => {
            window.location.href = "/database"
        })
        .catch(error => {
            console.log(error)
        })
}

export const discardValues = (status, setModal) => {
    api.discardValue({}, status)
            .then(response => {
                const data = response.data
                if (data) {
                    if (data.status === 'ok') {
                        setModal(false)
                    }
                }
            })
            .catch(error => {
                console.log(error)
            })
}

export const reScanValues = (status, setReScanLoading) => {
    api.reScanValue({}, status)
            .then(response => {
                const data = response.data
                setReScanLoading("loaded")
                window.setTimeout(() => {
                    setReScanLoading("nothing")
                }, 3000)
            })
            .catch(error => {
                console.log(error)
                setReScanLoading("nothing")
            })
}

export const syncSchemas = (status, setLoading) => {
    api.syncSchema({}, status)
            .then(response => {
                const data = response.data
                setLoading("loaded")
                window.setTimeout(() => {
                    setLoading("nothing")
                }, 3000)
            })
            .catch(error => {
                console.log(error)
                setLoading("nothing")
            })
}

const create = {
    createDatabases,
    validateDatabases,
    updateDatabases,
    deleteDatabases,
    discardValues,
    reScanValues,
    syncSchemas,
}

export default create