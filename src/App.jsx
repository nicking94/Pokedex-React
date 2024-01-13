import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Pokedex from "./components/Pokedex";
import { useState, useEffect } from "react";
import { getPokemonData, getPokemons, searchPokemon } from "./api";
import { FavouriteProvider } from "./contexts/favouritesContext";

const localStorageKey = 'favourite_pokemon';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState([]);
const [notFound, setNotFound] = useState(false);
const [searching, setSearching] = useState(false);


  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(25, 25 * page);

      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 25));
      setNotFound(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loadFavouritePokemons = () =>{
    const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavourites(pokemons);
  }

  useEffect(() => {
    loadFavouritePokemons();
  }, []);

  useEffect(() => {
    if(!searching){
      fetchPokemons();
    }
    
  }, [page]);

  const updateFavouritePokemons = (name) => {
    const updated = [...favourites];
    const isFavourite = updated.indexOf(name);
    if(isFavourite >=0){
      updated.splice(isFavourite, 1)
    }else{
      updated.push(name)
    }
    setFavourites(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated));

  };

  const onSearch = async (pokemon) => {
    if(!pokemon){
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon);
    if(!result){
      setNotFound(true);
      setLoading(false);
      return;
    }else{
      setPokemons([result]);
      setPage(0);
      setTotal(1);
    }
    setLoading(false);
    setSearching(false);
  
  
  }
  

  return (
    <FavouriteProvider
      value={{
        favouritePokemons: favourites,
        updateFavouritePokemons: updateFavouritePokemons,
      }}
    >
      <div>
        <Navbar />
        <div className="App">
          <SearchBar 
          onSearch={onSearch} /> 
          { notFound ? (
          <div className="not-found-text"> No se encuentra el pokemon que buscas </div> 
          ) : (
            <Pokedex
              loading={loading}
              pokemons={pokemons}
              page={page}
              setPage={setPage}
              total={total}
            />
          )}
        </div>
      </div>
    </FavouriteProvider>
  );
}

export default App;
