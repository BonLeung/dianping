import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getSearchData } from '../../../fetch/search/search.js';
import ListComponent from '../../../components/List';
import LoadMore from '../../../components/LoadMore';

const initialState = {
  data: [],
  hasMore: false,
  isLoadingMore: false,
  currentPage: 0
};

class SearchList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = initialState;
  }
  render () {
    return (
      <div>
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
  componentDidUpdate(prevProps, prevState) {
    const category = this.props.category;
    const keyword = this.props.keyword;
    if (category === prevProps.category && keyword === prevProps.keyword) {
      return;
    }
    // 重置 state
    this.setState(initialState);
    // 重新加载数据
    this.loadFirstPageDate();
  }
  componentDidMount() {
    // 获取首页数据
    this.loadFirstPageDate();
  }
  // 获取首屏数据
  loadFirstPageDate() {
    const cityName = this.props.cityName;
    const keyword = this.props.keyword;
    const category = this.props.category;
    const result = getSearchData(0, cityName, category, keyword);
    this.resultHandle(result);
  }
  // 加载更多数据
  loadMorePageDate() {
    // 记录状态
    this.setState({
      isLoadingMore: true
    });

    const cityName = this.props.cityName;
    const keyword = this.props.keyword;
    const category = this.props.category;
    const currentPage = this.state.currentPage;
    setTimeout(() => {
      const result = getSearchData(currentPage + 1, cityName, category, keyword);
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

export default SearchList;
