import { useState } from "react";
import { searchPokemon } from "../api";

const SearchBar = (props) => {
  const { onSearch } = props;
  const [search, setSearch] = useState("");
  
  

  const onChange = (e) => {
    setSearch(e.target.value);
    if(e.target.value.length === 0){
      onSearch(null);
    }
  };

  const onClick = async () => {
    onSearch(search)
  };

  

  return (
    <div className="searchBar-container">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Buscar Pokemon..."
          onChange={onChange}
        />
      </div>

      <div>
        <button
        className="searchBar-btn"
         onClick={onClick}>Buscar</button>
      </div>
    </div>
  );
};

export default SearchBar;
