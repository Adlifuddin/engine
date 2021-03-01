import React, {useState} from 'react'
import Scheduling from './Scheduling'
import { Tab, Tabs} from 'react-bootstrap'

function SchedulingTab(props) {
    const [keys, setKeys] = useState('connection');
    const { filterChange,
            changeKey,
            filterTime,
            filterDate,
            filterTimeChanges,
            filterDayChanges,
            filterChanges,
            changes,
            time,
            day,
            onChanges,
            onDayChange,
            onTimeChange,
            changingOnThe,
            changeOnTheChange,
            onThe,
            onTheChange,
            oriChange,
            changeOriChange,
            children,
            activeKey,} = props
    
    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={keys}
            onSelect={(k) => setKeys(k)}
        >
            <Tab eventKey="connection" title="Connection">
                {children}
            </Tab>
            <Tab eventKey="schedule" title="Scheduling">
                <Scheduling
                    activeKey={activeKey}
                    changeKey={changeKey}
                    filterChange={filterChange}
                    filterTime={filterTime}
                    filterDate={filterDate}
                    filterTimeChanges={filterTimeChanges}
                    filterDayChanges={filterDayChanges}
                    filterChanges={filterChanges}
                    changes={changes}
                    time={time}
                    day={day}
                    onChanges={onChanges}
                    onDayChange={onDayChange}
                    onTimeChange={onTimeChange}
                    changingOnThe={changingOnThe}
                    changeOnTheChange={changeOnTheChange}
                    onThe={onThe}
                    onTheChange={onTheChange}
                    oriChange={oriChange}
                    changeOriChange={changeOriChange}
                />
            </Tab>
        </Tabs>
    )
}

export default SchedulingTab
