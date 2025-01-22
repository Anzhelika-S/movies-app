export default class ApiService {
  // _apiBase = 'https://api.themoviedb.org/3/movie'

  async getApi() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzQ4YTA1MTEyMjQ1NmViOThlNmU0ZjgzZDFkYThjNiIsIm5iZiI6MTY2NzA1MTA4NC43NCwic3ViIjoiNjM1ZDJlNGM5NDUxZTcwMDdmMmM3NjMwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Afes_tq2FLqSuLKiRvgqQNsYG6So_L_jbtebNXkzNHc',
      },
    }

    const res = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1',
      options,
    )

    if (!res.ok) {
      throw new Error('Could not fetch')
    }

    return await res.json()
  }
}
