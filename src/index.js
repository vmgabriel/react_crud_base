// Developer: vmgabriel

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';

// Components
import App from './components/App.jsx';

const maxSnack = 3;

const CreateApp = () => (
    <SnackbarProvider maxSnack={maxSnack}>
      <App />
    </SnackbarProvider>
);

ReactDOM.render(CreateApp(), document.getElementById('app'));
