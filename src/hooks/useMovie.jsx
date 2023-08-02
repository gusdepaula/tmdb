import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

export function useMovie(id) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovie() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movie");

        const data = await res.json();
        setMovie(data);
      } catch (err) {
        if (err.message !== "The user aborted a request.") {
          console.log(err.message);
        }
      }
    }

    fetchMovie();

    return () => {
      controller.abort();
    };
  }, [id]);

  return { movie };
}
