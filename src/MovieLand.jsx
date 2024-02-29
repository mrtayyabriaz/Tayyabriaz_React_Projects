import React, { useEffect, useState } from 'react'
import './assets/style/MovieLand.css'
import SearchSvg from './assets/static/search.svg'

const api_url = 'https://www.omdbapi.com/?i=tt3896198&apikey=5d39e130';

const MovieLand = () => {

  const [searching, setSearching] = useState(true)
  const [movies, setMovies] = useState();
  const [moviename, setMoviename] = useState('batman');
  const [res, setRes] = useState(true);

  const searchMovies = async (title) => {
    const Movies = await fetch(`${api_url}&s=${title}`)
    const data = await Movies.json();

    setMovies(data);
    setSearching(false);
    let response = (data.Response === 'True');
    setRes(response);
    // console.log(response);
    // console.log(data.Response);
    // console.log(data);
  }

  useEffect(() => {
    searchMovies('batman');
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    moviename.length === 0 ? setRes(false) : searchMovies(moviename);
  }

  return (<>
    <div className="app">
      <h1>Movie Place</h1>
    </div>

    <div className="container">
      <div className="search">
        <form onSubmit={handleSearch}>
          <input type="text" autoFocus={true} value={moviename} onChange={(e) => setMoviename(e.target.value)} />
          <button onSubmit={() => handleSearch()} type='submit'>
            <img src={SearchSvg} alt="" />
          </button>
        </form>
      </div>

      <div className="empty">
        {searching ? "searching..." : ''}
      </div>

      <div className="movies">
        {res ? movies && movies.Search.map((movie) => (
          <div className="movie" key={movie.imdbID}>
            <img src={movie.Poster} alt="" />
            <div className="movie-info">
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
          </div>
        )) : 'Try Another Search'}
      </div>
    </div>

  </>
  )
}

export default MovieLand