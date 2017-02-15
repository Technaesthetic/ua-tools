import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import './main.scss';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Character from './pages/Character';

ReactDOM.render(<Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="/character(/:characterId)" component={Character}></Route>
    </Route>
  </Router>, document.getElementById('root'));
