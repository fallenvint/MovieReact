import React, {useCallback, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {runInAction} from 'mobx';
import {observer} from 'mobx-react';
import {favoriteStore, fetchStore} from '../../stores';
import style from './Modal.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import noposter from '../../img/no-image.png'

const favStore = favoriteStore();
const fetStore = fetchStore();
const posterUrl = 'https://image.tmdb.org/t/p/w342';

const Modal = observer(() => {
        const {page, id} = useParams();

        useEffect(() => {
            runInAction(() => {
                favStore.moviesArray = JSON.parse(localStorage.getItem('fav-movies'));
                fetStore.currentPage = +page;
                fetStore.movieId = +id;
                fetStore.fetchPage();
                fetStore.setNpMovieId();
            });
        }, [page, id]);

        const date = (!!fetStore.results) ? new Date(fetStore.results[fetStore.movieIndex]?.release_date) : '';
        const lastMovie = (!!fetStore.results) ? (fetStore.results.length === fetStore.movieIndex + 1 && fetStore.totalPages === +page) : '';
        document.title = (!!fetStore.results) ? fetStore.results[fetStore.movieIndex]?.title : '';

        const compare = useCallback((element) => element.id === +id, [id]);

        return (
            !!fetStore.results &&
            <div className={style.modal}
                 style={{backgroundImage: `url(${posterUrl + fetStore.results[fetStore.movieIndex]?.backdrop_path})`}}>
                <div className={style.modal_container}>
                    <div className={style.modal_nav}>
                        <Link to={`/${page}`}>
                            <button>
                                <i><FontAwesomeIcon icon={faChevronLeft}/></i>
                                <span>Back to list</span>
                            </button>
                        </Link>

                        {
                            (!lastMovie) &&
                            <Link
                                to={
                                    (fetStore.movieIndex === 19) ? `/${fetStore.currentPage + 1}/movie/${fetStore.npMovieId}` : `/${fetStore.currentPage}/movie/${fetStore.results[fetStore.movieIndex + 1]?.id}`
                                }>
                                <button>
                                    <span>Next movie</span>
                                    <i><FontAwesomeIcon icon={faChevronRight}/></i>
                                </button>
                            </Link>
                        }
                    </div>
                    <div className={style.modal_movie}>
                        <div className={style.modal_movie__poster}>
                            <img
                                src={!fetStore.results[fetStore.movieIndex]?.poster_path ? noposter : posterUrl + fetStore.results[fetStore.movieIndex]?.poster_path}
                                alt={fetStore.results[fetStore.movieIndex]?.title}
                            />
                        </div>
                        <div className={style.modal_movie__info}>
                            <div className={style.modal_movie__favorite}>
                                <button
                                    className={style.button}
                                    onClick={() => {
                                        favStore.moviesArray.some(compare) ? favStore.removeMovie(+id) : favStore.addMovie({
                                            id: +id,
                                            title: fetStore.results[fetStore.movieIndex]?.title,
                                            overview: fetStore.results[fetStore.movieIndex]?.overview,
                                            poster_path: fetStore.results[fetStore.movieIndex]?.poster_path
                                        });
                                    }}>
                                    {favStore.moviesArray.some(compare) ? 'Unfavorite' : 'Add to favorite'}
                                </button>
                            </div>
                            <div className={style.modal_movie__title}>
                                {fetStore.results[fetStore.movieIndex]?.title}
                                <span>({date.toLocaleDateString('en-Us', {year: 'numeric'})})</span>
                            </div>
                            <div className={style.modal_movie__rate}>
                                <div
                                    className="rate_score">Score:<span>{fetStore.results[fetStore.movieIndex]?.vote_average}</span>
                                </div>
                                <div className="rate_date">Release Date:
                                    <span>
                                    {date.toLocaleDateString('en-Us', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                                </div>
                            </div>
                            <div className={style.modal_movie__overview}>{fetStore.results[fetStore.movieIndex]?.overview}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
);

export default Modal;
