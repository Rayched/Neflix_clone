import React from 'react';
import Router from './routes/Router';
import { ThemeProvider } from 'styled-components';
import {Themes} from './modules/Themes';
import Header from './components/Header';

function App() {
  return (
    <div className='ReactApp'>
      <Header />
      <Router />
    </div>
  );
}

export default App;
