import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCirclePlay, faStar} from '@fortawesome/free-regular-svg-icons';
import {faStar as farStar} from '@fortawesome/free-solid-svg-icons';
import style from './Header.module.css';

const Header = () => {
    return (
        <header>
            <Link to="/">
                <div className={style.logo}>
                    <i><FontAwesomeIcon icon={faCirclePlay}/></i>
                    <span>Movies</span>
                </div>
            </Link>
            <div>
                <NavLink
                    to="my_favorite"
                    children={({isActive}) => {
                        const childActive = isActive ? {icon: farStar, class: style.button_active} : {icon: faStar, class: ''};

                        return (
                            <div className={`${style.menu_item} ${style.button} ${childActive.class}`}>
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

export default Header;
