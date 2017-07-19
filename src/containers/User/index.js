import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../../components/Header';
import UserInfo from '../../components/UserInfo';
import OrderList from './subpage/OrderList.js';

import './style.less';

class User extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render () {
    const userinfo = this.props.userinfo;
    return (
      <div>
        <Header title="用户中心" backRouter="/" />
        <UserInfo username={userinfo.username} city={userinfo.cityName} />
        <OrderList username={userinfo.username} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userinfo : state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
