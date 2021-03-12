import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'

function Collection() {
    const [tableName, setTableName] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/test')
            .then(res => {
                setTableName(res.data)
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const onClicks = (e) => {
        e.preventDefault()

        axios.post('http://127.0.0.1:5000/api/google-drive-table', { name: e.target.value })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            {tableName.map(x => (
                <Button onClick={onClicks} value={x.table_name}>{x.table_name}</Button>
            ))}
        </div>
    )
}

export default Collection
