import React, {useEffect, useState} from 'react'
import './App.css';
import { Route, Switch, withRouter } from "react-router";
import Layouts from './layout/Layouts'
import LoginPage from './auth/LoginPage'
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login } from './features/userSlice';
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem("sessions") !== null) {
       dispatch(login({
                    sessions: localStorage.getItem("sessions"),
                    loggedIn: true,
                }))
    }
  }, [])

  if (user) {
     return (
      <Switch>
        <Route path="/" render={(props) => <Layouts {...props}/>} />
      </Switch>
    );
  }
  
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
    </Switch>
  )
}

export default withRouter(App);
