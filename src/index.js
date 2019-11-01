import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import WheresMySparesProject from './WheresMySparesProject'
import './index.css'

ReactDOM.render(
    <Router>
        <WheresMySparesProject />
    </Router>
    , document.getElementById('root'))

