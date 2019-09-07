import React, {Component} from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import './styles.css'

class Header extends Component {
    render() {
        return (
            <nav className='header'>
                <p className='header-logo'>GetCup</p>
                <ul className='header-left-menu'>
                    <li className='header-left-menu_item'>
                        <Link scroll={el => el.scrollIntoView({behavior: 'smooth', block: 'start'})} to="#about">О Нас</Link>
                    </li>
                    <li className='header-left-menu_item'>
                        <Link scroll={el => el.scrollIntoView({behavior: 'smooth', block: 'start'})} to="#how-it-works">Как это работает</Link>
                    </li>
                    <li className='header-left-menu_item'>
                        <Link scroll={el => el.scrollIntoView({behavior: 'smooth', block: 'start'})} to="#subscriptions">Абонементы</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Header;
