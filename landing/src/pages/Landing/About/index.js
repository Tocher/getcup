import React from 'react';
import phone_map from 'src/images/phone_map.png';
import './styles.css';

export const About = () => {
    return (
        <div className='section-content about-container'>
            <div className='about-container_desc'>
                <div className='about-container_desc-block'>
                    <h3>Выгодно</h3>
                    <p>По абонементу Get Coffee Вы экономите до 30% на каждой чашке кофе</p>
                </div>
                <div className='about-container_desc-block'>
                    <h3>Быстро</h3>
                    <p>Мы покажем ближайшую кофейню, где можно воспользоваться абонементом Get Coffee</p>
                </div>
                <div className='about-container_desc-block'>
                    <h3>Просто</h3>
                    <p>Если вы купили абонемент Get Coffee — в кофейне платить не нужно</p>
                </div>
                <div className='about-container_desc-block'>
                    <h3>С заботой</h3>
                    <p>Первая чашка в подарок  — начните пользоваться Get Coffee уже сейчас</p>
                </div>
            </div>
            <div className='about-container_photo'>
                <img src={phone_map} alt="Приложение GetCoffee - Карта заведений" />
            </div>
        </div>
    );
};
