import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import HomeAdvertise from '../../../components/HomeAdvertise'
import { getAdData } from '../../../fetch/home/home.js';

class Advertise extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: []
    };
  }
  render () {
    return (
      <div>
        <HomeAdvertise data={this.state.data} />
      </div>
    )
  }
  componentDidMount() {
    var response = getAdData();
    response.then(data => {
      return data.json();
    }).then(json => {
      const data = json;
      if (data.length) {
        this.setState({
          data: data
        });
      }
    })
  }
}

export default Advertise;
