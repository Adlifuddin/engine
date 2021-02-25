import React from 'react'
import {Row, Col, Form} from 'react-bootstrap'

function ScheduleTime(props) {
    const { time, onTimeChange, day, onDayChange, changes, onChanges } = props

    let dailies
    if (changes === 'daily') {
        dailies = (
            <Row>
                <Col md="1">
                    <p>at</p>
                </Col>
                <Col md="2">
                    <Form.Control
                        as="select"
                        value={time}
                        onChange={onTimeChange}
                    >
                        <option value="0">12:00</option>
                        <option value="1">1:00</option>
                        <option value="2">2:00</option>
                        <option value="3">3:00</option>
                        <option value="4">4:00</option>
                        <option value="5">5:00</option>
                        <option value="6">6:00</option>
                        <option value="7">7:00</option>
                        <option value="8">8:00</option>
                        <option value="9">9:00</option>
                        <option value="10">10:00</option>
                        <option value="11">11:00</option>
                    </Form.Control>
                </Col>
                <Col md="2">
                    <Form.Control
                        as="select"
                        value={day}
                        onChange={onDayChange}
                    >
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </Form.Control>
                </Col>
            </Row>
        )
    }


    return (
        <>
            <Row>
                <Col md="1">
                    <p style={{marginTop: "15px"}}>Scan</p>
                </Col>
                <Col md="2">
                    <Form.Control
                        as="select"
                        value={changes}
                        onChange={onChanges}
                    >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                    </Form.Control>
                </Col>
            </Row>
            <br/>
            {dailies}
        </>
    )
}

export default ScheduleTime
