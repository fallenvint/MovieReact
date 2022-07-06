import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import MovieList from './MovieList';
import MovieFavorite from './MovieFavorite';
import MovieModal from './MovieModal';
import Context from "../context";

const MovieMain = () => {
    let {favorites, handleAddFavorite, handleRemoveFavorite} = useContext(Context);

    return (
        <main>
            <Routes>
                <Route path={'/'} element={<MovieList/>}/>
                <Route path={'/:page'} element={<MovieList/>}/>
                <Route path='/1' element={<Navigate to='/' replace/>}/>
                <Route path="my_favorite" element={<MovieFavorite/>}/>
                <Route path={'/:page/movie/:id'} element={
                    <MovieModal favorites={favorites} onAdd={handleAddFavorite} onRemove={handleRemoveFavorite}/>}/>
            </Routes>
        </main>
    )
}

export default MovieMain;
