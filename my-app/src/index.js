import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
const cors = require('cors');


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />

        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
