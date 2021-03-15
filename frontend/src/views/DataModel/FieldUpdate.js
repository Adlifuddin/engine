import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Form, Table, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import {TiTick} from 'react-icons/ti'

//import api
import api from "../../api/metabaseApi"

function FieldUpdate(props) {
    const status = props.status
    const index = props.index

    const [field, setField] = useState([])

    //save value
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [visibility, setVisibility] = useState("")
    const [fieldType, setFieldType] = useState("")
    const [filtering, setFiltering] = useState("")

    const [reScan, setReScan] = useState("nothing")
    const [discardValues, SetDiscardValues] = useState("nothing")

    //to get database table and display fields
    useEffect(() => {
        api.getTableIDMeta(status)
            .then( res => {
                console.log(res)
                res.data.fields.map((x, i) => {
                    // console.log(x)
                    // edit lagi sikit
                    if(i == index){
                        console.log('data: ', x)
                        
                        setField(x)
                        //to set the name
                        setId(x.id)
                        setName(x.display_name)
                        setVisibility(x.visibility_type)
                        setFieldType(x.special_type)
                        setFiltering(x.has_field_values)
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    //to change name
    const changeName = (e) => {
        const name = e.target.value
        setName(name)
        field.display_name = name
        console.log('new name: ', field)
        //to update name
        api.updateField(field, id)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    //to change visibility
    const changeVisibility = (e) => {
        const visibility = e.target.value
        setVisibility(visibility)
        field.visibility_type = visibility
        console.log('new visi: ', field)

        //to update visibility
        api.updateField(field, id)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    //to change field type
    const changeFieldType = (e) => {

        let f = e.target.value

        if(f == "null") {
            const fieldType = null
            setFieldType(fieldType)
            field.special_type = fieldType
            console.log('new type: ', field)
        }
        else {
            const fieldType = f
            setFieldType(fieldType)
            field.special_type = fieldType
            console.log('new type: ', field)
        }

        //to update type
        api.updateField(field, id)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

    }

    //to change filtering
    const changeFiltering = (e) => {
        const filtering = e.target.value
        setFiltering(filtering)
        field.has_field_values = filtering
        console.log('new filter: ', field)

        //to update filtering
        api.updateField(field, id)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    //get fieldtype
    const getFieldType = (e) => {

        if(e == null){
            return "null"
        }
        else {
            return e
        }
    }

    // rescan values
    const fieldReScan = () => {
        api.fieldReScan(field, id)
            .then(response => {
                const data = response.data
                console.log('status: ', data)
                console.log(response)
                setReScan("finish")
                window.setTimeout(() => {
                    setReScan("nothing")
                }, 2000)
            })
            .catch(error => {
                console.log(error)
                setReScan("nothing")
            })
    }

    let scan
    if (reScan === 'nothing') {
        scan = (
            <Button variant="light" onClick={fieldReScan} style={{width: 130, height: 40}}>Re-scan this field</Button>
        )
    } else if (reScan === 'finish') {
        scan = (
            <Button variant="success" style={{width: 130, height: 40}}><TiTick/>Scan triggered!</Button>
        )
    }

    // rescan values
    const fieldDiscard = () => {
        api.fieldDiscard(field, id)
            .then(response => {
                const data = response.data
                console.log('status: ', data)
                console.log(response)
                SetDiscardValues("finish")
                window.setTimeout(() => {
                    SetDiscardValues("nothing")
                }, 2000)
            })
            .catch(error => {
                console.log(error)
                SetDiscardValues("nothing")
            })
    }

    let discard
    if (discardValues === 'nothing') {
        discard = (
            <Button variant="danger" onClick={fieldDiscard} style={{width: 180, height: 40}}>Discard cached field values</Button>
        )
    } else if (discardValues === 'finish') {
        discard = (
            <Button variant="success" style={{width: 180, height: 40}}><TiTick/>Discard triggered!</Button>
        )
    }

    return (
        <div>
            <Container fluid>
                <Row style={{marginBottom: 50, marginTop: 20}}>
                    <Col>
                        {/* Field Form */}
                        <Row>
                            {/* name */}
                            <Form style={{width: 1000}}>
                                    <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        value = {name}
                                        onChange={changeName}
                                    />
                                    </Form.Group>
                            </Form>
                        </Row>
                        <Row>
                            {/* visibility */}
                            <Form style={{width: 1000}}>
                                    <Form.Group>
                                    <Form.Label>Visibility</Form.Label>
                                    <Form.Text className="text-muted" style={{marginBottom: 10}}>
                                        Where this field will appear throughout Nexent
                                    </Form.Text>
                                        <Form.Control as="select" 
                                            custom 
                                            value={visibility}
                                            onChange={changeVisibility} >
                                            <option value="details-only">Only in detail views</option>
                                            <option value="normal">Everywhere</option>
                                            <option value="sensitive">Do not include</option>
                                        </Form.Control>
                                    </Form.Group>
                            </Form>
                        </Row>
                        <Row>
                            {/* field type */}
                            <Form style={{width: 1000}}>
                                    <Form.Group>
                                    <Form.Label>Field Type</Form.Label>
                                    <Form.Control as="select" 
                                            custom 
                                            value={getFieldType(fieldType)}
                                            onChange={changeFieldType} >
                                            <option value="" disabled style={{fontWeight: "bold"}}>OVERALL ROW</option>
                                            <option value="type/PK">Entity Key</option>
                                            <option value="type/Name">Entity Name</option>
                                            <option value="type/FK" disabled style={{fontWeight: "bold"}}>COMMON</option>
                                            <option value="type/Category">Category</option>
                                            <option value="type/Comment">Comment</option>
                                            <option value="type/Description">Description</option>
                                            <option value="type/Number">Number</option>
                                            <option value="type/Title">Title</option>
                                            <option value="" disabled style={{fontWeight: "bold"}}>LOCATION</option>
                                            <option value="type/City">City</option>
                                            <option value="type/Latitude">Latitude</option>
                                            <option value="type/Longitude">Longitude</option>
                                            <option value="type/State">State</option>
                                            <option value="type/ZipCode">Zip Code</option>
                                            <option value="" disabled style={{fontWeight: "bold"}}>FINANCIAL</option>
                                            <option value="type/Cost">Cost</option>
                                            <option value="type/Currency">Currency</option>
                                            <option value="type/Discount">Discount</option>
                                            <option value="type/GrossMargin">Gross Margin</option>
                                            <option value="type/Income">Income</option>
                                            <option value="type/Price">Price</option>
                                            <option value="" disabled style={{fontWeight: "bold"}}>NUMERIC</option>
                                            <option value="type/Quantity">Quantity</option>
                                            <option value="type/Score">Score</option>
                                            <option value="type/Share">Share</option>
                                            <option value="" disabled style={{fontWeight: "bold"}}>PROFILE</option>
                                            <option value="type/Birthdate">Birthday</option>
                                            <option value="type/Company">Company</option>
                                            <option value="type/Email">Email</option>
                                            <option value="type/Owner">Owner</option>
                                            <option value="type/Subscription">Subscription</option>
                                            <option value="type/User">User</option>
                                            <option value="" disabled style={{fontWeight: "bold"}}>DATE AND TIME</option>
                                            <option value="type/CancelationDate">Cancelation date</option>
                                            <option value="type/CancelationTime">Cancelation time</option>
                                            <option value="type/CancelationTimestamp">Cancelation timestamp</option>
                                            <option value="type/CreationDate">Creation date</option>
                                            <option value="type/CreationTime">Creation time</option>
                                            <option value="type/CreationTimestamp">Creation timestamp</option>
                                            <option value="type/DeletionDate">Deletion date</option>
                                            <option value="type/DeletionTime">Deletion time</option>
                                            <option value="type/DeletionTimestamp">Deletion timestamp</option>
                                            <option value="type/UpdatedDate">Updated date</option>
                                            <option value="type/UpdatedTime">Updated time</option>
                                            <option value="type/UpdatedTimestamp">Updated timestamp</option>
                                            <option value="type/ISO8601DateTimeString">Text as a ISO-8601 timestamp</option>
                                            <option value="type/ISO8601TimeString">Text as a ISO-8601 time</option>
                                            <option value="type/ISO8601DateString">Text as a ISO-8601 date</option>
                                            <option value="type/JoinDate">Join date</option>
                                            <option value="type/JoinTime">Join time</option>
                                            <option value="type/JoinTimestamp">Join timestamp</option>
                                            <option value="type/UNIXTimestampMilliseconds">UNIX Timestamp (Milliseconds)</option>
                                            <option value="type/UNIXTimestampMicroseconds">UNIX Timestamp (Microseconds)</option>
                                            <option value="type/UNIXTimestampSeconds">UNIX Timestamp (Seconds)</option>
                                            <option value="" disabled style={{fontWeight: "bold"}}>CATEGORICAL</option>
                                            <option value="type/Enum">Enum</option>
                                            <option value="type/Product">Product</option>
                                            <option value="type/Source">Source</option>
                                            <option value="" disabled style={{fontWeight: "bold"}}>URLS</option>
                                            <option value="type/AvatarURL">Avatar Image URL</option>
                                            <option value="type/ImageURL">Image URL</option>
                                            <option value="type/URL">URL</option>
                                            <option value="" disabled style={{fontWeight: "bold"}}>OTHER</option>
                                            <option value="type/SerializedJSON">Field containing JSON</option>
                                            <option value="null">No special type</option>
                                        </Form.Control>
                                    </Form.Group>
                            </Form>
                        </Row>
                        <Row>
                            {/* display field type */}
                            <Form style={{width: 1000}}>
                                    <Form.Group>
                                    <Form.Label>Filtering on this field</Form.Label>
                                    <Form.Text className="text-muted" style={{marginBottom: 10}}>
                                        When this field is used in a filter, what should people use to enter the value they want to filter on?
                                    </Form.Text>
                                        <Form.Control as="select" 
                                            custom 
                                            value={filtering}
                                            onChange={changeFiltering} >
                                            <option value="search">Search Box</option>
                                            <option value="list">A list of all values</option>
                                            <option value="none">Plain input box</option>
                                        </Form.Control>
                                    </Form.Group>
                            </Form>
                        </Row>
                        <Row>
                            {/* display values - no changes made since would not change any values in db */}
                            <Form style={{width: 1000}}>
                                    <Form.Group>
                                    <Form.Label>Display values</Form.Label>
                                    <Form.Text className="text-muted" style={{marginBottom: 10}}>
                                        Choose to show the original value from the database, or have this field display associated or custom information.
                                    </Form.Text>
                                        <Form.Control as="select" 
                                            custom 
                                            value
                                            onChange >
                                            <option value="">Use original value</option>
                                        </Form.Control>
                                    </Form.Group>
                            </Form>
                        </Row>
                        <Row>
                            {/* cached field values */}
                            <Col>
                                <Row>
                                    <Form.Label>Cached field values</Form.Label>
                                </Row>
                                <Row>
                                    <Form.Text className="text-muted">
                                        Nexent can scan the values for this field to enable checkbox filters in dashboards and questions.
                                    </Form.Text>
                                </Row>
                                <Row style={{marginTop: 20}}>
                                    <Col md={1.5}>
                                    {scan}
                                    </Col>
                                    <Col md={10}>
                                    {discard}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}

export default FieldUpdate