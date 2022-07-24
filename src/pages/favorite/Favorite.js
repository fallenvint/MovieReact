import React, {useEffect} from 'react';
import {runInAction} from 'mobx';
import {observer} from 'mobx-react';
import {favoriteStore} from '../../stores';
import style from './Favorite.module.css';
import noposter from '../../img/no-image.png';

const favStore = favoriteStore();
const posterUrl = 'https://image.tmdb.org/t/p/w342';

const Favorite = observer(() => {
    useEffect(() => {
        runInAction(() => {
            favStore.moviesArray = JSON.parse(localStorage.getItem('fav-movies'));
        });

        document.title = 'My favorites';
    }, []);

    if (!!favStore.jsArray.length) {
        return (
            <div>
                <div className="page-title">My favorite</div>
                <div className={`${style.favorites} page-content`}>
                    {
                        favStore.jsArray.map((movie) => {
                            return (
                                <div className={style.favorite} key={movie.id}>
                                    <div className={style.favorite_movie}>
                                        <div className={style.favorite_movie__poster}>
                                            <img
                                                src={!movie.poster_path ? noposter : posterUrl + movie.poster_path}
                                                alt={movie.title}
                                                title={movie.title}
                                            />
                                        </div>
                                        <div className={style.favorite_movie__info}>
                                            <div>
                                                <button
                                                    className={style.button}
                                                    onClick={() => favStore.removeMovie(movie.id)}
                                                >
                                                    Unfavorite
                                                </button>
                                            </div>
                                            <div className={style.favorite_movie__title}>{movie.title}</div>
                                            <div className={style.favorite_movie__overview}>{movie.overview}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className="page-title">My favorite</div>
                <div className="empty">Favorite movies list is empty!</div>
            </div>
        )
    }
});

export default Favorite;
