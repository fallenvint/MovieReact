import React, {useCallback} from 'react';
import {Link} from "react-router-dom";
import noposter from '../img/no-image.png'

const posterUrl = 'https://image.tmdb.org/t/p/w342';

const MovieListPoster = ({movie, index, page, onCreateModal}) => {
    const handleSetModalId = useCallback(() => onCreateModal(index), [onCreateModal, index]);

    return (
        <div className="poster" key={movie.id}>
            <Link to={`/${page}/movie/${movie.id}`} onClick={handleSetModalId}>
                <img src={!movie.poster_path ? noposter : posterUrl + movie.poster_path}
                     alt={movie.title} title={movie.title}/>
            </Link>
        </div>
    )
}

export default MovieListPoster;
