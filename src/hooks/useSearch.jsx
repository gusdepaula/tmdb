import { useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [moviesSearch, setMoviesSearch] = useState([]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (searchTerm) {
      const controller = new AbortController();

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

      return function () {
        controller.abort();
      };
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return { handleOnSubmit, handleOnChange, moviesSearch, searchTerm };
}
