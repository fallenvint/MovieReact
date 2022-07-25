import {observable, action, computed, makeObservable, toJS} from 'mobx';

const fetchStore = () => {
    return makeObservable({
        data: {},
        movieId: 1,
        npMovieId: 1,
        get totalPages() {
            return this.data.total_pages;
        },
        get results() {
            return toJS(this.data.results);
        },
        get movieIndex() {
            return this.results?.map(object => object.id).indexOf(this.movieId);
        },
        setMovieId(id) {
            this.movieId = id;
        },
        fetchPage(page) {
            fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${page}`)
                .then((response) => response.json())
                .then((json) => {
                    this.data = json;
                });
        },
        setNpMovieId(page) {
            page < this.data.total_pages &&
            fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${page + 1}`)
                .then((response) => response.json())
                .then((json) => {
                    this.npMovieId = json.results[0].id;
                });
        }
    }, {
        data: observable,
        movieId: observable,
        npMovieId: observable,
        totalPages: computed,
        results: computed,
        movieIndex: computed,
        setMovieId: action.bound,
        fetchPage: action.bound,
        setNpMovieId: action.bound,
    });
}

export const fetStore = fetchStore();
