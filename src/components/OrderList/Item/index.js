import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Star from '../../../components/Star';

import './style.less';

class Item extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      commentState: 2,
      stars: {}
    };
  }
  render() {
    const data = this.props.data;
    return (
      <div className="order-item-container">
        <div className="clear-fix">
          <div className="order-item-img float-left">
            <img src={data.img} />
          </div>
          <div className="order-item-comment float-right">
            {
              this.state.commentState === 0 ?
              <button className="btn" onClick={this.showComment.bind(this)}>评价</button>
              :
                this.state.commentState === 1 ?
                ''
                :
                <button className="btn unselected-btn">已评价</button>
            }
          </div>
          <div className="order-item-content">
            <span>商户：{data.title}</span>
            <span>数量：{data.count}</span>
            <span>价格：￥{data.price}</span>
          </div>
        </div>
        {
          this.state.commentState === 1 ?
          <div className="comment-text-container">
            <textarea style={{width: '100%', height: '80px'}} className="comment-text" ref="commentText"></textarea>
            <div style={{paddingTop: '10px', paddingBottom: '10px'}}>
              <Star star="0" onClick={this.starClickCallback.bind(this)} />
            </div>
            <button className="btn" onClick={this.submitClickHandle.bind(this)}>提交</button>
            &nbsp;
            <button className="btn unselected-btn" onClick={this.hideComment.bind(this)}>取消</button>
          </div>
          :
          ''
        }
      </div>
    )
  }
  componentDidMount() {
    this.setState({
      commentState: this.props.data.commentState
    });
  }
  showComment() {
    this.setState({
      commentState: 1
    })
  }
  hideComment() {
    this.setState({
      commentState: 0
    })
  }
  submitClickHandle() {
    const submitComment = this.props.submitComment;
    const id = this.props.data.id;
    const stars = this.state.stars;
    const star = stars[id] || '0';
    const commentTextDOM = this.refs.commentText;
    const value = commentTextDOM.value.trim();
    if (!value) {
      return;
    }
    // 提交评论内容
    submitComment(id, value, star, this.commentOK.bind(this));
  }
  commentOK() {
    this.setState({
      commentState: 2
    });
  }
  starClickCallback(star) {
    let stars = this.state.stars
    const id = this.props.data.id
    stars[id] = star

    this.setState({
        stars: stars
    })
  }
}

export default Item;
