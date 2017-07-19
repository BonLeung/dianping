import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class BuyAndStore extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div className="buy-store-container clear-fix">
        <div className="item-container float-left">
          {
            this.props.isStore ?
            <button className="selected" onClick={this.handleStore.bind(this)}>已收藏</button>
            :
            <button onClick={this.handleStore.bind(this)}>收藏</button>
          }
        </div>
        <div className="item-container float-right">
          <button onClick={this.handleBuy.bind(this)}>购买</button>
        </div>
      </div>
    )
  }
  handleStore() {
    this.props.handleStore();
  }
  handleBuy() {
    this.props.handleBuy();
  }
}

export default BuyAndStore;
