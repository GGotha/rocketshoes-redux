import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './config/Reactotronconfig';

import Header from './components/Header';

import { Provider } from 'react-redux';
import store from './store';

import Routes from './routes';
import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyle />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
