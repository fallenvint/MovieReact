import React, {useState, useEffect, useCallback} from 'react';
import MovieHeader from './Movie/MovieHeader';
import MovieMain from './Movie/MovieMain';
import Context from './context';

const App = () => {
    let [modal, setModal] = useState();
    let [favorites, setFavorites] = useState(localStorage.getItem('fav-movies') ? JSON.parse(localStorage.getItem('fav-movies')) : []);

    const handleCreateModal = useCallback((id) => {
        setModal(id);
    }, []);

    const handleAddFavorite = useCallback((item) => {
        setFavorites([item].concat(favorites));
    }, [favorites]);

    const handleRemoveFavorite = useCallback((id) => {
        setFavorites(favorites.filter(item => item.id !== id));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem('fav-movies', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <Context.Provider
            value={{modal, favorites, handleCreateModal, handleAddFavorite, handleRemoveFavorite}}>
            <MovieHeader/>
            <MovieMain/>
        </Context.Provider>
    );
}

export default App;
