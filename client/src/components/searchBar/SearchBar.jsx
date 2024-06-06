import { useState } from "react";
import "./searchBar.scss";

const SearchBar = () => {
  const types = ["buy", "rent"];
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => {
          return (
            <button
              key={type}
              onClick={() => switchType(type)}
              className={query.type === type ? "active" : ""}
            >
              {type}
            </button>
          );
        })}
      </div>
      <form>
        <input type="text" name="location" placeholder="City Location" />
        <input
          type="number"
          name="location"
          placeholder="Min Price"
          min={0}
          max={100000000}
        />
        <input
          type="number"
          name="location"
          placeholder="Max Price"
          min={0}
          max={100000000}
        />
        <button>
          <img src="/search.png" alt="seaerch" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
