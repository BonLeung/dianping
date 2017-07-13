import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SearchHeader from '../../components/SearchHeader';
import SearchList from './subpage/SearchList.js';

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render () {
    const params = this.props.match.params;
    return (
      <div>
        <SearchHeader keyword={params.keyword} handleSearch={this.handleSearch.bind(this)} />
        <SearchList keyword={params.keyword} category={params.category} />
      </div>
    )
  }
  handleSearch(keyword) {
    this.props.history.push('/search/all/' + keyword);
  }
}

export default Search;
