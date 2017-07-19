import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as storeActionsFromFile from '../../../actions/store.js';

import BuyAndStore from '../../../components/BuyAndStore';

class Buy extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isStore: false
    }
  }
  render() {
    return (
      <div>
        <BuyAndStore isStore={this.state.isStore} handleBuy={this.handleBuy.bind(this)} handleStore={this.handleStore.bind(this)} />
      </div>
    )
  }
  componentDidMount() {
    this.checkStoreState();
  }
  handleBuy() {
    const isLogin = this.checkLogin();
    if (!isLogin) {
      return;
    }
  }
  handleStore() {
    const isLogin = this.checkLogin();
    if (!isLogin) {
      return;
    }

    const id = this.props.match.params.id;
    const storeActions = this.props.storeActions;
    if (this.state.isStore) {
      storeActions.remove({id: id});
    } else {
      storeActions.add({id: id});
    }
    this.setState({
      isStore: !this.state.isStore
    })
  }
  checkStoreState() {
    const id = this.props.match.params.id;
    const store = this.props.store;

    store.some(item => {
      if (item.id === id) {
        this.setState({
          isStore: true
        })
        return false;
      }
    })
  }
  checkLogin() {
    const id = this.props.match.params.id;
    const userinfo = this.props.userinfo;
    if (!userinfo.username) {
      this.props.history.push('/login/' + encodeURIComponent('/detail/' + id));
      return false;
    }
    return true;
  }
}

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo,
    store: state.store
  }
}

function mapDispatchToProps(dispatch) {
  return {
    storeActions: bindActionCreators(storeActionsFromFile, dispatch)
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Buy));
