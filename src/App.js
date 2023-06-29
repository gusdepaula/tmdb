import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3a66a6524b8bd8e2a826a73f5535335d&page=1";

const SEARCH_API =
  "https://api.themoviedb.org/3/discover/movie?&api_key=3a66a6524b8bd8e2a826a73f5535335d&query=";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setMovies(data.results);
      });
    // const moviesResp = await fetch(FEATURED_API);
    // const moviesR = await moviesResp.json();
  }, []);
  return (
    <div className="movie-container">
      {movies.length > 0 &&
        movies.map((movie) => <Movie key={movie.id} {...movie} />)}
    </div>
  );
}

export default App;
