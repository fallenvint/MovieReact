import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {runInAction} from 'mobx';
import {observer} from 'mobx-react';
import {fetchStore} from '../../stores';
import ListPoster from './ListPoster';
import Pagination from '../../components/pagination/Pagination';
import style from './List.module.css';

const fetStore = fetchStore();

const List = observer(() => {
    const {page} = useParams();

    useEffect(() => {
        runInAction(() => {
            fetStore.currentPage = (!page) ? 1 : +page;
            fetStore.fetchPage(fetStore.currentPage);
        });
    }, [page]);

    useEffect(() => {
        document.title = 'Movie DB';
    }, []);

    return (
        !!fetStore.totalPages &&
        <div>
            <div className="page-title">Latest Releases</div>
            <div className={`${style.posters} page-content`}>
                {
                    fetStore.results?.map((movie) => {
                        return (
                            <ListPoster
                                key={movie.id}
                                movie={movie}
                                page={fetStore.currentPage}/>
                        );
                    })
                }
            </div>
            <Pagination page={fetStore.currentPage} totalPage={fetStore.totalPages}/>
        </div>
    )
});

export default List;
