import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'

//import api
import api from "../../../api/metabaseApi"

function BarChartToggle(props) {

    const status = props.status
    const index = props.index

    const [field, setField] = useState([])

    const [id, setId] = useState("")
    const [miniBar, setMiniBar] = useState(false)

    useEffect(() => {
        api.getTableIDMeta(status)
            .then( res => {
                console.log(res)
                
                res.data.fields.map((x, i) => {

                    if(i == index){
                        
                        setField(x)

                        setId(x.id)

                        if(x.settings != null){

                            if(x.settings.show_mini_bar != null){
                                //to set mini bar
                                setMiniBar(x.settings.show_mini_bar)
                            }
                        }
                        
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const changeMB = (e) => {

        setMiniBar(e.target.checked)

        if(field.settings == null){
            
            field.settings = {
                show_mini_bar: e.target.checked
            }
        }
        else {

            var temp = field.settings
            
            field.settings = {
                ...temp,
                show_mini_bar: e.target.checked
            }
            
        }

        console.log('new settings: ', field, 'id: ', id)

        //to update mini bar
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
                    <Form style={{marginLeft: 20}}>
                        <Form.Label>Show a mini bar chart</Form.Label>
                        <Form.Check
                            id="minibar-switch"
                            type="switch"
                            required
                            checked={miniBar}
                            onChange={changeMB}
                        />
                    </Form>
                </Row>
            </Container>
        </>
    )
}

export default BarChartToggle
