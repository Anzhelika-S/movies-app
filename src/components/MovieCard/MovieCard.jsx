import './MovieCard.css'

function MovieCard(props) {

    const {id, overview, poster, releaseDate, title} = props
    
   return (
    <li id={id}>
        <img src={`https://image.tmdb.org/t/p/w185/${poster}`} alt="Poster" />
        <div>
            <h3>{title}</h3>
            <div>{releaseDate}</div>
            <div>Action, Drama</div>
            <div>{overview}</div>
        </div>
    </li>
   )
    

}

export default MovieCard