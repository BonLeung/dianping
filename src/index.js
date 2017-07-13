import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import App from './containers/index.js';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import { testFetch } from './fetch/test.js';

import './common.less';

const history = createBrowserHistory();

// 创建 Redux 的 store 对象
const store = configureStore();

testFetch();

ReactDOM.render(
  <Provider store={ store }>
    <Router history={history}>
      <Route path='/' component={App} />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
