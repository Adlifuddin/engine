import api from '../../../api/metabaseApi'

export async function CallData(setPermissionGraph, setLoad) {
            await api.databaseTables()
                .then(res => {
                    api.getPermissionGroup()
                        .then(response => {
                            const data = response.data
                            const filters = data.filter(x => (x.id !== 1) && (x.id !== 2))
                            api.getPermissionGraph()
                                .then(responses => {
                                    const datas = responses.data.groups
                                    var file = {}
                                    var analyst = {}
                                    Object.keys(datas[2]).forEach(e => {
                                        analyst[e] = { native: "none", schemas: "none" }
                                    })
                                    filters.forEach(x => {
                                        if (x.name === 'Analyst') {
                                            file["Analyst"] = datas[x.id]
                                        } else if (x.name === 'Architect') {
                                            file["Architect"] = datas[x.id]
                                        }
                                    })
                                    file.Analyst = analyst
                                    var files = {}
                                    res.data.forEach(x => {
                                        files[x.name] = {
                                            Analyst: {
                                                ...file.Analyst[x.id],
                                            },
                                            Architect: {
                                                ...file.Architect[x.id],
                                            },
                                            ...x
                                        }
                                    })
                                    setPermissionGraph(files)
                                    setLoad(false)
                                })
                                .catch(error => {
                                    console.log(error)
                                })

                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
        }

const apis = {
    CallData,
}

export default apis