import React, {useEffect, useState} from 'react'
import DatabaseContainer from './DatabaseContainer'


function DatabaseUpdate(props) {
    const path = props.location.pathname
    const pathname = path.split("/")
    const status = pathname[2]

    return (
        <>
            <DatabaseContainer status={status}/>
        </>
    )
}

export default DatabaseUpdate
