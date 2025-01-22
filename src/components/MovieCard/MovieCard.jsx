import './MovieCard.css';
import { Card, ConfigProvider, Spin } from 'antd';
import { format } from 'date-fns';
import { Component } from 'react';

export default class MovieCard extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1000);
  }

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
      console.error('Invalid release date format:', releaseDate, error);
      return 'N/A';
    }
  };

  shortenOverview = () => {
    const { overview } = this.props;
    if (!overview) return 'No overview available';
    return overview.length > 230 ? `${overview.substring(0, overview.lastIndexOf(' ', 230))}...` : overview;
  };

  render() {
    const { id, title } = this.props;
    const { loading } = this.state;

    const cardContent = (
      <div className="movie-card-content">
        <img src={this.addPoster()} alt={`${title} Poster`} className="movie-poster" />
        <div className="movie-details">
          <h3 className="movie-title">{title}</h3>
          <div className="movie-release-date">{this.formatDate()}</div>
          <div className="movie-genres">Action, Drama</div>
          <div className="movie-overview">{this.shortenOverview()}</div>
        </div>
      </div>
    );

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
            {loading ? (
              <div className="card-loading">
                <Spin size="large" />
              </div>
            ) : (
              cardContent
            )}
          </Card>
        </ConfigProvider>
      </li>
    );
  }
}
