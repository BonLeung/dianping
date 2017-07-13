import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class SearchInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      keyword: ''
    }
  }
  render() {
    return (
      <input
        type="text"
        className="search-input"
        placeholder="请输入关键字"
        onChange={this.handleChange.bind(this)}
        onKeyUp={this.handleKeyUp.bind(this)} />
    )
  }
  handleChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }
  handleKeyUp(e) {
    if (e.keyCode !== 13) {
      return;
    }
    this.props.handleSearch(this.state.keyword);
  }
}

export default SearchInput;
