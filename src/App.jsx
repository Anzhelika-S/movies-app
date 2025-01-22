import './App.css';
import { Component } from 'react';
import { Alert } from 'antd';

import ApiService from './services/ApiService';
import MovieList from './components/MovieList';
import MovieSearch from './components/MovieSearch';

export default class App extends Component {
  api = new ApiService();

  constructor() {
    super();
    this.state = {
      movies: [],
      loading: true,
      error: false,
    };
  }

  updateList = async () => {
    this.setState({ loading: true, error: null });
    try {
      const data = await this.api.getApi();
      this.setState({
        movies: data.results,
        loading: false,
      });
    } catch (error) {
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
    const { movies, loading, error } = this.state;

    return (
      <>
        <MovieSearch />
        {error && <Alert message="Couldn't fetch data" type="error" showIcon className="error-message" />}
        <MovieList movies={movies} loading={loading} />
      </>
    );
  }
}
