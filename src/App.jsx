import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

const apiKey = import.meta.env.VITE_API_KEY;

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  async function getMovies(API) {
    const res = await fetch(API);
    const data = await res.json();
    setMovies(data.results);
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);

      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <div className="search-container">
            <input
              type="search"
              className="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleOnChange}
            />
            <button className="search-button" onClick={handleOnSubmit}>
              🔎
            </button>
          </div>
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
