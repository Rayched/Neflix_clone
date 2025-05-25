import React from 'react';
import Router from './routes/Router';
import styled, { ThemeProvider } from 'styled-components';
import {Themes} from './modules/Themes';
import Header from './components/Header';

const Wrapper = styled.div`
  width: 100vw;
  height: 100em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  //background: ${(props) => props.theme.bgColor};
  background: rgb(52, 152, 219);
`;

function App() {
  return (
    <Wrapper>
      <Router />
    </Wrapper>
  );
}

export default App;
