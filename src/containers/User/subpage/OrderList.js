
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { getOrderListData, postComment } from '../../../fetch/user/orderlist.js';

import OrderListComponent from '../../../components/OrderList';

import './style.less';

class OrderList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: []
    };
  }
  render() {
    return (
      <div className="order-list-container">
        <h2>你的订单</h2>
        {
          this.state.data.length ?
          <OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)} />
          :
          <div>正在加载...</div>
        }
      </div>
    )
  }
  componentDidMount() {
    const username = this.props.username;
    const result = getOrderListData(username);
    result.then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
      this.setState({
        data: json
      })
    })
  }
  submitComment(id, value, star, callback) {
    const result = postComment(id, value, star);
    result.then(response => {
      return response.json();
    }).then(json => {
      if (json.errno === 0) {
        callback();
      }
    })
  }
}

export default OrderList;
