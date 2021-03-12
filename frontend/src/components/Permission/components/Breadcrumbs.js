import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import {Link} from 'react-router-dom'
function Breadcrumbs(props) {
    const {b, c, id, schema} = props
    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/permission"}}><span className="database">Databases</span></Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/permission/${id}`}}active><span className="datasource">{b}</span></Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/permission/${id}/schema/${schema}`}}active><span className="datasource">{c}</span></Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default Breadcrumbs
