import React from 'react'
import { Card, CardHeader } from 'reactstrap'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { CardColor, CardHeaderColor } from '../../components/customStyle/DatabaseColor'
function Database(props) {
    const {b} = props

    return (
        <Card style={CardColor}>
            <CardHeader style={CardHeaderColor}>
                <Breadcrumbs b={b} active={true} a="Databases" links="/database"/>
            </CardHeader>
            {props.children}
        </Card>
    )
}

export default Database
