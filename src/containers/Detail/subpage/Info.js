import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { getInfoData } from '../../../fetch/detail/detai.js';

import DetailInfo from '../../../components/DetailInfo';

class Info extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      info: false
    };
  }
  render() {
    return (
      <div>
        {
          this.state.info ?
          <DetailInfo info={this.state.info} />
          :
          <div>加载中...</div>
        }
      </div>
    );
  }
  componentDidMount() {
    const id = this.props.id;
    const result = getInfoData(id);
    result.then(response => {
      return response.json();
    }).then(json => {
      this.setState({
        info: json
      })
    })
  }
}

export default Info;
