import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Star from '../Star';

import './style.less';

class DetailInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    const info = this.props.info;
    return (
      <div id="detail-info-container">
        <div className="info-container clear-fix">
          <div className="info-img-container float-left">
            <img src={process.env.PUBLIC_URL + info.img} alt={info.title} />
          </div>
          <div className="info-content">
            <h1>{info.title}</h1>
            <div className="star-container">
              <Star star={info.star} />
            </div>
            <p className="sub-title">{info.subTitle}</p>
          </div>
        </div>
        <p dangerouslySetInnerHTML={{__html: info.desc}} className="info-desc"></p>
      </div>
    )
  }
}

export default DetailInfo;
