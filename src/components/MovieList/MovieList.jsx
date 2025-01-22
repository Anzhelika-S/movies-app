import './MovieList.css'
import { Space, Spin } from 'antd'

import MovieCard from '../MovieCard'

function MovieList({ movies, loading }) {

  if (loading && movies.length === 0) {
    return (
      <Space wrap size={36} align="center" className="space-list">
         <MovieCard loading={loading}
        movies={movies}/>
        <MovieCard loading={loading}
        movies={movies}/>
        <MovieCard loading={loading}
        movies={movies}/>
        <MovieCard loading={loading}
        movies={movies}/>
      </Space>
    )
  }

  const elements = movies.map((movie) => {
    return (
      <MovieCard
        poster={movie.poster_path}
        key={movie.id}
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        releaseDate={movie.release_date}
        
      />
    )
  })

  return (
    <ul className="movies-list">
      <Space wrap size={36} align="center" className="space-list">
        {elements}
      </Space>
    </ul>
  )
}

export default MovieList
