import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

export function useMovie() {
  const [movie, setMovie] = useState([]);

  useEffect(function () {
    const controller = new AbortController();

    async function fetchMovie() {
      try {
        const res = await fetch(
          //343611?api_key=API_KEY
          `https://api.themoviedb.org/3/movie/${id}?${apiKey}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movie");

        const data = await res.json();
        setMovie(data.results);
      } catch (err) {
        if (err.message !== "The user aborted a request.") {
          console.log(err.message);
        }
      }
    }

    fetchMovie();

    return function () {
      controller.abort();
    };
  }, []);

  return { movie };
}
