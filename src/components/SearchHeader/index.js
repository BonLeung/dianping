import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import SearchInput from '../SearchInput';

import './style.less';

class SearchHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div id="search-header" className="clear-fix">
        <span className="back-icon float-left" onClick={this.handleClick.bind(this)}>
          <i className="icon-chevron-left"></i>
        </span>
        <div className="input-container">
          <i className="icon-search"></i>
          &nbsp;
          <SearchInput value={this.props.keyword || ''} handleSearch={this.handleSearch.bind(this)} />
        </div>
      </div>
    )
  }
  handleClick() {
    window.history.back();
  }
  handleSearch(keyword) {
    this.props.handleSearch(keyword);
  }
}

export default SearchHeader;
