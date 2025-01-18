import './MovieCard.css'
import {Card} from 'antd'

function MovieCard(props) {

  const {id, overview, poster, releaseDate, title} = props
    
  return (
    <li id={id} className='card-item'>
        <Card style={{width: 450}}  hoverable >
            <img src={`https://image.tmdb.org/t/p/w185/${poster}`} alt="Poster" className='movie-poster' />
            <div>
                <h3>{title}</h3>
                <div>{releaseDate}</div>
                <div>Action, Drama</div>
                <div>{overview}</div>
            </div>
        </Card>
    </li>
  )
    

}

export default MovieCard