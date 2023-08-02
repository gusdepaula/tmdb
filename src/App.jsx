import HeaderWithSearch from "./components/Header";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import MovieContainer from "./components/MovieContainer";
import Movie from "./components/Movie";

function App() {
  const { movies } = useMovies();
  const { handleOnSubmit, handleOnChange, moviesSearch, searchTerm } =
    useSearch();

  return (
    <>
      <HeaderWithSearch
        searchTerm={searchTerm}
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
      />
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
