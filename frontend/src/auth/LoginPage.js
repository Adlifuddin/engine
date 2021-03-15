import React, {useState, useEffect} from 'react'
import {Form, Button, Container} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import metabaseApi from '../api/metabaseApi'
import api from '../api/index'
import dotenv from 'dotenv'
import logo from '../assets/images/Nexent_Favicon-Black (200x40px).svg'

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState([])
    const METABASE_JWT_URL = "https://dashboard-demo.nexent.co/auth/sso";

    const dispatch = useDispatch()

    dotenv.config()

    useEffect(() => {
        api.userCredentials()
            .then(res => {
                setUserData(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const onSubmits = (e) => {
        e.preventDefault()
        const data = {
            "username": email,
            "password": password,
        }

        const user = userData.find(user => user.email === email)

        const payload = {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                exp: Math.round(Date.now() / 1000) + (60 * 60) // 1 hour expiration
            }

        metabaseApi.session(data)
            .then(res => {
                localStorage.setItem("sessions", res.data.id)
                window.location.reload()
                // api.userPost(payload)
                //     .then(response => {
                //         const token = response.data.token
                //         const spliting = token.split('\'')
                //         window.location.href = `${METABASE_JWT_URL}?jwt=${spliting[1]}&return_to=/`
                //     })
                //     .catch(error => {
                //         console.log(error)
                //     })
                
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div id="signIn">
            <Container fluid>
                <img src={logo} alt="logo" id="nexentLogo"/>
                <Form onSubmit={onSubmits}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button style={{background: '#D1B186'}} type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        </div>
        
    )
}

export default LoginPage
