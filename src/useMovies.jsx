import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

export function useMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(function () {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=1`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        if (err.message !== "The user aborted a request.") {
          console.log(err.message);
        }
      }
    }

    fetchMovies();

    return function () {
      controller.abort();
    };
  }, []);

  return { movies };
}
