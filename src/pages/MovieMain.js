import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import List from './poster_list/List';
import Favorite from './favorite/Favorite';
import Modal from './modal/Modal';

const MovieMain = () => {
    return (
        <main>
            <Routes>
                {
                    ['/', '/:page', '/1'].map((path, index) => {
                        return (
                            <Route
                                path={path}
                                element={(index !== 2) ? <List/> : <Navigate to="/" replace/>}
                                key={index}
                            />
                        )
                    })
                }
                <Route path="my_favorite" element={<Favorite/>}/>
                <Route path="/:page/movie/:id" element={<Modal/>}/>
            </Routes>
        </main>
    )
}

export default MovieMain;
