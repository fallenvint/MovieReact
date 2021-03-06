import {observable, action, computed, makeObservable, toJS} from 'mobx';

const favoriteStore = () => {
    return makeObservable({
        favList: [],
        get jsFavList() {
            return toJS(this.favList);
        },
        updateFavList() {
            this.favList = JSON.parse(localStorage.getItem('fav-movies'));
        },
        addMovie(item) {
            const newArray = [item].concat(...this.jsFavList);

            localStorage.setItem('fav-movies', JSON.stringify(newArray));
            this.favList = JSON.parse(localStorage.getItem('fav-movies'));
        },
        removeMovie(id) {
            localStorage.setItem('fav-movies', JSON.stringify(this.jsFavList.filter(item => item.id !== id)));
            this.favList = JSON.parse(localStorage.getItem('fav-movies'));
        }
    }, {
        favList: observable,
        jsFavList: computed,
        updateFavList: action.bound,
        addMovie: action.bound,
        removeMovie: action.bound
    });
};

export const favStore = favoriteStore();
