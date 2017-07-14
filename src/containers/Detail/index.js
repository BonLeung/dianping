import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Header from '../../components/Header';
import Info from './subpage/Info';
import Comment from './subpage/Comment';

class Detail extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render () {
    return (
      <div>
        <Header title="商户详情" />
        <Info id={this.props.match.params.id} />
        <Comment id={this.props.match.params.id} />
      </div>
    )
  }
}

export default Detail;
