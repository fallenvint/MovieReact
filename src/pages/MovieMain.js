import React from 'react';
import {Navigate, useRoutes} from 'react-router-dom';
import List from './poster_list/List';
import Favorite from './favorite/Favorite';
import Modal from './modal/Modal';

const SameRoutes = () => useRoutes([
    {path: "/", element: <List/>},
    {path: "/:page", element: <List/>},
    {path: "/1", element: <Navigate to="/" replace/>},
    {path: "my_favorite", element: <Favorite/>},
    {path: "/:page/movie/:id", element: <Modal/>}
]);

const MovieMain = () => {
    return (
        <main>
            <SameRoutes/>
        </main>
    )
}

export default MovieMain;
