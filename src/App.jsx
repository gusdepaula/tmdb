import { Suspense } from "react";
import HeaderWithSearch from "./components/Header";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import LazyMovieContainer from "./components/LazyMovieContainer";
import Movie from "./components/Movie";

function App() {
  const { movies } = useMovies();
  const { handleOnSubmit, handleOnChange, moviesSearch, searchTerm } =
    useSearch();

  return (
    <Suspense fallback={<SpinnerFullPage />}>
      <HeaderWithSearch
        searchTerm={searchTerm}
        handleOnSubmit={handleOnSubmit}
        handleOnChange={handleOnChange}
      />
      {moviesSearch.length <= 0 ? (
        <LazyMovieContainer>
          {movies.length > 0 &&
            movies.map((movie) => <Movie key={movie.id} {...movie} />)}
        </LazyMovieContainer>
      ) : (
        <LazyMovieContainer>
          {moviesSearch.map((movie) => (
            <Movie key={movie.id} {...movie} />
          ))}
        </LazyMovieContainer>
      )}
    </Suspense>
  );
}

export default App;
