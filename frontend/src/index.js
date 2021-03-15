import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.scss';
import App from './App';
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { Provider } from 'react-redux'
import store from './features/store'

ReactDOM.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <Router>
        <Provider store={store}>
          <App/>
        </Provider>
      </Router>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>,
  document.getElementById('root')
);
