// Develop: vmgabriel

// Libraries
import React from 'react';
import clsx from 'clsx';
import { BrowserRouter, Route } from 'react-router-dom';

// Components
// Partial
import NavBar from './partial/Header.jsx';
import Footer from './partial/Footer.jsx';
// Routes
import Home from './home/Home.jsx';
import HelloWorld from './HelloWorld.jsx';
import ListUser from './users/List-user.jsx';

// Styles
import '../assets/styles/App.scss';
import '../assets/styles/Global.scss';

export default function App() {
  const [ margin, setMargin ] = React.useState(false);

  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar withMargin={setMargin} />

        <div className={clsx('order-padding', {
          'margin-menu': margin,
          'margin-base': !margin,
        })}>
          <Route exact path="/" component={Home} />
          <Route exact path="/hello" component={HelloWorld} />

          <Route exact path="/users" component={ListUser} />
        </div>

        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
};
