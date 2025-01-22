import './App.css';
import { Component } from 'react';
import { Alert } from 'antd';

import ApiService from './services/ApiService';
import MovieList from './components/MovieList';
import MovieSearch from './components/MovieSearch';

export default class App extends Component {
  api = new ApiService();

  state = {
    movies: [],
    loading: true,
    error: false,
  };

  updateList = async (value) => {
    this.setState({ loading: true, error: null });
    try {
      const data = await this.api.getApi(value);
      this.setState({
        movies: data.results,
        loading: false,
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
    const { movies, loading, error } = this.state;

    return (
      <div className="app-container">
        <MovieSearch updateList={this.updateList} />
        {error && <Alert message="Couldn't fetch data" type="error" showIcon className="error-message" />}
        <MovieList movies={movies} loading={loading} />
      </div>
    );
  }
}
