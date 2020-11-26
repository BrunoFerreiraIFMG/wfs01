import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare, faExclamationTriangle)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

