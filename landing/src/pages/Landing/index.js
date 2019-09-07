import React, {Component} from 'react';
import main_phones from 'src/images/main_phones.png';
import app_store_badge from 'src/images/app-store-badge.svg';
import google_play_badge from 'src/images/google-play-badge.png';
import {About} from './About';
import {HowItWorks} from './HowItWorks';
import {Subscriptions} from './Subscriptions';
// import { Contacts } from './Contacts';
import './styles.css';

class Landing extends Component {
    render() {
        return (
            <div className='landing'>
                <section id='main'>
                    <h1>Абонемент на кофе в твоем городе</h1>
                    <p>Кофе со скидкой до 60% в лучших местах твоего города: кофейни, рестораны, бары и кафе</p>
                    <div className='stores'>
                        <a href='#' target='_blank'>
                            <img src={app_store_badge} alt="Скачать в App Store" />
                        </a>
                        <a href='#' target='_blank'>
                            <img src={google_play_badge} alt="Скачать в Google Play" />
                        </a>
                    </div>
                    <img id='main-section-image' src={main_phones} alt="Приложение GetCoffee" />
                </section>
                <section id='about'>
                    <h2>Что такое Get Coffee</h2>
                    <hr className='separator primary_color'/>
                    <About/>
                </section>
                <section id='how-it-works'>
                    <h2>Как это работает</h2>
                    <hr className='separator primary_color'/>
                    <HowItWorks/>
                </section>
                <section id='subscriptions'>
                    <h2>Абонементы</h2>
                    <hr className='separator primary_color'/>
                    <Subscriptions/>
                </section>
            </div>
        );
    }
}

export default Landing;
