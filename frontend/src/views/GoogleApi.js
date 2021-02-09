import React, { useState, useEffect } from 'react'
import { gapi } from 'gapi-script'
import axios from 'axios'
import logo from '../assets/images/google-drive.png'
import dotenv from 'dotenv'

function GoogleApi() {
  const [excel, setExcel] = useState([])

  dotenv.config()

    // The Browser API key obtained from the Google API Console.
    // Replace with your own Browser API key, or your own key.
    var developerKey = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;


    // The Client ID obtained from the Google API Console. Replace with your own Client ID.
    var clientId = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;

    // Replace with your own project number from console.developers.google.com.
    // See "Project number" under "IAM & Admin" > "Settings"
    var appId = process.env.REACT_APP_APP_ID;

    // Scope to use to access user's Drive items.
    var scope = ['https://www.googleapis.com/auth/drive.file'];

    var pickerApiLoaded = false;
    var oauthToken;

    // Use the Google API Loader script to load the google.picker script.
    function loadPicker() {
      gapi.load('auth', {'callback': onAuthApiLoad});
      gapi.load('picker', {'callback': onPickerApiLoad});
    }

    function onAuthApiLoad() {
      window.gapi.auth.authorize(
        {
            'apiKey': developerKey,
            'client_id': clientId,
            'scope': scope,
            'immediate': false
          },
          handleAuthResult);
    }

    function onPickerApiLoad() {
      pickerApiLoaded = true;
      createPicker();
    }

    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        oauthToken = authResult.access_token;
        createPicker();
      }
    }

    // Create and render a Picker object for searching images.
    function createPicker() {
      if (pickerApiLoaded && oauthToken) {
        var view = new window.google.picker.View(window.google.picker.ViewId.DOCS);
        var picker = new window.google.picker.PickerBuilder()
            .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
            .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
            .setAppId(appId)
            .setOAuthToken(oauthToken)
            .addView(view)
            .addView(new window.google.picker.DocsUploadView())
            .setDeveloperKey(developerKey)
            .setCallback(pickerCallback)
            .build();
         picker.setVisible(true);
      }
    }
  function pickerCallback(data) {
      if (data.action == window.google.picker.Action.PICKED) {
        var fileId = data.docs[0].id;

        axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${fileId}/values/A:F`, {
          headers: {
            Authorization: `Bearer ${oauthToken}`
          }
        })
          .then(response => {
            const url = response.request.responseURL
            console.log(url)
            setExcel(response.data.values)
          })
            .catch(error => {
            console.log(error)
          })
      }
  }

  

  return (
    <body>
      <div id="result"></div>
      {
        excel.map(results => (
          <div>{results}</div>
        ))
      }
      <button onClick={loadPicker}><img src={logo} height="32px" width="32px" alt="google-drive"/> Sign In to Google</button>
    </body>
  )
}

export default GoogleApi
