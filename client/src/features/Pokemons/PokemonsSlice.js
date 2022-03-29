import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pokemons, pokemonsByID } from "../../API";

const initialState = {
  pokemons: [],
  pokemon: {
    name: "",
    arturl: "",
    flavor: "",
  },
  id: "1",
  loading: false,
  error: false,
};

// Returns a list of all registered pokemons
export const getPokemons = createAsyncThunk(
  "pokemons/getpokemons",
  async (_, thunkAPI) => {
    try {
      const res = await pokemons().then((data) => data.data);
      return res;
    } catch (e) {
      console.log("ERROR:", e);
    }
  }
);
// Get a pokemon by ID.
export const getPokemonByID = createAsyncThunk(
  "pokemons/getpokemonbyid",
  async (poke_id, thunkAPI) => {
    try {
      const res = await pokemonsByID(poke_id).then((data) => data.data);
      return res;
    } catch (e) {
      console.log("ERROR:", e);
    }
  }
);

export const PokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setSearch: (state, { payload }) => {
      state.id = payload;
    },
  },
  extraReducers: {
    [getPokemons.pending]: (state) => {
      state.loading = true;
      state.pokemon = {
        name: "",
        arturl: "",
        flavor: "",
      };
    },
    [getPokemons.fulfilled]: (state, action) => {
      state.pokemons = action.payload;
      state.pokemon = action.payload.res[0];
      state.id = action.payload.res[0].id;
      state.loading = false;
    },
    [getPokemons.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },

    [getPokemonByID.pending]: (state) => {
      state.loading = true;
      state.pokemon = {
        name: "",
        arturl: "",
        flavor: "",
      };
    },
    [getPokemonByID.fulfilled]: (state, action) => {
      state.pokemon = action.payload;
      state.id = action.payload.id;
      state.loading = false;
    },
    [getPokemonByID.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { setSearch } = PokemonsSlice.actions;

export default PokemonsSlice.reducer;
