import React from 'react';
import styled from 'styled-components';

import { Pokemons } from './features/Pokemons/Pokemons';

import BackGround from "./imgs/wallpaper.png"

const AppWarper = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${BackGround});
  background-size: cover;
  overflow: hidden;
`

function App() {
  return (
    <AppWarper>
        <Pokemons />
    </AppWarper>
  );
}

export default App;
