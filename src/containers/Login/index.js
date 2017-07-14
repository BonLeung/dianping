import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as userInfoActionsFromOtherFile from '../../actions/userinfo';

import Header from '../../components/Header';

import './style.less';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      username: ''
    };
  }
  render() {
    const { from } = this.props.location.state || { from: { path: '/' }};
    if (this.props.userinfo.username) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div>
        <Header title="登录" />
        <div id="login-container">
          <div className="input-container phone-container">
            <i className="icon-tablet"></i>
            <input
              type="text"
              placeholder="请输入手机号"
              value={this.state.username}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div className="input-container password-container">
            <i className="icon-key"></i>
            <button>发送验证码</button>
            <input type="text" placeholder="请输入验证码" />
          </div>
          <button className="btn-login" onClick={this.login.bind(this)}>登录</button>
        </div>
      </div>
    )
  }
  handleChange(e) {
    this.setState({
      username: e.target.value
    })
  }
  login() {
    const userinfoActions = this.props.userinfoActions;
    const userinfo = this.props.userinfo;
    userinfo.username = this.state.username;
    userinfoActions.update(userinfo);

    const router = this.props.match.params.router;
    if (router) {
      this.props.history.push(router);
    } else {
      this.props.history.push('/user');
    }
  }
}


function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userinfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
