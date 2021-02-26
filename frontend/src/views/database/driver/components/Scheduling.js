import React, { useState, useContext } from 'react'
import { Form, Accordion, Card, useAccordionToggle, AccordionContext, Button  } from 'react-bootstrap'
import ScheduleTime from './ScheduleTime'
import ScheduleTimeFilter from './ScheduleTimeFilter'
import { TiTickOutline } from 'react-icons/ti'

function Scheduling(props) {
    const { changeKey, changes, time, day, onChanges, onDayChange, onTimeChange, filterTimeChanges, filterDayChanges, filterChanges, filterTime, filterDate, filterChange, changingOnThe, onThe, onTheChange, changeOnTheChange, oriChange, changeOriChange } = props

    function ContextAwareToggle({ children, eventKey, callback }) {
        const currentEventKey = useContext(AccordionContext);

        const decoratedOnClick = useAccordionToggle(
            eventKey,
            () => callback && callback(eventKey),
        );

        const isCurrentEventKey = currentEventKey === eventKey;

        return (
            <Button
                type="button"
                style={{ backgroundColor: isCurrentEventKey ? '#90ee90' : 'white', color: 'black' }}
                onClick={decoratedOnClick}
            >
                {children}
                {isCurrentEventKey ? <TiTickOutline/> : <></>}
            </Button>
        );
    }
        return (
            <>
                <Form.Group controlId="formBasicDatabaseSync">
                    <Form.Label>Database syncing</Form.Label>
                    <Form.Text>This is a lightweight process that checks for updates to this database’s schema. In most cases, you should be fine leaving this set to sync hourly.</Form.Text>
                    <br/>
                    <ScheduleTime time={time} day={day} onDayChange={onDayChange} onTimeChange={onTimeChange} changes={changes} onChanges={onChanges} />
                </Form.Group>
                 <Form.Group controlId="formBasicFiltering">
                    <Form.Label>Scanning for Filter Values</Form.Label>
                    <Form.Text>
                        Nexent can scan the values present in each field in this database to enable checkbox filters in dashboards and questions. 
                        This can be a somewhat resource-intensive process, particularly if you have a very large database.
                        When should Nexent automatically scan and cache field values?
                    </Form.Text>
                    <br/>
                    <Accordion onSelect={(e) => changeKey(e)}>
                        <Card>
                            <Card.Body>
                                <ContextAwareToggle eventKey="0" keys="0">Regularly, on a schedule</ContextAwareToggle>
                            </Card.Body>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <ScheduleTimeFilter id="example-collapse-text"
                                        filterTimeChanges={filterTimeChanges}
                                        filterDayChanges={filterDayChanges}
                                        filterChanges={filterChanges}
                                        filterTime={filterTime}
                                        filterDate={filterDate}
                                        filterChange={filterChange}
                                        changingOnThe={changingOnThe}
                                        changeOnTheChange={changeOnTheChange}
                                        onThe={onThe}
                                        onTheChange={onTheChange}
                                        oriChange={oriChange}
                                        changeOriChange={changeOriChange}
                                    />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Body>
                                <ContextAwareToggle eventKey="1" keys="1">Only when adding a new filter widget</ContextAwareToggle>
                            </Card.Body>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    When a user adds a new filter to a dashboard or a SQL question, 
                                    Nexent will scan the field(s) mapped to that filter in order to show the list of selectable values.
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Body>
                                <ContextAwareToggle eventKey="2" keys="2">Never, I'll do this manually if I need to</ContextAwareToggle>
                            </Card.Body>
                        </Card>
                    </Accordion>
                </Form.Group>
            </>
        )
    }

export default Scheduling
