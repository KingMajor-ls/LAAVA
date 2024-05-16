import { useState } from 'react';
import "../../Styles/Search.css";

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`http://localhost:8280/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      console.log(data.results);
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error searching:', error);
      setError('Failed to fetch search results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search Trends, Donations..."
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            className="search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="search-results-container">
        {searchResults.farmers && searchResults.farmers.length > 0 ? (
          searchResults.farmers.map((farmer, index) => (
            <div key={index} className="search-result farmer-result">
              <h3>{farmer.name} {farmer.surname}</h3>
              <p>Username: {farmer.username}</p>
              <p>Email: {farmer.email}</p>
              <p>Phone Number: {farmer.phone_number}</p>
              <p>Home Address: {farmer.home_address}</p>
              <p>Role: {farmer.role}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No farmer results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;