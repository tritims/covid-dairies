import React from "react";
import "./searchbar.css";
const Searchbar = () => {
  return (
    <div id="search-box">
      <form action="/search" id="search-form" method="get" target="_top">
        <input
          id="search-text"
          name="search-text"
          placeholder="Search story"
          autoComplete="off"
          type="text"
        />
        <button id="search-button" type="submit">
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
