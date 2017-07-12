import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router-dom';

import './style.less';

class ListItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render () {
    const data = this.props.data;
    return (
      <div className="list-item clear-fix">
        <Link to={'/detail/' + data.id}>
          <div className="item-img-container float-left">
            <img src={data.img} alt={data.title} />
          </div>
          <div className="item-content">
            <div className="item-title-container">
              <h3 className="float-left">{data.title}</h3>
              <span className="float-right">{data.distance}</span>
            </div>
            <p className="item-sub-title">{data.subTitle}</p>
            <div className="item-price-container">
              <span className="price float-left">￥{data.price}</span>
              <span className="mumber float-right">已售{data.mumber}</span>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default ListItem;
