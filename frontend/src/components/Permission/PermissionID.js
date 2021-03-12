import React, {useEffect, useState} from 'react'
import { Table } from 'react-bootstrap'
import Create from './components/PermissionApi'
function PermissionID(props) {
    const {match} = props
    const [permissionGraph, setPermissionGraph] = useState()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
        Create.CallData(setPermissionGraph, setLoad)
    }, [])

    const findName = (data) => {
        return Object.keys(data).find(x => data[x].id === parseInt(match.params.id))
    }

    const findUnique = (data) => {
        data.forEach(element => {
            console.log(element.schema)
        });
    }

    return (
        <div>
            {permissionGraph !== undefined ?
                <Table>
                    {console.log(findUnique(permissionGraph[findName(permissionGraph)].tables))}
                </Table>
                :
                <>
                </>
            }
        </div>
    )
}

export default PermissionID
