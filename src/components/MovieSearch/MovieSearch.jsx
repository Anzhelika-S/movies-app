import { Input } from 'antd';
import debounce from 'lodash.debounce';
import './MovieSearch.css';
import { Component } from 'react';

export default class MovieSearch extends Component {
  state = {
    value: '',
  };

  debouncedUpdateList = debounce((value) => {
    this.props.updateList(value);
  }, 1000);

  onInputChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
    this.debouncedUpdateList(value);
  };

  render() {
    return (
      <Input
        placeholder="Search a movie"
        className="search-input"
        value={this.state.value}
        onChange={this.onInputChange}
      />
    );
  }
}
