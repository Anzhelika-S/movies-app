import './App.css'
import { Component } from 'react'

import ApiService from './services/ApiService'
import MovieList from './components/MovieList'
import MovieSearch from './components/MovieSearch'

export default class App extends Component {
  api = new ApiService()

  state = {
    movies: []
  }

  constructor() {
    super()
    this.updateList()
  }

  onListLoaded = (list) => {
    this.setState({movies: list.results})        
  }

  updateList() {
    this.api.getApi().then(this.onListLoaded)
  }


  render() {

    const {movies} = this.state

    return(
      <>
        <MovieSearch />
        <MovieList movies={movies} />
      </>
    )
  }   
    
}
