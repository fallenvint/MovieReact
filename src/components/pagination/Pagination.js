import React from 'react';
import {useNavigate} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.css';


const Pagination = ({page, totalPage}) => {
    const navigate = useNavigate();
    const first = (page === 1) && style.first;
    const last = (page === totalPage) && style.last;

    const handlePageClick = (event) => {
        navigate(`/${event.selected + 1}`, {replace: true});
    }

    return (
        <ReactPaginate
            pageCount={totalPage}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            forcePage={page - 1}
            onPageChange={handlePageClick}
            previousLabel="prev"
            breakLabel="..."
            nextLabel="next"
            containerClassName={style.pagination}
            activeLinkClassName={`${style.current} ${first} ${last}`}
            previousLinkClassName={style.prev}
            nextLinkClassName={style.next}
            breakLinkClassName={style.separator}
            disabledClassName={`hide`}
        />
    )
}

export default Pagination;
