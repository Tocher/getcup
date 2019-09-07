import React from 'react';
import map_location from 'src/images/icons/Map-Location-colored.png';
import beverage_coffee from 'src/images/icons/Beverage-Coffee-colored.png';
import user from 'src/images/icons/User-Profile-colored.png';
import heart from 'src/images/icons/Shape-Heart-colored.png';
import './styles.css';

export const HowItWorks = () => {
    return (
        <div className='section-content steps-container'>
            <div className='step'>
                <img src={map_location} alt="Карта" />
                <h3>Найдите кофейню на карте</h3>
            </div>
            <div className='step'>
                <img src={beverage_coffee} alt="Карта" />
                <h3>Выберите любимый напиток</h3>
            </div>
            <div className='step'>
                <img src={user} alt="Карта" />
                <h3>Покажите код официанту или баристе</h3>
            </div>
            <div className='step'>
                <img src={heart} alt="Карта" />
                <h3>Наслаждайтесь, и не обожгитесь!</h3>
            </div>
        </div>
    );
};
