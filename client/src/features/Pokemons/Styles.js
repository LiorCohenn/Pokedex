import styled, { keyframes } from "styled-components";

export const PokeContainer = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 700px;
  width: 1000px;
`;

export const PokedexPlatform = styled.img`
  z-index: 5;
  padding: 5px;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const ArtContainer = styled.div`
  position: absolute;
  width: 320px;
  height: 340px;
  display: flex;
  top: 150px;
  left: 110px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: white;
  border: 4px solid black;
`;

export const PokemonArt = styled.img`
  height: 220px;
`;

export const PokemonInput = styled.input`
  position: absolute;
  width: 90px;
  height: 20px;
  bottom: 54px;
  left: 160px;
  background: transparent;
  z-index: 7;
  border: none;
  border-bottom: 1px solid black;
  border-radius: 3px;
  padding: 15px;
  text-align: center;
  font-size: 30px;
`;

export const Flavor = styled.div`
  transition: 0.3s all;
  position: absolute;
  width: 280px;
  height: 100px;
  top: 245px;
  right: 100px;
  z-index: 9;
  border-radius: 4px;
  color: white;
  overflow: auto;
  overflow-x: hidden;
  color: #90ee90;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const NextButton = styled.button`
  position: absolute;
  width: 140px;
  height: 50px;
  bottom: 56px;
  right: 85px;
  z-index: 9;
  border-radius: 8px;
  color: #90ee90;
  font-size: 25px;
  background: transparent;
  transition: 0.3s all;
  cursor: pointer;
  :hover {
    color: #e8fce8;
  }
`;

export const PreviousButton = styled.button`
  position: absolute;
  width: 140px;
  height: 50px;
  bottom: 56px;
  right: 255px;
  /* border: 1px solid black; */
  z-index: 9;
  border-radius: 8px;
  font-size: 25px;
  color: #90ee90;
  background: transparent;
  cursor: pointer;
  transition: 0.3s all;
  :hover {
    color: #e8fce8;
  }
`;

export const PokemonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ". . . . ."
    ". . . . .";
  gap: 3px 3px;

  width: 305px;
  height: 70px;
  top: 380px;
  right: 78px;
  border-radius: 3px;
  z-index: 8;
  position: absolute;
  align-content: center;
`;

export const PokemonClass = styled.img`
  src: url(${(props) => props.src});
  width: 45px;
  align-content: center;
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? "#1cb1a9" : null)};
  transition: 0.3s all;
  :hover {
    background-color: ${(props) => (props.selected ? null : "#7cd1e9")};
    cursor: pointer;
  }
`;

export const Pokeballspin = keyframes`
  20% { transform: rotate(15deg); }
   40% { transform: rotate(-10deg); }
   60% { transform: rotate(5deg); }
   80% { transform: rotate(-5deg); }
   100% { transform: rotate(0deg); }
  `;

export const Pokeball = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
  background: linear-gradient(to bottom, rgb(254, 0, 1) 50%, white 50%);
  border-radius: 50%;
  border: 8px solid black;
  animation: ${Pokeballspin} 1s linear infinite;
  :border {
    content: "";
    position: absolute;
    height: 8px;
    width: 100px;
    background: black;
    top: 50px;
    transform: translatey(-50%);
  }
  :after {
    content: "";
    position: absolute;
    height: 38px;
    width: 38px;
    border-radius: 50%;
    background: white;
    top: 50px;
    left: 50px;
    transform: translate(-50%, -50%);
    box-shadow: inset 0 0 0 8px black, inset 0 0 0 10px white,
      inset 0 0 0 12px black;
  }
`;

export const LoadingText = styled.div`
  font-size: 30px;
  text-align: center;
`;
