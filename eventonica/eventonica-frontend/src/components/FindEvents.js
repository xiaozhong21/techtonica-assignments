import React, { useState } from 'react'

export default function FindEvents() {
  const [searchDate, setSearchDate] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchEventsByDate = (searchDate) => {
    return fetch(`http://localhost:3000/events/search1/${searchDate}`)
      .then(res => res.json())
      .then(res => setSearchResults(res));
  };

  const searchEventsByCategory = (searchCategory) => {
    return fetch(`http://localhost:3000/events/search2/${searchCategory}`)
      .then(res => res.json())
      .then(res => setSearchResults(res));
  };

  const handleSearchByDate = buttonClick => {
    buttonClick.preventDefault();
    searchEventsByDate(searchDate);
    setSearchDate("");
  }

  const handleSearchByCategory = buttonClick => {
    buttonClick.preventDefault();
    searchEventsByCategory(searchCategory);
    setSearchCategory('');
  }

  const searchList = searchResults.map((search) =>
    <li key={search.id}>
      Event ID: {search.id}<br/>
      Name: {search.name}<br/>
      Date: {search.date}<br/>
      Description: {search.description}<br/>
      Category: {search.category}<br/><br/>
    </li>
  );

  return (
    <div className="search-management">
      <h2>Events Finder</h2>
      <div className="finder-body">
        <div className="search-result">
          <h3>Search Results</h3>
          <ul id="search-list">
            {searchList}
          </ul>
        </div>
        <div className="search-form">
          <h3>Search by Date/Category</h3>
          <form id="search" action="#">
            <fieldset>
              <label htmlFor="date-search">Date </label>
              <input 
                type="date" 
                id="date-search"
                value={searchDate}
                onChange={(enterDate) => setSearchDate(enterDate.target.value)} 
              />             
            </fieldset>
            <button onClick={handleSearchByDate}>Search by Date</button><br/>
            <fieldset>
              <label htmlFor="category-search">Category </label>
              <input 
                type="text" 
                id="category-search"
                value={searchCategory}
                onChange={(enterCategory) => setSearchCategory(enterCategory.target.value)} 
              />
            </fieldset>
            <button onClick={handleSearchByCategory}>Search by Category</button><br/>
          </form>
        </div>
      </div>
    </div>
  )
}
