import React, {useCallback, useState, useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import noposter from '../img/no-image.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';

const posterUrl = 'https://image.tmdb.org/t/p/w342';

const MovieModal = ({favorites, onAdd, onRemove}) => {
    const {page, id} = useParams();
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(1);
    let [lastPage, setLastPage] = useState();
    let [npIndex, setNpIndex] = useState([]);
    let [favItem, setFavItem] = useState({});

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${page}`)
            .then((response) => response.json())
            .then((json) => {
                setData(json.results);
                setLastPage(json.total_pages);
            });

        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${+page + 1}`)
            .then((response) => response.json())
            .then((json) => {
                setNpIndex(json.results[0].id);
            });
    }, [page]);

    useEffect(() => {
        setIndex(data.map(object => object.id).indexOf(+id));
    }, [data, id]);

    useEffect(() => {
        document.title = data[index]?.title;
        setFavItem({
            id: data[index]?.id,
            title: data[index]?.title,
            overview: data[index]?.overview,
            poster_path: data[index]?.poster_path
        });
    }, [data, index]);

    const lastMovie = (data.length === index + 1 && lastPage === +page);
    const nextMovieId = (index === 19) ? {page: +page + 1, id: npIndex} : {page: +page, id: data[index + 1]?.id};
    let date = new Date(data[index]?.release_date);

    const handleAddFav = useCallback(() => onAdd(favItem), [onAdd, favItem]);
    const handleRemoveFav = useCallback(() => onRemove(favItem.id), [onRemove, favItem.id]);
    const compare = useCallback((element) => element.id === favItem.id, [favItem.id]);

    return (
        <div className="modal" style={{backgroundImage: `url(${posterUrl + data[index]?.backdrop_path})`}}>
            <div className="modal-container">
                <div className="modal-nav">
                    <Link to={`/${page}`}>
                        <button>
                            <i><FontAwesomeIcon icon={faChevronLeft}/></i>
                            <span>Back to list</span>
                        </button>
                    </Link>

                    {(nextMovieId && !lastMovie) &&
                        <Link to={`/${nextMovieId.page}/movie/${nextMovieId.id}`}>
                            <button>
                                <span>Next movie</span>
                                <i><FontAwesomeIcon icon={faChevronRight}/></i>
                            </button>
                        </Link>
                    }
                </div>
                <div className="modal-movie">
                    <div className="modal-movie_poster">
                        <img
                            src={!data[index]?.poster_path ? noposter : posterUrl + data[index]?.poster_path}
                            alt={data[index]?.title}
                        />
                    </div>
                    <div className="modal-movie_info">
                        <div className="modal-movie_favorite">
                            <button
                                className="button"
                                onClick={favorites.some(compare) ? handleRemoveFav : handleAddFav}>
                                {favorites.some(compare) ? 'Unfavorite' : 'Add to favorite'}
                            </button>
                        </div>
                        <div className="modal-movie_title">
                            {data[index]?.title}
                            <span>({date.toLocaleDateString('en-Us', {year: 'numeric'})})</span>
                        </div>
                        <div className="modal-movie_rate">
                            <div className="rate_score">Score:<span>{data[index]?.vote_average}</span></div>
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
                        <div className="modal-movie_overview">{data[index]?.overview}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieModal;
