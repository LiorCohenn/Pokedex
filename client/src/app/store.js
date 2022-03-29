import { configureStore } from '@reduxjs/toolkit';
import PokemonsReducer from '../features/Pokemons/PokemonsSlice';

export const store = configureStore({
  reducer: {
    pokemons: PokemonsReducer,
  },
});
