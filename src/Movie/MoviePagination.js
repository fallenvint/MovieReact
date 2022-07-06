import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import cn from 'classnames';


const MoviePagination = ({page, totalPage}) => {
    let [pageObj, setPageObj] = useState({
        a: page,
        b: page + 1,
        c: page + 2,
        d: page + 3,
        e: page + 4
    });

    useEffect(() => {
        if (page >= 4 && page <= totalPage - 3) {
            setPageObj({
                a: page - 2,
                b: page - 1,
                c: page,
                d: page + 1,
                e: page + 2
            });
        } else if (page > totalPage - 4) {
            setPageObj({
                a: totalPage - 4,
                b: totalPage - 3,
                c: totalPage - 2,
                d: totalPage - 1,
                e: totalPage
            });
        } else {
            setPageObj({
                a: 1,
                b: 2,
                c: 3,
                d: 4,
                e: 5
            });
        }
    }, [page, totalPage]);

    return (
        <div className="page-pagination">
            <Link
                to={"/1"}
                className={cn('page', {'hide': page === 1})}
            >
                first
            </Link>

            {
                (page - 1 > 0) &&
                <Link
                    to={`/${page - 1}`}
                    className={cn('page separator', {'hide': page === 1})}
                >
                    prev
                </Link>
            }

            <span className={cn('separator', {'hide': page < 4})}>...</span>

            {
                Object.keys(pageObj).map((key, index) => {
                    return (
                        <Link
                            to={`/${pageObj[key]}`}
                            className={
                                cn('page', {
                                    'current': pageObj[key] === page,
                                    'first': pageObj[key] === 1,
                                    'last': pageObj[key] === totalPage
                                })
                            }
                            key={index}
                        >
                            {pageObj[key]}
                        </Link>
                    )
                })
            }

            <span className={cn('separator', {'hide': page > totalPage - 3})}>...</span>

            {
                (page < totalPage) &&
                <Link
                    to={`/${page + 1}`}
                    className={cn('page separator', {'hide': page === totalPage})}
                >
                    next
                </Link>
            }

            <Link
                to={`/${totalPage}`}
                className={cn('page', {'hide': page === totalPage})}
            >
                last
            </Link>
        </div>
    )
}

export default MoviePagination;
