import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'

function ScheduleTimeFilter(props) {
    const { filterTimeChanges, filterDayChanges, filterChanges, filterTime, filterDate, filterChange, changingOnThe, onThe, onTheChange, changeOnTheChange, oriChange, changeOriChange} = props


    let dailies
    if (filterChange === 'weekly') {
        dailies = (
            <>
                <Col md='1'>
                    <p>on</p>
                </Col>
                <Col md='3'>
                    <Form.Control
                        as="select"
                        value={oriChange}
                        onChange={changeOriChange}
                    >
                        <option value="sun">Sunday</option>
                        <option value="mon">Monday</option>
                        <option value="tue">Tuesday</option>
                        <option value="wed">Wednesday</option>
                        <option value="thu">Thursday</option>
                        <option value="fri">Friday</option>
                        <option value="sat">Saturday</option>
                    </Form.Control>
                </Col>
            </>
        )
    } else if (filterChange === 'monthly'){
        dailies = (
            <>
                <Col md='2'>
                    <p>on the</p>
                </Col>
                <Col md='3'>
                    <Form.Control
                        as="select"
                        value={onThe}
                        onChange={changingOnThe}
                    >
                        <option value="first">First</option>
                        <option value="last">Last</option>
                        <option value="mid">15th (Midpoint)</option>
                    </Form.Control>
                </Col>
                {onThe !== 'mid'?
                    <Col md='3'>
                        <Form.Control
                            as="select"
                            value={onTheChange}
                            onChange={changeOnTheChange}
                        >
                            <option value="cal">Calendar Day</option>
                            <option value="sun">Sunday</option>
                            <option value="mon">Monday</option>
                            <option value="tue">Tuesday</option>
                            <option value="wed">Wednesday</option>
                            <option value="thu">Thursday</option>
                            <option value="fri">Friday</option>
                            <option value="sat">Saturday</option>
                        </Form.Control>
                    </Col>
                    :
                    <>
                    </>
                }
                
            </>
        )
    }

    return (
        <>
            <Row>
                <Col md="1">
                    <p>Scan</p>
                </Col>
                <Col md="2">
                    <Form.Control
                        as="select"
                        value={filterChange}
                        onChange={filterChanges}
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </Form.Control>
                </Col>
                {dailies}
            </Row>
            <br/>
            <Row>
                <Col md="1">
                    <p>at</p>
                </Col>
                <Col md="2">
                    <Form.Control
                        as="select"
                        value={filterTime}
                        onChange={filterTimeChanges}
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
                        value={filterDate}
                        onChange={filterDayChanges}
                    >
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                    </Form.Control>
                </Col>
            </Row>
        </>
    )
}

export default ScheduleTimeFilter
