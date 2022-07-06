import React from "react";
import {Link, NavLink} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlay, faStar} from '@fortawesome/free-regular-svg-icons';
import {faStar as farStar} from '@fortawesome/free-solid-svg-icons';

const MovieHeader = () => {
    return (
        <header>
            <Link to={'/'}>
                <div className="logo-block">
                    <i><FontAwesomeIcon icon={faCirclePlay}/></i>
                    <span>Movies</span>
                </div>
            </Link>
            <div className="menu-block">
                <NavLink
                    to='my_favorite'
                    children={({isActive}) => {
                        const childActive = isActive ? {icon: farStar, class: 'active'} : {icon: faStar, class: ''};

                        return (
                            <div className={`menu-item button ${childActive.class}`}>
                                <span>My favorite</span>
                                <i><FontAwesomeIcon icon={childActive.icon}/></i>
                            </div>
                        );
                    }}
                />
            </div>
        </header>
    )
}

export default MovieHeader;
