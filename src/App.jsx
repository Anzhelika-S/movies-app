import './App.css';
import { Component } from 'react';
import { Alert, Tabs } from 'antd';

import ApiService from './services/ApiService';
import MovieList from './components/MovieList';
import MovieSearch from './components/MovieSearch';
import MoviePagination from './MoviePagination/MoviePagination';
import { GenresProvider } from './context/GenresContext';

export default class App extends Component {
  api = new ApiService();

  state = {
    movies: [],
    loading: true,
    error: false,
    value: '',
    totalPages: 500,
    guestID: localStorage.getItem('guestID'),
    genresContext: null,
    ratedTotalPages: null,
    ratedMovies: null,
    allRatedMovies: null,
    totalRatedResults: null,
    currentRatedPage: null,
  };

  updateRatedList = async () => {
    try {
      const { results, total_pages, total_results, page } = await this.api.getRatedMovies(this.state.guestID);

      this.setState(
        {
          ratedMovies: results,
          ratedTotalPages: total_pages,
          allRatedMovies: results,
          totalRatedResults: total_results,
          currentRatedPage: page,
        },
        () => {
          if (this.state.ratedTotalPages > 1) this.getAllRatedMovies(2);
        }
      );
    } catch (err) {
      const error = err.message;
      console.error(error);
      this.setState({ isError: true, errorMessage: error });
    }
  };

  getRatedMoviesFromPage = async (pageNumber) => {
    try {
      const { results, page } = await this.api.getRatedMoviesFromPage(this.state.guestID, pageNumber);
      this.setState({ ratedMovies: results, currentRatedPage: page });
    } catch (err) {
      const error = err.message;
      console.error(error);
      this.setState({ isError: true, errorMessage: error });
    }
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

  rateMovie = async (movieID, guestID, value) => {
    try {
      const { success } = await this.api.addRating(movieID, guestID, value);
      if (success) {
        this.setState((prevState) => ({
          movies: prevState.movies.map((movie) => (movie.id === movieID ? { ...movie, rating: value } : movie)),
          ratedMovies: prevState.ratedMovies
            ? prevState.ratedMovies.map((movie) => (movie.id === movieID ? { ...movie, rating: value } : movie))
            : null,
        }));
        setTimeout(async () => await this.updateRatedList(), 1000);
      }
    } catch (err) {
      const error = err.message;
      console.error(error);
      this.setState({ isError: true, errorMessage: error });
    }
  };

  async componentDidMount() {
    this.updateList();

    if (this.state.guestID === null) {
      try {
        const { guest_session_id } = await this.api.getGuestSession();
        localStorage.setItem('guestID', guest_session_id);
        this.setState({ guestID: localStorage.getItem('guestID') });
      } catch (err) {
        const error = err.message;
        console.error(error);
        this.setState({ isError: true, errorMessage: error });
      }
    }
    if (this.state.guestID !== null) await this.updateRatedList();
    try {
      const { genres } = await this.api.getGenres();
      this.setState({ genresContext: genres });
    } catch (err) {
      console.error(err);
      this.setState({ isError: true, errorMessage: err.message });
    }
  }

  render() {
    const {
      movies,
      loading,
      error,
      value,
      totalPages,
      ratedMovies,
      ratedTotalPages,
      genresContext,
      totalRatedResults,
      guestID,
    } = this.state;

    const items = [
      {
        key: 1,
        label: 'Search',
        children: (
          <GenresProvider value={genresContext}>
            <MovieSearch updateList={this.updateList} />
            {error && <Alert message="Couldn't fetch data" type="error" showIcon className="error-message" />}
            <MovieList movies={movies} loading={loading} error={error} guestID={guestID} addRating={this.rateMovie} />
            <MoviePagination updateList={this.updateList} value={value} totalPages={totalPages} />
          </GenresProvider>
        ),
      },
      {
        key: 2,
        label: 'Rated',
        children: (
          <GenresProvider value={genresContext}>
            {error && <Alert message="Couldn't fetch data" type="error" showIcon className="error-message" />}
            {totalRatedResults ? (
              <MovieList movies={ratedMovies} loading={loading} guestID={guestID} addRating={this.rateMovie} />
            ) : (
              <Alert type="info" message="No rated movies yet" />
            )}

            <MoviePagination updateList={this.updateRatedList} value={value} totalPages={ratedTotalPages} />
          </GenresProvider>
        ),
      },
    ];

    return (
      <div className="app-container">
        <Tabs animated centered destroyInactiveTabPane={true} items={items} />
      </div>
    );
  }
}
