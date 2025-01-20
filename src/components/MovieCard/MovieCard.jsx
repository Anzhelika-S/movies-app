import "./MovieCard.css";
import { Card, ConfigProvider } from "antd";
import { format } from "date-fns";

function MovieCard(props) {
  const { id, overview, poster, releaseDate, title } = props;

  const addPoster = () => {
    if (!poster) {
      return "https://movienewsletters.net/photos/000000H1.jpg";
    } else {
      return `https://image.tmdb.org/t/p/w185/${poster}`;
    }
  };

  const formatDate = () => {
    try {
      const movieDate = new Date(releaseDate.split("-").join(", "));
      return format(movieDate, "PP");
    } catch {
      return "N/A";
    }
  };

  const shortenOverview = () => {
    if (overview.length > 230) {
      let str = overview.substr(0, overview.lastIndexOf(" ", 230));
      console.log(str);

      return str + "...";
    } else {
      return overview;
    }
  };

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
        <Card style={{ width: 450, height: 280 }} size="small" hoverable>
          <img src={addPoster()} alt="Poster" className="movie-poster" />
          <div>
            <h3>{title}</h3>
            <div>{formatDate()}</div>
            <div>Action, Drama</div>
            <div>{shortenOverview()}</div>
          </div>
        </Card>
      </ConfigProvider>
    </li>
  );
}

export default MovieCard;
