import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import requests
import json
import random

# initialize FastAPI
app = FastAPI()

# Origins for cors
origins = ["http://localhost:3000", "localhost:3000"]

# Add CORS middleware to the application.
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Returns a pokemone ID from a URL.
def pokemoneID(url):
  id = url.split("/")
  id = id[len(id) - 2]
  return id

# Get a list of pokemons
@app.get("/getpokemons", tags=["pokemons"])
async def read_pokemons():
    pokemon_url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
    # get the first 20 pokemons from pokeapi by url
    pokemon_response = requests.get(pokemon_url)
    # If the response status code is 200 the response will be ignored.
    if pokemon_response.status_code == 200:
       # Loads the results from the pokemon API.
        results = json.loads(pokemon_response.content.decode("utf-8"))

        # Parse the pokemon url to get the id
        firstpokeid = pokemoneID(results["results"][0]["url"])

        # Returns the data of the pokemon
        firstpoke_response = requests.get("https://pokeapi.co/api/v2/pokemon-species/" + firstpokeid)
        firstpoke_results = json.loads(firstpoke_response.content.decode("utf-8"))

        # Get all the flavors
        flavor = firstpoke_results["flavor_text_entries"]
        # Get all the flavors is english by filter the flavors
        filtered = [x for x in flavor if x["language"]["name"] == "en"]

        # Get a random flavor.
        flavor = random.choice(filtered)
        # add a flavor to the first pokemon obj
        results["results"][0]["flavor"] = flavor["flavor_text"]


        # Parse a list of poke results
        for poke in results["results"]:
            # Parse the id from the url
            id = pokemoneID(poke["url"])
            arturl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{0}.png".format(
                id
            )
            # Add a new id to the list
            poke["id"] = id
            # Add a new id to the end of the list
            poke["arturl"] = arturl

        # Returns a json to the client
        return {
            "message": "Success",
            "res": results["results"],
            "next": results["next"],
            "previous": results["previous"],
        }
    return {"message": "Error"}


# Get information about a pokemon by the id
@app.get("/pokemonbyid/{poke_id}", tags=["pokemonbyid"])
async def read_by_id(poke_id: str):
    pokemon_url = "https://pokeapi.co/api/v2/pokemon-species/" + poke_id
    # Get information about a pokemon
    pokemon_response = requests.get(pokemon_url)

    # If the response status code is 200 the response will be ignored.
    if pokemon_response.status_code == 200:

        # Loads the results from the pokemon API.
        results = json.loads(pokemon_response.content.decode("utf-8"))
        # Get all the flavors
        flavor = results["flavor_text_entries"]
        # Get all the flavors is english by filter the flavors
        filtered = [x for x in flavor if x["language"]["name"] == "en"]
        # Get a random flavor.
        flavor = random.choice(filtered)

        # Create a json for a pokemon
        pokemon = {
            "message": "Success",
            "name": results["name"],
            "arturl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{0}.png".format(
                poke_id
            ),
            "id": poke_id,
            "flavor": flavor["flavor_text"],
        }
        # Returns a pokemon instance.
        return pokemon
    return {"message": "Error"}


if __name__ == "__main__":
    # Run uvicorn application
    uvicorn.run(app, host="127.0.0.1", port=3001, debug=True)
