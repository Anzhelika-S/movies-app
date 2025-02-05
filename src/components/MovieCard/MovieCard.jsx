import './MovieCard.css';
import { Card, ConfigProvider, Rate } from 'antd';
import { format } from 'date-fns';
import { Component } from 'react';

import ApiService from '../../services/ApiService';

export default class MovieCard extends Component {
  state = {
    genres: [],
  };

  api = new ApiService();

  addPoster = () => {
    const { poster } = this.props;
    return poster ? `https://image.tmdb.org/t/p/w185/${poster}` : 'https://movienewsletters.net/photos/000000H1.jpg';
  };

  formatDate = () => {
    const { releaseDate } = this.props;
    if (!releaseDate) return 'N/A';

    try {
      const movieDate = new Date(releaseDate);
      return format(movieDate, 'PP');
    } catch (error) {
      return 'N/A';
    }
  };

  shortenOverview = () => {
    const { overview } = this.props;
    if (!overview) return 'No overview available';
    return overview.length > 200 ? `${overview.substring(0, overview.lastIndexOf(' ', 200))}...` : overview;
  };

  addVote = () => {
    const { vote } = this.props;

    let voteClass = 'movie-vote ';

    if (vote <= 3) {
      voteClass += 'red';
    } else if (vote <= 5) {
      voteClass += 'orange';
    } else if (vote <= 7) {
      voteClass += 'yellow';
    } else if (vote > 7) {
      voteClass += 'green';
    }

    return <div className={voteClass}>{vote.toFixed(1)}</div>;
  };

  addGenres = async (id) => {
    const details = await this.api.getMovieDetails(id);
    const genres = details.genres.map((genre) => genre.name);

    this.setState({ genres });
  };

  componentDidMount() {
    this.addGenres(this.props.id);
  }

  render() {
    const { id, title } = this.props;

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
          <Card style={{ width: 450, height: 280, borderRadius: 0 }} size="small" hoverable>
            <div className="movie-card-content">
              <img src={this.addPoster()} alt={`${title} Poster`} className="movie-poster" />
              <div className="movie-details">
                <h3 className="movie-title">{title}</h3>
                {this.addVote()}
                <div className="movie-release-date">{this.formatDate()}</div>
                <div className="movie-genres">
                  {this.state.genres.map((genre) => (
                    <span className="genres" key={`genre-${genre}`}>
                      {' '}
                      {genre}{' '}
                    </span>
                  ))}
                </div>
                <div className="movie-overview">{this.shortenOverview()}</div>
                <ConfigProvider
                  theme={{
                    components: {
                      Rate: {
                        starSize: 15,
                      },
                    },
                  }}
                >
                  <Rate allowHalf count={10} className="movie-rating" />
                </ConfigProvider>
              </div>
            </div>
          </Card>
        </ConfigProvider>
      </li>
    );
  }
}
