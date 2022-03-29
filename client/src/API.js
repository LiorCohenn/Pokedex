import axios from "axios";

//!-------------------------------------------------------------------------------------
//* ====================== API =====================
//!-------------------------------------------------------------------------------------

const API = axios.create({
  baseURL: "http://localhost:3001",
});

//!--------------------------------------------------------------------------------------
//* ================================= Pokemons ====================================
//!--------------------------------------------------------------------------------------

export const pokemons = () => API.get("/getpokemons/");

export const pokemonsByID = (poke_id) => API.get("/pokemonbyid/" + poke_id);