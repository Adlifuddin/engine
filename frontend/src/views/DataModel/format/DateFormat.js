import React from 'react'
import { Container, Row, Col, Tabs, Tab, Button, Form } from "react-bootstrap";
import { useState, useEffect } from 'react'

export default function DateFormat() {

    const [dateStyle, setDateStyle] = useState("MMMM D, YYYY");
    const [dateSeperator, setDateSeperator] = useState("/");
    const [dateAbbreviate, setDateAbbreviate] = useState("false");
    const [timeEnabled, setTimeEnabled] = useState("minutes");
    const [timeStyle, setTimeStyle] = useState("h:mm A");

    const changeDateStyle = (e) => {
        setDateStyle(e.target.value);
    };

    const changeDateSeperator = (e) => {
        setDateSeperator(e.target.value);
    };

    const changeDateAbbrebviate = (e) => {
        setDateAbbreviate(e.target.value);
    };

    const changeTimeEnabled = (e) => {
        setTimeEnabled(e.target.value);
    };

    const changeTimeStyle = (e) => {
        setTimeStyle(e.target.value);
    };

    return (
        <>
        <Container fluid>
            <Row style={{ marginBottom: 50, marginTop: 20 }}>
                <Col>
                    <Row>
                    {/*Date style*/
                    /*date_style*/}
                    <Form style={{ width: 1000 }}>
                        <Form.Group>
                        <Form.Label>Date style</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            value={dateStyle}
                            onChange={changeDateStyle}
                        >
                            <option value="MMMM D, YYYY">January 7, 2018</option>
                            <option value="D MMMM, YYYY">7 January, 2018</option>
                            <option value="dddd, MMMM D, YYYY">
                            Sunday, January 7, 2018
                            </option>
                            <option value="M/D/YYYY">
                            1/7/2018 (month, day, year)
                            </option>
                            <option value="YYYY/M/D">
                            2018/1/7 (year, month, day)
                            </option>
                        </Form.Control>
                        </Form.Group>
                    </Form>
                    </Row>
                    <Row>
                    {/*Date seperators*/
                    /*date_seperator*/}
                    <Form style={{ width: 1000 }}>
                        <Form.Group>
                        <Form.Label>Date seperators</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            value={dateSeperator}
                            onChange={changeDateSeperator}
                        >
                            <option value="/">M/D/YYYY</option>
                            <option value="-">M-D-YYYY</option>
                            <option value=".">M.D.YYYY</option>
                        </Form.Control>
                        </Form.Group>
                    </Form>
                    </Row>
                    <Row>
                    {/*Abbreviate names of days and months*/
                    /*date_abbreviate*/}
                    <Form style={{ width: 1000 }}>
                        <Form.Group>
                        <Form.Label>Abbreviate names of days and months</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            value={dateAbbreviate}
                            onChange={changeDateAbbrebviate}
                        >
                            <option value="true">On</option>
                            <option value="false">Off</option>
                        </Form.Control>
                        </Form.Group>
                    </Form>
                    </Row>
                    <Row>
                    {/*Show the time*/
                    /*time_enabled*/}
                    <Form style={{ width: 1000 }}>
                        <Form.Group>
                        <Form.Label>Show the time</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            value={timeEnabled}
                            onChange={changeTimeEnabled}
                        >
                            <option value="null">Off</option>
                            <option value="minutes">HH:MM</option>
                            <option value="seconds">HH:MM:SS</option>
                            <option value="milliseconds">HH:MM:SS:MS</option>
                        </Form.Control>
                        </Form.Group>
                    </Form>
                    </Row>
                    <Row>
                    {/*Time style*/
                    /*time_styled*/}
                    <Form style={{ width: 1000 }}>
                        <Form.Group>
                        <Form.Label>Time style</Form.Label>
                        <Form.Control
                            as="select"
                            custom
                            value={timeStyle}
                            onChange={changeTimeStyle}
                        >
                            <option value="h:mm A">5.24 PM (12-hour clock)</option>
                            <option value="k:mm">17.24 (24-hour clock)</option>
                        </Form.Control>
                        </Form.Group>
                    </Form>
                    </Row>
                </Col>
            </Row>
        </Container>
        </>
    )
}
