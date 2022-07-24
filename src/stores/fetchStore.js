import {observable, action, computed, makeObservable, toJS} from 'mobx';

export const fetchStore = () => {
    return makeObservable({
        data: {},
        currentPage: 1,
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
        fetchPage() {
            fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${this.currentPage}`)
                .then((response) => response.json())
                .then((json) => {
                    this.data = json;
                });
        },
        setNpMovieId() {
            fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${this.currentPage+1}`)
                .then((response) => response.json())
                .then((json) => {
                    this.npMovieId = json.results[0].id;
                });
        }
    }, {
        data: observable,
        currentPage: observable,
        movieId: observable,
        npMovieId: observable,
        totalPages: computed,
        results: computed,
        movieIndex: computed,
        setNpMovieId: action.bound,
        fetchPage: action.bound,
    });
}
