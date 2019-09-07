import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Landing from 'src/pages/Landing';
import Offer from 'src/pages/Offer';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Route path="/" exact component={Landing} />
                <Route path="/offer/" component={Offer} />
                <Footer />
            </div>
        );
    }
}

export default App;
