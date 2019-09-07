import React, {Component} from 'react';
import './styles.css';
import {NavLink} from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className='footer-links'>
                    <a href='#'>Партнерам</a>
                    <NavLink to='/offer/'>Публичная Оферта</NavLink>
                    <a href='#'>FAQ</a>
                </div>
            </footer>
        );
    }
}

export default Footer;
