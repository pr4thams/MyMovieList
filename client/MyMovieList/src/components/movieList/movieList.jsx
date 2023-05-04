import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = ({type}) => {
  const [movieList, setMovieList] = useState([]);
  

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [type]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=893869eb017e64232e24224eaf3aece5&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovieList(data.results));
  };

  return (
    <div className="movie__list">
      <h2 className="list__title">
      {(type ? type.replace("_", " ") : "POPULAR").toUpperCase()}
      </h2>
      <div className="list__cards-container">
        <div className="list__cards">
          {movieList.map((movie) => (
            <Cards movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

