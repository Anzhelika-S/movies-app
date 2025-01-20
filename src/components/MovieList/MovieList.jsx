import './MovieList.css'
import {Space} from 'antd'

import MovieCard from '../MovieCard'

function MovieList({movies}) {

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

  return <ul className='movies-list'>
    <Space wrap size='small' align='center' className='space-list'>
      {elements}
    </Space>
    </ul>
}

export default MovieList