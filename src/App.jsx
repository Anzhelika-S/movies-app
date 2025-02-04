import './App.css';
import { Component } from 'react';
import { Alert } from 'antd';

import ApiService from './services/ApiService';
import MovieList from './components/MovieList';
import MovieSearch from './components/MovieSearch';
import MoviePagination from './MoviePagination/MoviePagination';
import AppTabs from './components/Tabs';

export default class App extends Component {
  api = new ApiService();

  state = {
    movies: [],
    loading: true,
    error: false,
    value: '',
    totalPages: 500,
  };

  updateList = async (value, page = 1) => {
    this.setState({ loading: true, error: null });

    try {
      const data = await this.api.getApi(value, page);

      this.setState({
        value: value,
        movies: data.results,
        loading: false,
        totalPages: data.total_pages,
      });
    } catch {
      this.setState({
        error: true,
        loading: false,
      });
    }
  };

  componentDidMount() {
    this.updateList();
  }

  render() {
    const { movies, loading, error, value, totalPages } = this.state;

    const items = [
      {
        key: 1,
        label: 'Search',
        children: (
          <>
            <MovieSearch updateList={this.updateList} />
            {error && <Alert message="Couldn't fetch data" type="error" showIcon className="error-message" />}
            <MovieList movies={movies} loading={loading} />
            <MoviePagination updateList={this.updateList} value={value} totalPages={totalPages} />
          </>
        ),
      },
      {
        key: 2,
        label: 'Rated',
        children: <>Rated movies here</>,
      },
    ];

    return (
      <div className="app-container">
        <AppTabs items={items} />
      </div>
    );
  }
}
