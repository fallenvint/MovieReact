import {observable, action, computed, makeObservable, toJS} from 'mobx';

export const favoriteStore = () => {
    return makeObservable({
        moviesArray: localStorage.getItem('fav-movies') ? JSON.parse(localStorage.getItem('fav-movies')) : [],
        get jsArray() {
            return toJS(this.moviesArray);
        },
        addMovie(item) {
            const newArray = [item].concat(...this.jsArray);

            localStorage.setItem('fav-movies', JSON.stringify(newArray));
            this.moviesArray = JSON.parse(localStorage.getItem('fav-movies'));
        },
        removeMovie(id) {
            localStorage.setItem('fav-movies', JSON.stringify(this.jsArray.filter(item => item.id !== id)));
            this.moviesArray = JSON.parse(localStorage.getItem('fav-movies'));
        }
    }, {
        moviesArray: observable,
        jsArray: computed,
        addMovie: action.bound,
        removeMovie: action.bound
    });
}
