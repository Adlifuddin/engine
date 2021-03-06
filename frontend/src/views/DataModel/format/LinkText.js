import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'

//import api
import api from "../../../api/metabaseApi"

function LinkText(props) {

    const status = props.status
    const index = props.index

    const [field, setField] = useState([])

    const [id, setId] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {
        api.getTableIDMeta(status)
            .then( res => {
                console.log(res)
                
                res.data.fields.map((x, i) => {

                    if(i == index){
                        
                        setField(x)
                        setId(x.id)

                        if(x.settings != null){

                            if(x.settings.link_text != null){
                                //to set text
                                setText(x.settings.link_text)
                            }
                        }
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    //to change text
    const changeText = (e) => {

        const text = e.target.value
        setText(text)

        if(field.settings == null){
            
            field.settings = {
                link_text: text
            }
        }
        else {

            var temp = field.settings
            
            field.settings = {
                ...temp,
                link_text: text
            }
            
        }

        console.log('new settings: ', field, 'id: ', id)

        //to update text
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
                            <Form.Label>Link Text</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={text}
                                onChange={changeText}
                            />
                            </Form.Group>
                    </Form>
                </Row>
            </Container>
        </>
    )
}

export default LinkText