import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './index.css';
import App from './App';
import GoogleApi from './views/GoogleApi'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router>
    <App>
      <Route path="/google" component={GoogleApi} />
    </App>
  </Router>,
  document.getElementById('root')
);
