
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { getOrderListData } from '../../../fetch/user/orderlist.js';

class OrderList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div></div>
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
        data: json.data
      })
    })
  }
}

export default OrderList;
