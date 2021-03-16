import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Breadcrumbs(props) {
    const { b, a, links, c, id, schema, active } = props

    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: links}}><span className="database">{a}</span></Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: `${links}/${id}` }} active={active}><span className={active ? "datasource" : "database"}>{b}</span></Breadcrumb.Item>
            {c ? 
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: `${links}/${id}/schema/${schema}/tables` }} active><span className="datasource">{c}</span></Breadcrumb.Item>
                :
                <></>
            }
        </Breadcrumb>
        
    )
}

export default Breadcrumbs
