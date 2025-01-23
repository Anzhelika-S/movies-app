import { Component } from 'react';
import './MoviePagination.css';
import { Pagination } from 'antd';

export default class MoviePagination extends Component {
  state = {
    page: 1,
  };

  onPaginationChange = (page) => {
    const { value, updateList } = this.props;
    this.setState({ page: page });
    updateList(value, page);
  };

  render() {
    const { page } = this.state;
    const { totalPages } = this.props;
    return <Pagination defaultCurrent={page} onChange={this.onPaginationChange} total={totalPages} align="center" />;
  }
}
