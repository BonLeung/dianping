import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { getCommentData } from '../../../fetch/detail/detai';

import LoadMore from '../../../components/LoadMore';
import CommentList from '../../../components/CommentList';

class Comment extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: [],
      hasMore: false,
      isLoadingMore: false,
      curentPage: 1
    }
  }
  render() {
    return (
      <div>
        {
          this.state.data.length ?
          <CommentList data={this.state.data} />
          :
          <div>加载中</div>
        }
        {
          this.state.hasMore ?
          <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreHandler={this.loadMorePageDate.bind(this)} />
          :
          <div></div>
        }
      </div>
    )
  }
  componentDidMount() {
    this.loadFirstPageDate();
  }
  // 首次加载数据
  loadFirstPageDate() {
    const id = this.props.id;
    const result = getCommentData(1, id);
    this.resultHandle(result);
  }
  // 加载更多数据
  loadMorePageDate() {
    this.setState({
      isLoadingMore: true
    });

    const id = this.props.id;
    const currentPage = this.state.currentPage;
    const result = getCommentData(currentPage + 1, id);
    this.resultHandle(result);

    // 增加 page， 设置 isLoadingMore 状态
    this.setState({
      currentPage: currentPage + 1,
      isLoadingMore: false
    });
  }
  // 处理数据
  resultHandle(result) {
    result.then(result => {
      return result.json()
    }).then(json => {
      const hasMore = json.hasMore;
      const data = json.data;
      this.setState({
        hasMore: hasMore,
        data: this.state.data.concat(data)
      });
    })
  }
}

export default Comment;
