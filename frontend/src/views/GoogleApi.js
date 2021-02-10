import React, { useState } from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component';
import logo from '../assets/images/google-drive.png'
import dotenv from 'dotenv'
import GooglePicker from 'react-google-picker'

function GoogleApi() {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [sheets, setSheets] = useState([])
  const [ids, setIds] = useState("")
  const [oauthToken, setAuthToken] = useState("")

  dotenv.config()

    // The Browser API key obtained from the Google API Console.
    // Replace with your own Browser API key, or your own key.
  var developerKey = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;
  
  var tokens;


    // The Client ID obtained from the Google API Console. Replace with your own Client ID.
    var clientId = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;

    // Scope to use to access user's Drive items.
    var scope = ['https://www.googleapis.com/auth/drive.file'];
  
  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
 
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length === headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"')
              d = d.substring(d.length - 2, 1);
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
    if (data.action == window.google.picker.Action.PICKED) {
        var fileId = data.docs[0].id;
        setIds(fileId)
        setSheets([])
        axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${fileId}`, {
          headers: {
            Authorization: `Bearer ${tokens}`

          }
        })
          .then(response => {
            const results = response.data.sheets
            const data = results.map(x => x.properties.title)
            axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${fileId}/values/A:Z?key=${developerKey}`, {
                headers: {
                  Authorization: `Bearer ${tokens}`
                }
              })
              .then(responses => {
                setSheets(data)
                const datas = responses.data.values
                const file = datas.join("\n")
                processData(file)
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

  const upload = () => {
    const myJsonString = JSON.parse(JSON.stringify(data))
    console.log(myJsonString)
  }

  const changes = (e) => {
    axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${ids}`, {
          headers: {
            Authorization: `Bearer ${oauthToken}`

          }
        })
      .then(response => {
        const results = response.data.sheets
        const data = results.map(x => x.properties.title)
        axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${ids}/values/${e.target.value}!A:Z?key=${developerKey}`, {
                headers: {
                  Authorization: `Bearer ${oauthToken}`
                }
              })
            .then(responses => {
                setSheets(data)
                const datas = responses.data.values
                const file = datas.join("\n")
                processData(file)
              })
              .catch(error => {
                console.log(error)
              })
      })
      .catch(error => {
        console.log(error)
      })
    
  }

  

  return (
    <body>
      <div id="result"></div>
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
          <button><img src={logo} height="32px" width="32px" alt="google-drive"/> Sign In to Google</button>
          <div className="google"></div>
        </GooglePicker>
      <button onClick={upload}>Upload</button>
        <select onChange={changes}>
          {
            sheets.map(x => (
              <option value={x}>{x}</option>
            ))
          }
      </select>
        <DataTable
          pagination
          highlightOnHover
          columns={columns}
          data={data}
        />
    </body>
  )
}

export default GoogleApi
