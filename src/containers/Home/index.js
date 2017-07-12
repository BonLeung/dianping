import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Category from '../../components/Category';
import HomeHeader from '../../components/HomeHeader';
import Advertise from './subpage/Advertise';
import { connect } from 'react-redux';
import { getAdData } from '../../fetch/home/home';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div>
        <HomeHeader cityName={this.props.userinfo.cityName} />
        <Category />
        <Advertise />
      </div>
    );
  }
  componentDidMount() {
    var response = getAdData();
    response.then(data => {
      return data.json();
    }).then(json => {
      console.log(json);
    })
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
