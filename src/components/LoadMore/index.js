import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class LoadMore extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div className="load-more" ref="loadMore">
        {
          this.props.isLoadingMore ?
          <span>加载中...</span>
          :
          <span onClick={this.loadMore.bind(this)}>加载更多</span>
        }
      </div>
    )
  }
  loadMore() {
    this.props.loadMoreHandler();
  }
  componentDidMount() {
    const loadMore = this.props.loadMoreHandler;
    let timeoutId;
    window.addEventListener('scroll', function() {
      if (this.props.isLoadingMore) {
        return;
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        const top = this.refs.loadMore.getBoundingClientRect().top;
        const windowHeight = window.screen.height;
        if (top && top < windowHeight) {
          loadMore();
        }
      }, 100)
    }.bind(this), false)
  }
}

export default LoadMore;
