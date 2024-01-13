import { useContext } from "react";
import FavouriteContext from "../contexts/favouritesContext";

const Pokemon = (props) => {
  const { pokemon } = props;
  const { favouritePokemons, updateFavouritePokemons} = useContext(FavouriteContext);
  
  const blackHearth = "🖤";
  const redHearth = "🧡"
  const hearth = favouritePokemons.includes(pokemon.name) ? redHearth : blackHearth;
  
  const clickHearth = (e) => {
e.preventDefault();
updateFavouritePokemons(pokemon.name);
  }

  return (
    <div className="pokemon-card">
      <div className="pokemon-img-container">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-img"
        />
      </div>
      <div className="card-body">
        <div className="card-top">
          <h3>{pokemon.name}</h3>
          <div className="pokemon-id">#{pokemon.id}</div>
        </div>

        <div className="card-bottom">
          <div className="pokemon-type">
            {pokemon.types.map((type, idx) => {
              return (
                <div key={idx} className="pokemon-type-text"><p className="type-p">tipo:</p>
                 {type.type.name}{" "}
                </div>
              );
            })}
          </div>
          <button className="pokemon-hearth-btn"
           onClick={clickHearth}>
          <div className="pokemon-favourite">{hearth}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
