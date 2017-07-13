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
    let timeoutId;
    const loadMoreHandler = this.props.loadMoreHandler;
    const loadMoreDOM = this.refs.loadMore;
    window.addEventListener('scroll', () => {
      if (this.props.isLoadingMore) {
        return;
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        const top = loadMoreDOM.getBoundingClientRect().top;
        const windowHeight = window.screen.height;
        if (top && top < windowHeight) {
          loadMoreHandler();
        }
      }, 100)
    }, false)
  }
  componentWillDestroy() {
    window.removeEventListener('scroll');
  }
}

export default LoadMore;
