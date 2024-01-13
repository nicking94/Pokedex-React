import FavouriteContext from "../contexts/favouritesContext";
import React from "react";

const {useContext} = React;


const Navbar = () => {
  const { favouritePokemons } = useContext(FavouriteContext);
  console.log(favouritePokemons)

  const redHearth = "🧡";

  let imgURL =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";
  
    return (
    <nav>
      <div>
        <div>
          <img src={imgURL} alt="pokeApi-logo" className="navbar-image" />
        </div>
      </div>
      <div className="favorite-count-container"><p className="favorite-text">Pokemons Favoritos</p>{redHearth} {favouritePokemons.length}</div>
    </nav>
  );
};

export default Navbar;
