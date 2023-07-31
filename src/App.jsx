import React, { useState } from "react";

import Header from "./components/Header";
import { SearchContainer, Search, SearchButton } from "./components/Search";
import MovieContainer from "./components/MovieContainer";
import Movie from "./components/Movie";
import { useMovies } from "./hooks/useMovies";

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [moviesSearch, setMoviesSearch] = useState([]);
  const { movies } = useMovies();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      const controller = new AbortController();

      async function fetchSearch() {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMoviesSearch(data.results);
        } catch (err) {
          console.log(err.message);
        }
      }

      fetchSearch();

      return function () {
        controller.abort();
      };
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Header>
        <form onSubmit={handleOnSubmit}>
          <SearchContainer>
            <Search
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleOnChange}
            />
            <SearchButton onClick={handleOnSubmit}>🔎</SearchButton>
          </SearchContainer>
        </form>
      </Header>
      {moviesSearch.length <= 0 ? (
        <MovieContainer>
          {movies.length > 0 &&
            movies.map((movie) => <Movie key={movie.id} {...movie} />)}
        </MovieContainer>
      ) : (
        <MovieContainer>
          {moviesSearch.map((movie) => (
            <Movie key={movie.id} {...movie} />
          ))}
        </MovieContainer>
      )}
    </>
  );
}

export default App;
