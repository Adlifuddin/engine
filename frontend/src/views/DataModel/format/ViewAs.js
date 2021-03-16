import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'

//import api
import api from "../../../api/metabaseApi"

export default function ViewAs(props) {

    const status = props.status
    const index = props.index

    const [field, setField] = useState([])

    const [id, setId] = useState("")
    const [view, setView] = useState("")

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
                                //to set view
                                setView(x.settings.view_as)
                            }
                        }
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    //to change view
    const changeView = (e) => {

        var view = e.target.value
        setView(view)
        
        if(field.settings == null){

            if(view == 'null'){
                field.settings = {
                    view_as: null
                }
            }
            else {
                field.settings = {
                    view_as: view
                }
            }
        }
        else {

            var temp = field.settings

            if(view == 'null'){
                field.settings = {
                    ...temp,
                    view_as: null
                }
            }
            else {
                field.settings = {
                    ...temp,
                    view_as: view
                }
            }
            
        }

        console.log('new settings: ', field, 'id: ', id)

        //to update view
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
                            <Form.Label>View as link or image</Form.Label>
                            <Form.Control as="select" 
                                custom 
                                value={view}
                                onChange={changeView}>
                                <option value="null">Off</option>
                                <option value="email_link">Email link</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
        </>
    )
}
