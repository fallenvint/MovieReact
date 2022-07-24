import React from 'react';
import {Link} from 'react-router-dom';
import noposter from '../../img/no-image.png'
import style from './List.module.css';

const posterUrl = 'https://image.tmdb.org/t/p/w342';

const ListPoster = ({movie, page}) => {
    return (
        <div className={style.poster} key={movie.id}>
            <Link to={`/${page}/movie/${movie.id}`}>
                <img
                    src={!movie.poster_path ? noposter : posterUrl + movie.poster_path}
                    alt={movie.title}
                    title={movie.title}
                />
            </Link>
        </div>
    )
}

export default ListPoster;
