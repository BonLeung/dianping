import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home.js';
import ListComponent from '../../../components/List';
import LoadMore from '../../../components/LoadMore';

import './style.less';

class List extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: [],
      hasMore: false,
      isLoadingMore: false,
      currentPage: 0
    }
  }
  render () {
    return (
      <div>
        <h2 className="home-list-title">猜你喜欢</h2>
        {
          this.state.data ?
          <ListComponent data={this.state.data} />
          :
          <div>加载中...</div>
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
    // 获取首页数据
    this.loadFirstPageDate();
  }
  // 获取首屏数据
  loadFirstPageDate() {
    const cityName = this.props.cityName;
    const result = getListData(cityName, 0);
    this.resultHandle(result);
  }
  // 加载更多数据
  loadMorePageDate() {
    // 记录状态
    this.setState({
      isLoadingMore: true
    });

    const cityName = this.props.cityName;
    const currentPage = this.state.currentPage;
    setTimeout(() => {
      const result = getListData(cityName, currentPage + 1);
      this.resultHandle(result);

      // 增加 page 的计数
      this.setState({
        currentPage: currentPage + 1,
        isLoadingMore: false
      })
    }, 1000)
  }
  // 数据处理
  resultHandle(result) {
    result.then(response => {
      return response.json();
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

export default List;
