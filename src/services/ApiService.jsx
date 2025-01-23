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
}
