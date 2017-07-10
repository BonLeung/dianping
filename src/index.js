import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import RouteMap from './router/routeMap';
import { testFetch } from './fetch/test.js';

// 创建 Redux 的 store 对象
const store = configureStore();

testFetch();

ReactDOM.render(
  <Provider store={ store }>
    <RouteMap />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
