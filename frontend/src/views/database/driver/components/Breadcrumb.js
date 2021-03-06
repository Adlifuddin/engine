import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Breadcrumbs(props) {
    const {b} = props
    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/database"}}><span className="database">Databases</span></Breadcrumb.Item>
            <Breadcrumb.Item active><span className="datasource">{b}</span></Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default Breadcrumbs
