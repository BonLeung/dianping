import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from '../containers';
import Home from '../containers/Home';
import City from '../containers/City';
import User from '../containers/User';
import Search from '../containers/Search';
import Detail from '../containers/Detail';
import NotFound from '../containers/404';

// 如果是大型项目，router 部分就需要做更加复杂的配置
// 参见 https://github.com/reacths/react-router/tree/master/examples/huge-apps

const RouteMap = () => {
  <Router>
    <Route exact path='/' component={ Home } />
    <Route path='/city' component={ City } />
    <Route path='/user' component={ User } />
    <Route path='/search/:type(/:keyword)' component={ Search } />
    <Route path='/detail/:id' component={ Detail } />
    <Route path='*' component={ NotFound } />
  </Router>
}

export default RouteMap;
