import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Category from './SubPage/Category';
import HomeHeader from '../../components/HomeHeader';
import { connect } from 'react-redux';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div>
        <HomeHeader cityName={this.props.userinfo.cityName} />
      </div>
    );
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
