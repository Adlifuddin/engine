import React, {useEffect} from 'react'
import './App.css';
import { Route, Switch, withRouter } from "react-router";
import Layouts from './layout/Layouts'
import metabaseApi from './api/metabaseApi'

function App() {
  useEffect(() => {
    const data = {
                  "username": "jiahao.leong@nexent.co",
                  "password": "Jiahao051",
                 }
    // metabaseApi.session(data)
    //   .then(response => {
    //       localStorage.setItem("sessions", response.data.id)
    //   })
    //   .catch(error => {
    //       console.log(error)
    //   })
    if (localStorage.getItem("sessions") !== null) {
      metabaseApi.session(data)
        .then(response => {
            localStorage.setItem("sessions", response.data.id)
        })
        .catch(error => {
            console.log(error)
        })
    }  
  }, [])

  return (
    <Switch>
      <Route path="/" render={(props) => <Layouts {...props}/>} />
    </Switch>
  );
}

export default withRouter(App);
