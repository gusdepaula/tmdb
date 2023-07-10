import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";
import styled from "styled-components";

const apiKey = import.meta.env.VITE_API_KEY;

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`;

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

const Header = styled.header`
  background-color: #373b69;
  display: flex;
  padding: 1rem;
  justify-content: flex-end;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Search = styled.input`
  background-color: transparent;
  border: 2px solid #22254b;
  border-radius: 50px;
  color: #fff;
  font-family: inherit;
  font-size: 1.2rem;
  padding: 0.5rem 1.5rem;

  &:focus {
    outline: 0;
  }
`;

const SearchButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 5px;
  margin-left: 5px;
  cursor: pointer;
  position: absolute;
  right: 33px;
  font-size: 1.5rem;
`;

const MovieContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  async function getMovies(API) {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Something went wrong with fetching movies");

      const data = await res.json();

      setMovies(data.results);
    } catch (err) {
      console.error(err.message);
    }
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
