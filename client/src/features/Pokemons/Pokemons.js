import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// --------------Styles imports--------------
import * as Styles from "./Styles";

// --------------Images imports -------------------
import Pokedex from "../../imgs/Pokedex.png";

// --------------Redux function imports--------------
import { getPokemons, getPokemonByID, setSearch } from "./PokemonsSlice";

var intervalId = null;

// --------------Pokemon component--------------

export function Pokemons() {
  // Pokemon States from the the slice
  const { pokemon, loading, error, id } = useSelector(
    (state) => state.pokemons
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // Custom hook for loading all the 20 pokemons
    dispatch(getPokemons());
  }, []);

  // Search input handler
  // filter by digits and limit by 898
  function HandleSearchInput(search) {
    // regex to check digits
    const re = /^[0-9\b]+$/;
    //   check the digits               check if the number is lower then 898
    if ((search === "" || re.test(search)) && parseInt(search) <= 898) {
      // dispatch to redux and set the id
      dispatch(setSearch(search));
      // clear the interval every time the function run
      clearInterval(intervalId);
      // create interval to check if the user finish typing
      intervalId = setInterval(function () {
        // dispach to get the pokemon by id
        dispatch(getPokemonByID(search));
        // clear the running interval
        clearInterval(intervalId);
      }, 1000);
    }
  }
  // get the numbers between each number
  // like 7 is between 1 to 10
  // 354 is between 350 to 260
  let range = parseInt(id / 10) * 10;

  // return Pokemons class to the selector div
  const PokeCards = () => {
    range = id > range ? range + 1 : range - 1;
    let pokelist = [];

    for (let i = range; i < range + 10; i++) {
      if (i <= "898") {
        // push all the pokemon image and id by id
        pokelist.push(
          <Styles.PokemonClass
            onClick={() =>
              !loading ? (id != i ? dispatch(getPokemonByID(i)) : null) : null
            }
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`}
            selected={id == i}
          />
        );
      }
    }
    return pokelist;
  };
  return (
    <Styles.PokeContainer>
      <Styles.PokedexPlatform src={Pokedex} />
      {!error ? (
        <>
          <Styles.ArtContainer>
            {loading ? (
              <Styles.Pokeball />
            ) : (
              <Styles.PokemonArt src={pokemon.arturl} />
            )}
          </Styles.ArtContainer>
          <Styles.PokemonInput
            value={id}
            placeholder="id"
            maxLength="3"
            onChange={(e) => HandleSearchInput(e.target.value)}
          />
          <Styles.Flavor>
            <Styles.LoadingText>
              {loading ? "Loading..." : ""}
            </Styles.LoadingText>
            {pokemon.name.toUpperCase()} <br />
            <br /> {pokemon.flavor}
          </Styles.Flavor>
        </>
      ) : null}
      <Styles.PokemonContainer>{PokeCards()}</Styles.PokemonContainer>
      <Styles.NextButton
        disabled={loading}
        onClick={() =>
          id == 898 ? null : dispatch(getPokemonByID(parseInt(id) + 1))
        }
      >
        Next
      </Styles.NextButton>
      <Styles.PreviousButton
        disabled={loading}
        onClick={() =>
          id == 1 ? null : dispatch(getPokemonByID(parseInt(id) - 1))
        }
      >
        Previous
      </Styles.PreviousButton>
    </Styles.PokeContainer>
  );
}

export default Pokemons;
