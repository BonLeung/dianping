import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import CommentItem from './Item';

import './style.less';

class CommentList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div className="comment-list">
        {this.props.data.map((item, index) => {
          return <CommentItem key={index} item={item} />
        })}
      </div>
    )
  }
}

export default CommentList;
