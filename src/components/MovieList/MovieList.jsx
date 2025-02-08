import './MovieList.css';
import { Component } from 'react';
import { Space, Skeleton, Alert } from 'antd';

import MovieCard from '../MovieCard';

export default class MovieList extends Component {
  render() {
    const { movies, loading, error, addRating, guestID } = this.props;

    const elements =
      movies.length !== 0 ? (
        movies.map((movie) => (
          <MovieCard
            poster={movie.poster_path}
            key={movie.id}
            id={movie.id}
            title={movie.title}
            overview={movie.overview}
            releaseDate={movie.release_date}
            vote={movie.vote_average}
            rating={movie.rating}
            movieGenres={movie.genre_ids}
            addRating={addRating}
            guestID={guestID}
            userRating={movie.rating}
          />
        ))
      ) : error ? (
        <Alert message="Couldn't fetch data" type="error" showIcon className="error-message" />
      ) : (
        <Alert
          type="info"
          message="Couldn't find anything..."
          description="There aren't any movies with the following title. Please, try searching for another movie."
        />
      );

    return (
      <>
        {loading ? (
          <ul className="movies-list movies-list-loading">
            <Skeleton active />
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
