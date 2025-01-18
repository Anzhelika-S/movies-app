import './MovieList.css'
import MovieCard from '../MovieCard'

function MovieList({movies}) {

    const elements = movies.map((movie) => {
        return (
            <MovieCard poster={movie.poster_path} key={movie.id} id={movie.id} title={movie.title} overview={movie.overview} releaseDate={movie.release_date} />
        )
    })

    return <ul>{elements}</ul>
}

export default MovieList