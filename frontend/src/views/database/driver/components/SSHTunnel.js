import React, {useState, useEffect}  from 'react'
import { Form } from 'react-bootstrap'

function SSHTunnel(props) {
const [sshTunnelOn, setSshTunnelOn] = useState(false)
const { inputting,
        sshTunnel,
        tunnelHost,
        tunnelPort,
        tunnelUser,
        sshAuth,
        tunnelPrivateKey,
        tunnelPassword} = props
    useEffect(() => {
        if (sshTunnel) {
            setSshTunnelOn(true)
        } else {
            setSshTunnelOn(false)
        }
    }, [sshTunnel])


    let forms
    if (sshAuth === "password") {
        forms = (
            <Form.Group controlId="formBasicSSHPrivateKey">
                <Form.Label>SSH Tunnel Password</Form.Label>
                <Form.Control
                    type="password"
                    value={tunnelPassword}    
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    onChange={inputting("tunnelPassword")}
                />
            </Form.Group>
        )
    } else if(sshAuth === "ssh-key") {
        forms = (
            <>
                <Form.Group controlId="formBasicSSHPrivateKey">
                    <Form.Label>SSH private key</Form.Label>
                    <Form.Control
                        type="text"
                        value={tunnelPrivateKey}
                        required
                        placeholder="What username do you use to login to the SSH tunnel?"
                        onChange={inputting("tunnelPrivateKey")}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicSSHPrivateKey">
                    <Form.Label>Passphrase for the SSH private key</Form.Label>
                    <Form.Control
                        type="password"
                        value={tunnelPassword}
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        onChange={inputting("tunnelPassword")}
                    />
                </Form.Group>
            </>
        )
    }


    if (sshTunnelOn) {
        return (
            <>
                <Form.Group controlId="formBasicTunnelHost">
                    <Form.Label>SSH tunnel host</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        value={tunnelHost}    
                        placeholder="What hostname do you use to connect to the SSH tunnel?"
                        onChange={inputting("tunnelHost")}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTunnelPort">
                    <Form.Label>SSH tunnel port</Form.Label>
                    <Form.Control
                        type="text"
                        value={tunnelPort}    
                        placeholder="What hostname do you use to connect to the SSH tunnel?"
                        onChange={inputting("tunnelPort")}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicTunnelHost">
                    <Form.Label>SSH tunnel username</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        value={tunnelUser}
                        placeholder="What username do you use to login to the SSH tunnel?"
                        onChange={inputting("tunnelUser")}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicSSHAuth">
                    <Form.Label>SSH Authentication</Form.Label>
                    <Form.Control as="select" custom value={sshAuth} onChange={inputting("sshAuth")}>
                        <option value="ssh-key">SSH Key</option>
                        <option value="password">Password</option>
                    </Form.Control>
                </Form.Group>
                {forms}
            </>
        )
    } else {
        return null
    }
}

export default SSHTunnel
