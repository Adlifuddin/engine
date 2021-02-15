import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes'

ReactDOM.render(
  <Router>
    <App>
      {Routes.map(results => (
        <Route key={results.name} path={results.pathname} exact component={results.components} />
      ))}
    </App>
  </Router>,
  document.getElementById('root')
);
