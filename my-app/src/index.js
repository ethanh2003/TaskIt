import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {SessionProvider} from "./SessionContext";

const cors = require('cors');


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <SessionProvider>
                <App/>
            </SessionProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
