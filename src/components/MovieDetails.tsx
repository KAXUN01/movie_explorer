import React from "react";
import { useParams } from "react-router-dom";

const MovieDetails: React.FC = () => {
  const { id } = useParams();
  return <div>Movie Details for ID: {id}</div>;
};

export default MovieDetails;
