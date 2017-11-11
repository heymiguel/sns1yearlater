import React from 'react';
import Movie from './Movie';

const MovieCatalogue = (props) => {
    return (
        <div className="movie-catalogue">
            {props.movies.map(movie => <Movie key={movie._id} fetchMovies={props.fetchMovies} {...movie} />)}
        </div>
    );
};

export default MovieCatalogue;