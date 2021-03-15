import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Form, Table, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import {TiTick} from 'react-icons/ti'
import { FaChevronRight } from "react-icons/fa"
import Breadcrumbs from "./Breadcrumbs"

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
    const [table, setTable] = useState("")
    const [currency, setCurrency] = useState("")

    const [reScan, setReScan] = useState("nothing")
    const [discardValues, SetDiscardValues] = useState("nothing")
    const [targetValue, setTargetValue] = useState("nothing")

    //to get database table and display fields
    useEffect(() => {
        api.getTableIDMeta(status)
            .then( res => {
                console.log(res)
                
                res.data.fields.map((x, i) => {

                    if(i == index){
                        console.log('data: ', x)
                        
                        setField(x)
                        //to set the name
                        setId(x.id)
                        setName(x.display_name)
                        setVisibility(x.visibility_type)
                        setFieldType(x.special_type)
                        setFiltering(x.has_field_values)
                        setCurrency(x.settings.currency)
                        setTable(res.data.display_name)
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
                //to reload window
                window.location.reload()
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

    //to change currency
    const changeCurrency = (e) => {
        const currency = e.target.value
        setCurrency(currency)
        field.settings.currency = currency
        console.log('new currency: ', field)
        //to update currency
        api.updateField(field, id)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    let target
    if(fieldType == 'type/FK') {
        target = (
            <>
                <FaChevronRight style={{marginLeft: 20, marginTop: 40}}/>
                <Form style={{width: 400, marginBottom: 15, marginLeft: 20}}>
                    <Form.Label>Select a target</Form.Label>
                    <Form.Control as="select" 
                        custom
                        value
                        onChange >
                    </Form.Control>    
                </Form>
            </>
        )
    }
    else if (fieldType == 'type/Cost' ||  fieldType == 'type/Currency' ||  fieldType == 'type/Discount' ||  
        fieldType == 'type/GrossMargin' ||  fieldType == 'type/Income' ||  fieldType == 'type/Price') {
        target = (
            <>
                <FaChevronRight style={{marginLeft: 20, marginTop: 40}}/>
                <Form style={{width: 400, marginBottom: 15, marginLeft: 20, marginTop: 28}}>
                    
                    <Form.Control as="select" 
                        custom 
                        value={currency}
                        onChange={changeCurrency} >
                        <option value="USD">US Dollar</option>
                        <option value="CAD">Canadian Dollar</option>
                        <option value="EUR">Euro</option>
                        <option value="AED">United Arab Emirates Dirham</option>
                        <option value="AFN">Afghan Afghani</option>
                        <option value="ALL">Albanian Lek</option>
                        <option value="AMD">Armenian Dram</option>
                        <option value="ARS">Argentine Peso</option>
                        <option value="AUD">Australian Dollar</option>
                        <option value="AZN">Azerbaijani Manat</option>
                        <option value="BAM">Bosnia-Herzegovina Convertible Mark</option>
                        <option value="BDT">Bangladeshi Taka</option>
                        <option value="BGN">Bulgarian Lev</option>
                        <option value="BHD">Bahraini Dinar</option>
                        <option value="BIF">Burundian Franc</option>
                        <option value="BND">Brunei Dollar</option>
                        <option value="BOB">Bolivian Boliviano</option>
                        <option value="BRL">Brazilian Real</option>
                        <option value="BWP">Botswanan Pula</option>
                        <option value="BYR">Belarusian Ruble</option>
                        <option value="BZD">Belize Dollar</option>
                        <option value="CDF">Congolese Franc</option>
                        <option value="CHF">Swiss Franc</option>
                        <option value="CLP">Chilean Peso</option>
                        <option value="CNY">Chinese Yuan</option>
                        <option value="COP">Colombian Peso</option>
                        <option value="CRC">Costa Rican Colón</option>
                        <option value="CVE">Cape Verdean Escudo</option>
                        <option value="CZK">Czech Republic Koruna</option>
                        <option value="DJF">Djiboutian Franc</option>
                        <option value="DKK">Danish Krone</option>
                        <option value="DOP">Dominican Peso</option>
                        <option value="DZD">Algerian Dinar</option>
                        <option value="EEK">Estonian Kroon</option>
                        <option value="EGP">Egyptian Pound</option>
                        <option value="ERN">Eritrean Nakfa</option>
                        <option value="ETB">Ethiopian Birr</option>
                        <option value="GBP">British Pound Sterling</option>
                        <option value="GEL">Georgian Lari</option>
                        <option value="GHS">Ghanaian Cedi</option>
                        <option value="GNF">Guinean Franc</option>
                        <option value="GTQ">Guatemalan Quetzal</option>
                        <option value="HKD">Hong Kong Dollar</option>
                        <option value="HNL">Honduran Lempira</option>
                        <option value="HRK">Croatian Kuna</option>
                        <option value="HUF">Hungarian Forint</option>
                        <option value="IDR">Indonesian Rupiah</option>
                        <option value="ILS">Israeli New Sheqel</option>
                        <option value="INR">Indian Rupee</option>
                        <option value="IQD">Iraqi Dinar</option>
                        <option value="IRR">Iranian Rial</option>
                        <option value="ISK">Icelandic Króna</option>
                        <option value="JMD">Jamaican Dollar</option>
                        <option value="JOD">Jordanian Dinar</option>
                        <option value="JPY">Japanese Yen</option>
                        <option value="KES">Kenyan Shilling</option>
                        <option value="KHR">Cambodian Riel</option>
                        <option value="KMF">Comorian Franc</option>
                        <option value="KRW">South Korean Won</option>
                        <option value="KWD">Kuwaiti Dinar</option>
                        <option value="KZT">Kazakhstani Tenge</option>
                        <option value="LBP">Lebanese Pound</option>
                        <option value="LKR">Sri Lankan Rupee</option>
                        <option value="LTL">Lithuanian Litas</option>
                        <option value="LVL">Latvian Lats</option>
                        <option value="LYD">Libyan Dinar</option>
                        <option value="MAD">Moroccan Dirham</option>
                        <option value="MDL">Moldovan Leu</option>
                        <option value="MGA">Malagasy Ariary</option>
                        <option value="MKD">Macedonian Denar</option>
                        <option value="MMK">Myanma Kyat</option>
                        <option value="MOP">Macanese Pataca</option>
                        <option value="MUR">Mauritian Rupee</option>
                        <option value="MXN">Mexican Peso</option>
                        <option value="MYR">Malaysian Ringgit</option>
                        <option value="MZN">Mozambican Metical</option>
                        <option value="NAD">Namibian Dollar</option>
                        <option value="NGN">Nigerian Naira</option>
                        <option value="NIO">Nicaraguan Córdoba</option>
                        <option value="NOK">Norwegian Krone</option>
                        <option value="NPR">Nepalese Rupee</option>
                        <option value="NZD">New Zealand Dollar</option>
                        <option value="OMR">Omani Rial</option>
                        <option value="PAB">Panamanian Balboa</option>
                        <option value="PEN">Peruvian Nuevo Sol</option>
                        <option value="PHP">Philippine Peso</option>
                        <option value="PKR">Pakistani Rupee</option>
                        <option value="PLN">Polish Zloty</option>
                        <option value="PYG">Paraguayan Guarani</option>
                        <option value="QAR">Qatari Rial</option>
                        <option value="RON">Romanian Leu</option>
                        <option value="RSD">Serbian Dinar</option>
                        <option value="RUB">Russian Ruble</option>
                        <option value="RWF">Rwandan Franc</option>
                        <option value="SAR">Saudi Riyal</option>
                        <option value="SDG">Sudanese Pound</option>
                        <option value="SEK">Swedish Krona</option>
                        <option value="SGD">Singapore Dollar</option>
                        <option value="SOS">Somali Shilling</option>
                        <option value="SYP">Syrian Pound</option>
                        <option value="THB">Thai Baht</option>
                        <option value="TOP">Tongan Pa'anga</option>
                        <option value="TRY">Turkish Lira</option>
                        <option value="">Trinidad and Tobago Dollar</option>
                        <option value="TWD">New Taiwan Dollar</option>
                        <option value="TZS">Tanzanian Shilling</option>
                        <option value="UAH">Ukrainian Hryvnia</option>
                        <option value="UGX">Ugandan Shilling</option>
                        <option value="UYU">Uruguayan Peso</option>
                        <option value="UZS">Uzbekistan Som</option>
                        <option value="VEF">Venezuelan Bolivar</option>
                        <option value="VND">Vietnamese Dong</option>
                        <option value="XAF">CFA Franc BEAC</option>
                        <option value="XOF">CFA Franc BCEAD</option>
                        <option value="YER">Yemeni Rial</option>
                        <option value="ZAR">South African Rand</option>
                        <option value="ZMK">Zambian Kwacha</option>
                    </Form.Control>    
                </Form>
            </>
        )
    }
    else {
        target = (
            <></>
        )
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
                <Row style={{marginTop: 20, marginLeft: -30}}>
                    <Breadcrumbs
                    tableName={table}
                    fieldName={name + " - Field Setting"}
                    />
                </Row>
                <Row style={{marginBottom: 50}}>
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
                            
                                <Form style={{width: 400}}>
                                        <Form.Group>
                                        <Form.Label>Field Type</Form.Label>
                                        <Form.Control as="select" 
                                                custom 
                                                value={getFieldType(fieldType)}
                                                onChange={changeFieldType} >
                                                <option value="" disabled style={{fontWeight: "bold"}}>OVERALL ROW</option>
                                                <option value="type/PK">Entity Key</option>
                                                <option value="type/Name">Entity Name</option>
                                                <option value="type/FK">Foreign Key</option>
                                                <option value="" disabled style={{fontWeight: "bold"}}>COMMON</option>
                                                <option value="type/Category">Category</option>
                                                <option value="type/Comment">Comment</option>
                                                <option value="type/Description">Description</option>
                                                <option value="type/Number">Number</option>
                                                <option value="type/Title">Title</option>
                                                <option value="" disabled style={{fontWeight: "bold"}}>LOCATION</option>
                                                <option value="type/City">City</option>
                                                <option value="type/Country">Country</option>
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
                                {target}
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