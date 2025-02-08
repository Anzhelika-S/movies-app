export default class ApiService {
  // _apiBase = 'https://api.themoviedb.org/3/movie'
  _apiToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzQ4YTA1MTEyMjQ1NmViOThlNmU0ZjgzZDFkYThjNiIsIm5iZiI6MTY2NzA1MTA4NC43NCwic3ViIjoiNjM1ZDJlNGM5NDUxZTcwMDdmMmM3NjMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Afes_tq2FLqSuLKiRvgqQNsYG6So_L_jbtebNXkzNHc';

  async getApi(value, page) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this._apiToken}`,
      },
    };

    let res;

    if (value) {
      res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=${page}`,
        options
      );
    } else {
      res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, options);
    }

    if (!res.ok) {
      throw new Error('Could not fetch');
    }

    return await res.json();
  }

  async getMovieDetails(id) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this._apiToken}`,
      },
    };

    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);

    if (!res.ok) {
      throw new Error('Could not fetch');
    }

    return await res.json();
  }

  async getGuestSession() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this._apiToken}`,
      },
    };

    const res = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options);

    if (!res.ok) {
      throw new Error('Could not fetch');
    }

    return await res.json();
  }

  async addRating(id, apiKey, rate) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${this._apiToken}`,
      },
      body: JSON.stringify({ value: rate }),
    };

    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${apiKey}`, options)
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return res;
  }

  async getRatedMovies(apiKey) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this._apiToken}`,
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${apiKey}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
      options
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return res;
  }

  async getRatedMoviesFromPage(guestID, page) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this._apiToken}`,
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestID}/rated/movies?language=en-US&page=${page}`,
      options
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return res;
  }

  async getGenres() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this._apiToken}`,
      },
    };

    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list', options)
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return res;
  }
}
