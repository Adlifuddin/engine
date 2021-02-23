import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Breadcrumb.css'

function Breadcrumbs(props) {
    const {b} = props
    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/database", color: '#2e353b' }}>DATABASES</Breadcrumb.Item>
            <Breadcrumb.Item active style={{ cursor: 'pointer', color: '#2e353b' }}>{b.toUpperCase()}</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default Breadcrumbs
