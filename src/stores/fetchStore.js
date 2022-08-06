import {action, computed, makeObservable, observable, runInAction, toJS} from 'mobx';

const fetchMoviesJSON = async (pageNum) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${pageNum}`);
    return await response.json();
};

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
            fetchMoviesJSON(page).then(data => {
                runInAction(() => {
                    this.data = data;
                });
            });
        },
        setNpMovieId(page) {
            page < this.totalPages &&
            fetchMoviesJSON(page+1).then(data => {
                runInAction(() => {
                    this.npMovieId = data.results[0].id;
                });
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
};

export const fetStore = fetchStore();
