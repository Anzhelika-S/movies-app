import './MovieList.css';
import { Component } from 'react';
import { Space, Spin } from 'antd';

import MovieCard from '../MovieCard';

export default class MovieList extends Component {
  render() {
    const { movies, loading } = this.props;

    const elements = movies.map((movie) => (
      <MovieCard
        poster={movie.poster_path}
        key={movie.id}
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        releaseDate={movie.release_date}
      />
    ));

    return (
      <>
        {loading ? (
          <ul className="movies-list movies-list-loading">
            <Spin size="large" />
          </ul>
        ) : (
          <ul className="movies-list">
            <Space wrap size={36} align="center" className="space-list">
              {elements}
            </Space>
          </ul>
        )}
      </>
    );
  }
}
