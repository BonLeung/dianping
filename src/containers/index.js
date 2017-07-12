import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import City from './City';
import User from './User';
import Search from './Search';
import Detail from './Detail';
import NotFound from './404';
import localStore from '../util/localStore';
import { CITYNAME } from '../config/localStoreKey';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userinfoActionsFromOtherFile from '../actions/userinfo';

// 如果是大型项目，router 部分就需要做更加复杂的配置
// 参见 https://github.com/reacths/react-router/tree/master/examples/huge-apps

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route path='/city' component={ City } />
          <Route path='/user' component={ User } />
          <Route path='/search/:type(/:keyword)' component={ Search } />
          <Route path='/detail/:id' component={ Detail } />
          <Route path='*' component={ NotFound } />
        </Switch>
      </div>
    );
  }
  componentDidMount() {
    // 从 localstorage 里面获取城市
    let cityName = localStore.getItem(CITYNAME);
    if (cityName == null) {
      cityName = '北京';
    }
    this.props.userinfoActions.update({
      cityName: cityName
    });
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    userinfoActions: bindActionCreators(userinfoActionsFromOtherFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
