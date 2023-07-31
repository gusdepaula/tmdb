import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"; // Importe o styled-components

const apiKey = import.meta.env.VITE_API_KEY;
const IMAGES_API = "https://image.tmdb.org/t/p/w1280/";

const MovieContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const MovieTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
`;

const MovieImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const MovieOverview = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #666;
`;

const ReleaseDate = styled.p`
  font-weight: bold;
  margin-top: 10px;
  color: #999;
`;

function NewMovie() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const IMAGES_API = "https://image.tmdb.org/t/p/w1280/";

  const { id } = useParams(); // Obtém o ID do filme da URL

  const [movie, setMovie] = useState({});

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovie() {
        try {
          const res = await fetch(
            //343611?api_key=API_KEY
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movie");

          const data = await res.json();
          console.log(data);
          setMovie(data); // Ajuste para setar o objeto completo, não apenas data.results
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
    },
    [id, apiKey]
  );
  return (
    <MovieContainer>
      <MovieTitle>{movie.title}</MovieTitle>
      <MovieImage
        src={
          movie.poster_path
            ? IMAGES_API + movie.poster_path
            : "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1759&q=80"
        }
        alt={movie.title}
      />
      <MovieOverview>{movie.overview}</MovieOverview>
      <ReleaseDate>Data de Lançamento: {movie.release_date}</ReleaseDate>
    </MovieContainer>
  );
}

export default NewMovie;
