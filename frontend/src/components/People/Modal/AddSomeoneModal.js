import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Button, Modal, Form } from 'react-bootstrap'
import Select from 'react-select'


function AddSomeoneModal(props) {

    const[listGroup, setListGroup] = useState([])
    const[group,setgroup] = useState([])
    const url = "http://localhost:5000/api/people/createuser"


    useEffect(() => {
        axios
        .get("http://localhost:5000/api/people/listgroups")
        .then(res => {
            console.log(res.data)
            setListGroup(res.data)
        })
        .catch(err => {
            console.log(err)
        })    
    }, [])

    const [data,setData] = useState({
        firstname:"",
        lastname: "",
        email: "",
        groups:[group.value]
    })

    function handleChange(e){
        const newdata ={...data}
        newdata[e.target.name] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    function handlegroup(e){
        const newgroup = ([...group],e)
        setgroup(newgroup)
        setData(newgroup)
        // group.map(data => ({value:data.id, label:data.name}))
        console.log(newgroup)
        }


    function HandleSubmit(e){
        e.preventDefault()
        console.log(data)
        console.log(group)
    
}
    

    const options = listGroup.map(data => ({value:data.id,label:data.name}))

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    New User
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control onChange={(e)=> handleChange(e)} name="firstname" value={data.firstname} required type="text" placeholder="Johnny" />
                    </Form.Group>

                    <Form.Group controlId="formLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control onChange={(e)=> handleChange(e)} name="lastname" value={data.lastname} required type="text" placeholder="Appleseed" />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={(e)=> handleChange(e)} name="email" value={data.email} required type="email" placeholder="youlooknicetoday@email.com" />
                    </Form.Group>

                    <Form.Group controlId="formUserGroups">
                        <Form.Label>Groups</Form.Label>
                        <Select isMulti={true} Value={{value:listGroup.value},{label:listGroup.name}}  
                         onChange = {(e)=> handlegroup(e)}
                        options={options} required />
                    </Form.Group>

                    <Button className="float-right" variant="primary" type="submit" onSubmit={(e)=> HandleSubmit(e)}>
                        Create
                    </Button>
                    
                </Form>
                </Modal.Body>
            </Modal>

        </div>     
    )
}
export default AddSomeoneModal