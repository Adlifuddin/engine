import React from 'react'
import { Container, Row, Col, Tabs, Tab, Button, Form } from "react-bootstrap";
import { IoArrowBackSharp } from "react-icons/io5";
import { useState, useEffect } from 'react'

function CurrencyFormat() {

    const [miniBar, setMiniBar] = useState("false");
    const [currency, setCurrency] = useState("USD");
    const [currencyLabelStyle, setCurrencyLabelStyle] = useState("symbol");
    const [currencyInHeader, setCurrencyInHeader] = useState("true");
    const [numberSeperators, setNumberSeperators] = useState(".,");
    const [decimals, setDecimals] = useState("");
    const [scale, setScale] = useState("1");
    const [prefix, setPrefix] = useState("");
    const [suffix, setSuffix] = useState("");

    const changeMiniBar = (e) => {
        setMiniBar(e.target.value);
    };

    const changeCurrency = (e) => {
        setCurrency(e.target.value);
    };

    const changeCurrencyLabelStyle = (e) => {
        setCurrencyLabelStyle(e.target.value);
    };

    const changeCurrencyInHeader = (e) => {
        setCurrencyInHeader(e.target.value);
    };

    const changeNumberSeperators = (e) => {
        setNumberSeperators(e.target.value);
    };

    const changeDecimals = (e) => {
        setDecimals(e.target.value);
    };

    const changeScale = (e) => {
        setScale(e.target.value);
    };

    const changePrefix = (e) => {
        setPrefix(e.target.value);
    };

    const changeSuffix = (e) => {
        setSuffix(e.target.value);
    };


    return (
        <>
        <Container fluid>
            <Row style={{ marginBottom: 50, marginTop: 20 }}>
                <Col>
                    <Row>
                    {/*Show a mini bar chart*/
                    /*show_mini_bar*/}
                    <Form style={{ width: 1000 }}>
                        <Form.Group>
                        <Form.Label>Show a mini bar chart</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            value={miniBar}
                            onChange={changeMiniBar}
                        >
                            <option value="true">On</option>
                            <option value="false">Off</option>
                        </Form.Control>
                        </Form.Group>
                    </Form>
                    </Row>
                    <Row>
                    {/*Unit of currency*/
                    /*currency*/}
                    <Form style={{ width: 1000 }}>
                        <Form.Group>
                        <Form.Label>Unit of currency</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            value={currency}
                            onChange={changeCurrency}
                        >
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
                            <option value="BAM">
                            Bosnia-Herzegovina Convertible Mark
                            </option>
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
                            <option value="TTD">Trinidad and Tobago Dollar</option>
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
                        </Form.Group>
                    </Form>
                    </Row>
                    <Row>
                    {/*Currency label style*/
                    /*currency_style*/}
                    <Form style={{ width: 1000 }}>
                        <Form.Group>
                        <Form.Label>Currency label style</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            value={currencyLabelStyle}
                            onChange={changeCurrencyLabelStyle}
                        >
                            <option value="symbol">Symbol</option>
                            <option value="code">Code</option>
                            <option value="name">Name</option>
                        </Form.Control>
                        </Form.Group>
                    </Form>
                    </Row>
                    <Row>
                    {/*Where to display the unit of currency*/
                    /*currency_in_header*/}
                    <Form style={{ width: 1000 }}>
                        <Form.Group>
                        <Form.Label>Where to display the unit of currency</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            value={currencyInHeader}
                            onChange={changeCurrencyInHeader}
                        >
                            <option value="true">In the column heading</option>
                            <option value="false">In every table cell</option>
                        </Form.Control>
                        </Form.Group>
                    </Form>
                    </Row>
                    <Row>
                    {/*Seperator style*/
                    /*number_seperators*/}
                    <Form style={{ width: 1000 }}>
                        <Form.Group>
                        <Form.Label>Seperator style</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            value={numberSeperators}
                            onChange={changeNumberSeperators}
                        >
                            <option value=".,">100,000.00</option>
                            <option value=",">100 000,00</option>
                            <option value=",.">100.000,00</option>
                            <option value=".">100000.00</option>
                            <option value=".'">100'000.00</option>
                        </Form.Control>
                        </Form.Group>
                    </Form>
                    </Row>
                    <Row>
                    {/* Minimum number of decimal places */
                    /* decimals */}
                    <Form style={{ width: 1000 }}>
                        <Form.Group>
                        <Form.Label>Minimum number of decimal places</Form.Label>
                        <Form.Control
                            type="number"
                            value={decimals}
                            onChange={changeDecimals}
                        />
                        </Form.Group>
                    </Form>
                    </Row>
                    <Row>
                    {/* Multiply by a number */
                    /* scale */}
                    <Form style={{ width: 1000 }}>
                        <Form.Group>
                        <Form.Label>Multiply by a number</Form.Label>
                        <Form.Control
                            type="number"
                            value={scale}
                            onChange={changeScale}
                        />
                        </Form.Group>
                    </Form>
                    </Row>
                    <Row>
                    {/* Add a prefix */
                    /* prefix */}
                    <Form style={{ width: 1000 }}>
                        <Form.Group>
                        <Form.Label>Add a prefix</Form.Label>
                        <Form.Control
                            type="text"
                            value={prefix}
                            onChange={changePrefix}
                        />
                        </Form.Group>
                    </Form>
                    </Row>
                    <Row>
                    {/* Add a suffix */
                    /* suffix */}
                    <Form style={{ width: 1000 }}>
                        <Form.Group>
                        <Form.Label>Add a suffix</Form.Label>
                        <Form.Control
                            type="text"
                            value={suffix}
                            onChange={changeSuffix}
                        />
                        </Form.Group>
                    </Form>
                    </Row>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default CurrencyFormat