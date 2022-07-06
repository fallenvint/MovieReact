import React, {useContext, useEffect, useState} from 'react';
import MovieListPoster from "./MovieListPoster";
import MoviePagination from "./MoviePagination";
import Context from "../context";
import {useParams} from "react-router-dom";

const MovieList = () => {
    let {handleCreateModal} = useContext(Context);
    let {page} = useParams();
    let [data, setData] = useState([]);
    let [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        (!page)? setPageNum(1) : setPageNum(page);

        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${pageNum}`)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
            });
    }, [page, pageNum]);

    useEffect(() => {
        document.title = 'Movie DB';
    });

    if (!!data.results) {
        return (
            <div>
                <div className="page-title">Latest Releases</div>
                <div className="page-content posters">
                    {
                        data.results.map((movie, index) => {
                            return (
                                <MovieListPoster
                                    key={movie.id}
                                    movie={movie}
                                    index={index}
                                    page={pageNum}
                                    onCreateModal={handleCreateModal}
                                />
                            );
                        })
                    }
                </div>
                <MoviePagination page={data.page} totalPage={data.total_pages}/>
            </div>
        )
    }
}

export default MovieList;
