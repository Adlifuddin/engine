import React, { useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component';
import logo from '../../assets/images/google-drive.png'
import dotenv from 'dotenv'
import GooglePicker from 'react-google-picker'
import { Button, Form  } from 'react-bootstrap'
import { Row, Col, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import spinner from '../../assets/images/Eclipse-1s-200px.svg'
import DataTableExtensions from 'react-data-table-component-extensions';
import './GoogleApi.css'
import api from '../../api/index'

function GoogleApi() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [sheets, setSheets] = useState([])
  const [ids, setIds] = useState("")
  const [oauthToken, setAuthToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [header, setHeader] = useState(["work"])
  const [visible, setVisible] = useState(true);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("")
  const [status, setStatus] = useState("")
  const [errorCode, setErrorCode] = useState("")

  const toggle = () => {
    setModal(!modal)
    setStatus("")
    setName("")
  };

  const onDismiss = () => setVisible(false);

  const tableData = {
    columns,
    data,
  }

  dotenv.config()

  // The Browser API key obtained from the Google API Console.
  // Replace with your own Browser API key, or your own key.
  var developerKey = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;
  
  var tokens;

  // The Client ID obtained from the Google API Console. Replace with your own Client ID.
  var clientId = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;

  // Scope to use to access user's Drive items.
  var scope = ['https://www.googleapis.com/auth/drive.file', "https://www.googleapis.com/auth/spreadsheets"];
  
  const processData = dataString => {
    const headers = dataString[0]
    setHeader(headers)
    if (headers.length === 0) {
      setVisible(true)
      return false
    }

    window.setTimeout(() => {
      setHeader(["work"])
      setVisible(false)
    }, 5000)

    const list = []
    for (let i = 1; i < dataString.length; i++) {
      const body = dataString[i]
      if (headers && body.length <= headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = body[j]
          if (d === undefined) {
            d = ""
            
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
          
        }
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
       
      }
    }

    const columns = headers.map(c => ({
      name: c,
      selector: c,
    }));

    setData(list);
    setColumns(columns);
  }

  const pickerCallback = (data) => {
    setData([])
    setHeader(["work"])
    setVisible(false)
    if (data.action == window.google.picker.Action.PICKED) {
        var fileId = data.docs[0].id;
        setIds(fileId)
        setLoading(true)
        setSheets([])
        axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${fileId}?key=${developerKey}`, {
          headers: {
            Authorization: `Bearer ${tokens}`

          }
        })
          .then(response => {
            const results = response.data.sheets
            const data = results.map(x => x.properties.title)
            axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${fileId}/values/A:AZ?key=${developerKey}`, {
                headers: {
                  Authorization: `Bearer ${tokens}`
                }
              })
              .then(responses => {
                setSheets(data)
                setLoading(false)
                console.log()
                const datas = responses.data.values
                processData(datas)
              })
              .catch(error => {
                console.log(error)
              })
          })
            .catch(error => {
            console.log(error)
          })
       
      }
  }

  const upload = (e) => {
    e.preventDefault()
    if (name === "") {
      setStatus("NameFailed")

      window.setTimeout(() => {
        setStatus("")
      }, 3000)

      return false
    }

    if (isNaN(name) === false) {
      setStatus("NameFailed")

      window.setTimeout(() => {
        setStatus("")
      }, 3000)

      return false
    }
    const myJsonString = JSON.parse(JSON.stringify(data))
    const n = name.toLowerCase()
    const h = n.replace(/\s/g, '')
    
    const i = h.replace(/[^-a-zA-Z_]/g, "")
    const j = i.replace(/[-]/g, "_")

    const file = [
      j,
      myJsonString
    ]
    setStatus('loading')
    api.uploadDrive(file)
      .then(response => {
        if (response.data.success && response.data) {
          setModal(false)
          setName("")
          setData([])
          setStatus("success")
          setVisible(true)
          window.setTimeout(() => {
            setStatus("")
            setVisible(false)
          }, 5000)
        }
      })
      .catch(error => {
        if (error.response.data && error.response.data.success === false) {
          setErrorCode(error.response.data.message)
          setStatus("Error")
        }
      })
  }
  

  const click = () => {
    setModal(true)
  }

  const changes = (e) => {
    setVisible(false)
    setHeader(['work'])
    setLoading(true)
    axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${ids}`, {
          headers: {
            Authorization: `Bearer ${oauthToken}`
          }
        })
      .then(response => {
        const results = response.data.sheets
        const data = results.map(x => x.properties.title)
        axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${ids}/values/${e.target.value}!A:AZ?key=${developerKey}`, {
                headers: {
                  Authorization: `Bearer ${oauthToken}`
                }
              })
            .then(responses => {
              setSheets(data)
              setLoading(false)
                const datas = responses.data.values
                processData(datas)
              })
              .catch(error => {
                console.log(error)
              })
      })
      .catch(error => {
        console.log(error)
      })
  }

  let sheet 
  if (data.length > 0) {
    sheet = (
      <Row className="justify-content-center" style={{ marginTop: "30px", marginBottom: "20px" }}>
        <Col md={{ offset: 1  }}>
          <Form onChange={changes}>
            <Form.Control as="select" >
              {
                sheets.map(x => (
                  <option value={x}>{x}</option>
                ))
              }
            </Form.Control>
          </Form>
        </Col>
        <Col md="2">
          <Button onClick={() => setModal(true)}>Upload</Button>
        </Col>
      </Row>
    )
  }

  let loadings
  if (loading === true) {
    loadings = (
      <div className="spinner" style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
        <img src={spinner} alt="spinner"/>
      </div>
    )
  } else if (loading === false) {
    loadings = (
      <DataTableExtensions {...tableData} style={{color: 'white'}} export={false} print={false}>
        <DataTable
          key={data}
          pagination
          highlightOnHover
          columns={columns}
          data={data}
        />
      </DataTableExtensions>
    )
  }

  let errors
  if (header.length === 0) {
    errors = (
      <Alert color="danger" isOpen={visible} toggle={onDismiss}>Please Make Sure The Header Is On The First Row Of The Spreadsheet</Alert>
    )
  }

  let statuss
  if (status === 'success') {
    statuss = (
      <Alert color="success" isOpen={visible} toggle={onDismiss}>Successfully uploaded to the Database</Alert>
    )
  } 

  let stats
  if (status === 'Error') {
    stats = (
      <Form.Control.Feedback type="invalid">
        {errorCode}
      </Form.Control.Feedback>
    )
  } else if (status === 'NameFailed') {
    stats = (
      <Form.Control.Feedback type="invalid">
        Invalid Table Name!
      </Form.Control.Feedback>
    )
  } else if (status === 'loading') {
    stats = (
      <Form.Control.Feedback type="valid">
        Uploading File Please Wait...
      </Form.Control.Feedback>
    )
  }


  return (
    <div>
      {statuss}
      {errors}
      <Row className="justify-content-center" style={{marginTop:"30px",marginBottom:"20px"}}>
        <GooglePicker
          clientId={clientId}
          developerKey={developerKey}
          scope={scope}
          multiselect={true}
          navHidden={true}
          authImmediate={false}
          createPicker={(google, oauthToken) => {
            const token = oauthToken
            setAuthToken(token)
            tokens = oauthToken
            const googleViewId = google.picker.ViewId.DOCS;
            const docsView = new google.picker.DocsView(googleViewId)
                .setMimeTypes('application/vnd.google-apps.spreadsheet')

            
            const picker = new window.google.picker.PickerBuilder()
                .addView(docsView)
                .setOAuthToken(oauthToken)
                .setDeveloperKey(developerKey)
                .setCallback(pickerCallback);
            picker.build().setVisible(true);
          }}
          >
          <Button variant="outline-primary"><img src={logo} height="32px" width="32px" alt="google-drive"/> Sign In to Google</Button>
          <div className="google"></div>
        </GooglePicker>
      </Row>
      <Modal isOpen={modal} toggle={toggle}>
        <Form>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter a Name for the Data" value={name} onChange={(e)=> setName(e.target.value)} isValid={status === "loading"} isInvalid={status === "NameFailed" || status === "Error"} />
              {stats}
          </Form.Group>
        </ModalBody>
        <ModalFooter>
          <Button variant="success" type="submit" onClick={upload}>Submit</Button>{' '}
          <Button variant="danger" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
      {sheet}
      {loadings}
    </div>
  )
}

export default GoogleApi
