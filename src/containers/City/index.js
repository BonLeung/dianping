import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../../components/Header';
import CityList from '../../components/CityList';
import CurrentCity from '../../components/CurrentCity';

import * as userinfoActionsFromOtherFile from '../../actions/userinfo.js';

import { CITYNAME } from '../../config/localStoreKey';
import localStore from '../../util/localStore';

class City extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div>
        <Header title="选择城市" />
        <CurrentCity cityName={this.props.userinfo.cityName} />
        <CityList changeCity={this.changeCity.bind(this)} />
      </div>
    )
  }
  changeCity(newCity) {
    // 修改 redux
    const userinfo = this.props.userinfo;
    userinfo.cityName = newCity;
    this.props.userinfoActions.update(userinfo);

    // 修改 localstorage 中的 cityName
    localStore.setItem(CITYNAME, newCity);

    // 跳转到首页
    this.props.history.push('/');
  }
}

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
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
)(City);
