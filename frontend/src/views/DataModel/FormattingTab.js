import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'

//import api
import api from "../../api/metabaseApi"

//import format
import NoSettings from './format/NoSettings'
import LinkText from './format/LinkText'
import BarChartToggle from './format/BarChartToggle'
import CurrencyFormat from './format/CurrencyFormat'
import DateFormat from './format/DateFormat'

function FormattingTab(props) {

    const status = props.status
    const index = props.index

    const [field, setField] = useState([])
    const [fieldType, setFieldType] = useState("")

    //to get database table and display fields
    useEffect(() => {
        api.getTableIDMeta(status)
            .then( res => {
                console.log(res)
                
                res.data.fields.map((x, i) => {
                    
                    if(i == index){
                        console.log('data: ', x)
                        setField(x)
                        setFieldType(x.special_type)
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    let format
    if (fieldType == 'type/FK' || fieldType == 'type/Category' || fieldType == 'type/Company' || fieldType == 'type/Owner' || 
        fieldType == 'type/Subscription' || fieldType == 'type/User' || fieldType == 'type/Enum' || fieldType == 'type/Product' ||
        fieldType == 'type/Source' || fieldType == 'type/PK') {
            format = (
            <>
                <NoSettings/>
            </>
        )
    }
    else if(fieldType == 'type/Name' || fieldType == 'type/Comment' || fieldType == 'type/Description' || fieldType == 'type/Title' ||
            fieldType == 'type/Country' || fieldType == 'type/State' || fieldType == 'type/ZipCode' || fieldType == 'type/SerializedJSON') {
        format = (
            <>
                <LinkText/>
            </>
        )
    }
    else if(fieldType == 'type/Latitude' || fieldType == 'type/Longitude') {
        format = (
            <>
                <BarChartToggle/>
            </>
        )
    }
    else if(fieldType == 'type/Cost' ||  fieldType == 'type/Currency' ||  fieldType == 'type/Discount' || fieldType == 'type/GrossMargin' ||  
            fieldType == 'type/Income' ||  fieldType == 'type/Price' || fieldType == 'type/Quantity' || fieldType == 'type/Score' ||
            fieldType == 'type/Share') {
        format = (
            <>
                <CurrencyFormat status={status} index={index} />
            </>
        )
    }
    else if(fieldType == 'type/Birthdate' ||  fieldType == 'type/CancelationDate' ||  fieldType == 'type/CancelationTime' || fieldType == 'type/CancelationTimestamp' ||  
            fieldType == 'type/CreationDate' ||  fieldType == 'type/CreationTime' || fieldType == 'type/CreationTimestamp' || 
            fieldType == 'type/DeletionDate' || fieldType == 'type/DeletionTime' || fieldType == 'type/DeletionTimestamp' || 
            fieldType == 'type/UpdatedDate' || fieldType == 'type/UpdatedTime' || fieldType == 'type/UpdatedTimestamp' || 
            fieldType == 'type/JoinDate' || fieldType == 'type/JoinTime' || fieldType == 'type/JoinTimestamp') {
        format = (
            <>
                <DateFormat status={status} index={index} />
            </>
        )
    }
    else if(fieldType == 'type/Email') {
        format = (
            <>
                {/* to be added */}
            </>
        )
    }
    else if(fieldType == 'type/ISO8601DateTimeString' || fieldType == 'type/ISO8601TimeString' || fieldType == 'type/ISO8601DateString') {
        format = (
            <>
                {/* to be added */}
            </>
        )
    }
    else if(fieldType == 'type/UNIXTimestampMilliseconds' || fieldType == 'type/UNIXTimestampMicroseconds' || fieldType == 'type/UNIXTimestampSeconds') {
        format = (
            <>
                {/* to be added */}
            </>
        )
    }
    else if(fieldType == 'type/AvatarURL' || fieldType == 'type/ImageURL' || fieldType == 'type/URL') {
        format = (
            <>
                {/* to be added */}
            </>
        )
    }
    else {
        format = (
            <>
                <h2>Have settings</h2>
            </>
        )

    }

    return (
        <div>
            {format}
        </div>
    )
}

export default FormattingTab