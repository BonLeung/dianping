import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ListItem from './Item';

import './style.less';

class ListComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render () {
    return (
      <div className="list-container">
        {this.props.data.map((item, index) => {
          return <ListItem data={item} key={index} />
        })}
      </div>
    )
  }
}

export default ListComponent;
