import './MovieCard.css';
import { Card, ConfigProvider, Rate } from 'antd';
import { format } from 'date-fns';
import { Component } from 'react';

import { GenresConsumer } from '../../context/GenresContext';

export default class MovieCard extends Component {
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

  render() {
    const { id, title, movieGenres, addRating, guestID, userRating } = this.props;

    return (
      <GenresConsumer>
        {(genres) => (
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
                    <ul className="movie-genres">
                      {movieGenres &&
                        movieGenres.map((genreId, idx) => (
                          <li key={idx} className="movie-genre">
                            <span>{genres && genres.find(({ id }) => id === genreId).name}</span>
                          </li>
                        ))}
                    </ul>
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
                      <Rate
                        allowHalf
                        defaultValue={userRating}
                        count={10}
                        className="movie-rating"
                        onChange={async (value) => {
                          await addRating(id, guestID, value);
                        }}
                      />
                    </ConfigProvider>
                  </div>
                </div>
              </Card>
            </ConfigProvider>
          </li>
        )}
      </GenresConsumer>
    );
  }
}
