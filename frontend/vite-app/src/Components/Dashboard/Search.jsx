// import React from 'react';
import "../../Styles/Search.css"

const Search = () => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search Trends, Donations..."
        className="search-input"
      />
      <button type="button" className="search-button">
        <img src="../../Static/searchIcon.jpg" alt="Search" />
      </button>
    </div>
  );
};

export default Search;

