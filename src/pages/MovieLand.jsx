import React, { useEffect, useState } from 'react'
import '../style/MovieLand.css'
import SearchSvg from '/search.svg'

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
    <div className="app mt-7">
      <h1>Movie Land</h1>
    </div>

    <div className="container mx-auto">
      <form onSubmit={handleSearch}>
        <input type="text"
          className='bg-zinc-900' autoFocus={true} value={moviename} onChange={(e) => setMoviename(e.target.value)} />
        <button
          className='bg-zinc-800 border-zinc-600 rounded-e-md rounded-s-none' onSubmit={() => handleSearch()} type='submit'>
          Search
        </button>
      </form>

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