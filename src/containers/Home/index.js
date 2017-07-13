import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Category from '../../components/Category';
import HomeHeader from '../../components/HomeHeader';
import Advertise from './subpage/Advertise';
import List from './subpage/List';
import { connect } from 'react-redux';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div>
        <HomeHeader cityName={this.props.userinfo.cityName} handleSearch={this.handleSearch.bind(this)} />
        <Category />
        <div style={{height: "16px"}}></div>
        <Advertise />
        <List />
      </div>
    );
  }
  handleSearch(keyword) {
    this.props.history.push('/search/all/' + keyword);
  }
}

// ----------------------- redux  react 绑定 -------------------
function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
