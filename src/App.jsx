import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import { SearchContainer, Search, SearchButton } from "./components/Search";
import MovieContainer from "./components/MovieContainer";
import Movie from "./components/Movie";

const apiKey = import.meta.env.VITE_API_KEY;

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    getMovies(FEATURED_API, { signal: controller.signal });

    return function () {
      controller.abort();
    };
  }, []);

  async function getMovies(API, SIGNAL) {
    try {
      const res = await fetch(API, SIGNAL);
      if (!res.ok) throw new Error("Something went wrong with fetching movies");

      const data = await res.json();

      setMovies(data.results);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error(err.message);
      }
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      const controller = new AbortController();
      getMovies(SEARCH_API + searchTerm, { signal: controller.signal });
      setSearchTerm("");
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
      <MovieContainer>
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </MovieContainer>
    </>
  );
}

export default App;
