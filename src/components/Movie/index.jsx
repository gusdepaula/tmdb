import React from "react";
import styled, { css } from "styled-components";

const IMAGES_API = "https://image.tmdb.org/t/p/w1280/";

const MovieBox = styled.div`
  background-color: #373b69;
  border-radius: 3px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 1rem;
  margin: 1rem;
  width: 300px;
  position: relative;

  & img {
    width: 100%;
    height: 450px;
    object-fit: cover;
  }

  & .movie-over {
    background-color: #fff;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    box-shadow: 0 -3px 5px rgba(0, 0, 0, 0.1);
    position: absolute;
    color: #22254b;
    padding: 1rem;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    max-height: 100%;
    transform: translateY(102%);
    transition: transform 0.3s ease-in-out;
  }

  &:hover .movie-over {
    transform: translateY(0%);
  }
`;

const MovieInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  & h3 {
    margin: 0;
  }
`;

const Tag = styled.span`
  background-color: #22254b;
  padding: 0.5rem;
  border-radius: 5px;
  font-weight: bold;

  &.green {
    color: green;
  }

  &.orange {
    color: orange;
  }

  &.red {
    color: red;
  }
`;

const setVoteClass = (vote) => {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 6) {
    return "orange";
  } else {
    return "red";
  }
};

const Movie = ({ title, poster_path, overview, vote_average }) => (
  <MovieBox>
    <img
      src={
        poster_path
          ? IMAGES_API + poster_path
          : "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1759&q=80"
      }
      alt={title}
    />
    <MovieInfo>
      <h3>{title}</h3>
      <Tag className={setVoteClass(vote_average)}>{vote_average}</Tag>
    </MovieInfo>
    <div className="movie-over">
      <h2>Overview:</h2>
      <p>{overview}</p>
    </div>
  </MovieBox>
);

export default Movie;
