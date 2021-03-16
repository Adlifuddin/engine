import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'

//import api
import api from "../../../api/metabaseApi"

function NumberStyle(props) {

    const status = props.status
    const index = props.index

    const [field, setField] = useState([])

    const [id, setId] = useState("")
    const [numberStyle, setNumberStyle] = useState("")

    useEffect(() => {
        api.getTableIDMeta(status)
            .then( res => {
                console.log(res)
                
                res.data.fields.map((x, i) => {

                    if(i == index){
                        
                        setField(x)
                        setId(x.id)

                        if(x.settings != null){

                            if(x.settings.number_style != null){
                                //to set number style
                                setNumberStyle(x.settings.number_style)
                            }
                        }
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    //to change number style
    const changeNumberStyle = (e) => {

        const numberStyle = e.target.value
        setNumberStyle(numberStyle)
        
        if(field.settings == null){
            
            field.settings = {
                number_style: numberStyle
            }
        }
        else {

            var temp = field.settings
            
            field.settings = {
                ...temp,
                number_style: numberStyle
            }
            
        }

        console.log('new settings: ', field, 'id: ', id)

        //to update number style
        api.updateField(field, id)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <Container fluid>
                <Row style={{marginTop: 20}}>
                    <Form style={{width: 400, marginLeft: 20}}>
                        <Form.Group>
                            <Form.Label>Style</Form.Label>
                            <Form.Control as="select" 
                                custom 
                                value={numberStyle}
                                onChange={changeNumberStyle}>
                                <option value="decimal">Normal</option>
                                <option value="percent">Percent</option>
                                <option value="scientific">Scientific</option>
                                <option value="currency">Currency</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
        </>
    )
}

export default NumberStyle