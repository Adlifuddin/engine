import React from 'react'
import { Form } from 'react-bootstrap'

function FormComponent(props) {
    const { engine, inputting, name } = props
    
    let additional
    if (engine === 'bigquery') {
        additional = (
            <Form.Text>Nexent connects to Big Query via Service Accounts.</Form.Text>
        )
    }

    return (
        <>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Database Type</Form.Label>
                <Form.Control as="select" custom value={engine} onChange={inputting("engine")}>
                    <option value="redshift">Amazon Redshift</option>
                    <option value="bigquery">BigQuery</option>
                    <option value="druid">Druid</option>
                    <option value="googleanalytics">Google Analytics</option>
                    <option value="h2">H2</option>
                    <option value="mongo">MongoDB</option>
                    <option value="mysql">MySQL</option>
                    <option value="postgres">PostgreSQL</option>
                    <option value="presto">Presto</option>
                    <option value="snowflake">Snowflake</option>
                    <option value="sparksql">SparkSQL</option>
                    <option value="sqlserver">SQL Server</option>
                    <option value="sqlite">SQLite</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    required
                    value={name}    
                    placeholder="How would you like to refer to this database"
                    onChange={inputting("name")}
                />
                {additional}
            </Form.Group>
        </>
    )
}

export default FormComponent
