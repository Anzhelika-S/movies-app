import './MovieCard.css'
import { Card, ConfigProvider, Spin } from 'antd'
import { format } from 'date-fns'

function MovieCard(props) {
  const { id, overview, poster, releaseDate, title, loading, movies } = props

  if (loading && movies.length === 0 ) {
    return (
      <li className="card-item">
        <ConfigProvider
          theme={{
            components: {
              Card: {
                bodyPaddingSM: 0,
              },
            },
          }}
        >
          <Card
            style={{ width: 450, height: 280, borderRadius: 0 }}
            size="small"
            hoverable
            className='card-loading'
          >
            <Spin size="large" />
          </Card>
        </ConfigProvider>
      </li>
    )
  }

  const addPoster = () => {
    if (!poster) {
      return 'https://movienewsletters.net/photos/000000H1.jpg'
    } else {
      return `https://image.tmdb.org/t/p/w185/${poster}`
    }
  }

  const formatDate = () => {
    try {
      const movieDate = new Date(releaseDate.split('-').join(', '))
      return format(movieDate, 'PP')
    } catch {
      return 'N/A'
    }
  }

  const shortenOverview = () => {
    if (overview && overview.length > 230) {
      let str = overview.substr(0, overview.lastIndexOf(' ', 230))
      return str + '...'
    } else {
      return overview || 'No overview available'
    }
  }

  const cardContent = (
    <>
      <img src={addPoster()} alt="Poster" className="movie-poster" />
      <div>
        <h3>{title}</h3>
        <div>{formatDate()}</div>
        <div>Action, Drama</div>
        <div>{shortenOverview()}</div>
      </div>
    </>
  )

  return (
    <li id={id} className="card-item">
      <ConfigProvider
        theme={{
          components: {
            Card: {
              bodyPaddingSM: 0,
            },
          },
        }}
      >
        <Card
          style={{ width: 450, height: 280, borderRadius: 0 }}
          size="small"
          hoverable
        >
          {cardContent}
        </Card>
      </ConfigProvider>
    </li>
  )
}

export default MovieCard
