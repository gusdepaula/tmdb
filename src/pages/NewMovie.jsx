import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";

const MovieContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
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
  font-size: 16px;
  line-height: 1.5;
  color: #666;
`;

const Genres = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #666;
`;

const Duration = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #666;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  color: #666;
`;

const StarIcon = styled(AiFillStar)`
  color: #ffbb00;
  font-size: 20px;
  margin-right: 5px;
`;

const BackButton = styled.button`
  position: absolute;
  top: 10px;
  right: 25px;
  display: flex;
  align-items: center;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  z-index: 1;

  &:hover {
    background-color: #444;
  }
`;

function NewMovie() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const IMAGES_API = "https://image.tmdb.org/t/p/w1280/";

  const { id } = useParams(); // Obtém o ID do filme da URL

  const [movie, setMovie] = useState({});

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
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

    return () => {
      controller.abort();
    };
  }, [id, apiKey]);

  const renderStars = (rating) => {
    const maxRating = 5;
    const scaledRating = Math.round((rating / 10) * maxRating);

    const ratingWithOneDecimal = movie.vote_average
      ? parseFloat(movie.vote_average.toFixed(1))
      : 0;

    // Criamos um array com o tamanho do valor arredondado para representar as estrelas
    const starsArray = Array.from({ length: scaledRating }, (_, index) => (
      <StarIcon key={index} />
    ));

    return (
      <RatingContainer>
        {starsArray}
        <span>{ratingWithOneDecimal}</span>
      </RatingContainer>
    );
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  }

  function formatDuration(durationInMinutes) {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours}h ${minutes}min`;
  }

  return (
    <MovieContainer>
      <BackButton onClick={handleGoBack}>&times;</BackButton>
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
      {movie.status === "Released" ? (
        <ReleaseDate>
          Release date: {formatDate(movie.release_date)}
        </ReleaseDate>
      ) : (
        ""
      )}
      <Genres>
        Genres:{" "}
        {movie.genres ? movie.genres.map((genre) => genre.name).join(", ") : ""}
      </Genres>
      <Duration>Duration: {formatDuration(movie.runtime)}</Duration>
      {renderStars(movie.vote_average)}
    </MovieContainer>
  );
}

export default NewMovie;
