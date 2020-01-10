import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../sass/main.scss";
import { Repository } from "./Repository.jsx";
import { QueryContext } from "./QueryContext.jsx";

export const Main = () => {
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState("");
  const [hasError, setHasError] = useState(false);
  const { query, setQuery } = useContext(QueryContext); //storing query using useContext for easier navigation when going back from repositoryinfo view to main view

  useEffect(() => {
    if (query) {
      getRepos();
    }
  }, [query]); //rendering component when query changes

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const getRepos = () => {
    let url = `https://api.github.com/users/${query}/repos`;
    axios
      .get(url)
      .then(res => {
        setRepos(res.data);
        setHasError(false);
      })
      .catch(e => {
        console.log(e);
        setHasError(true);
      });
  };
  return (
    <div className="container main-container">
      <div className="row justify-content-center search-container">
        <form className="form-inline search-form" onSubmit={getSearch}>
          <input type="text" value={search} onChange={updateSearch} />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="search-content-container">
        {hasError ? ( //If there was an error while fetching data
          <h3>{query}'s GitHub profile was not found</h3>
        ) : query ? ( //If no errors and there's a query -> rendering repositories
          <>
            <h3>{query}'s public repositories:</h3>
            {repos.map(repo => (
              <Repository repo={repo} key={repo.id} />
            ))}
          </>
        ) : (
          //Else suggesting to begin the search
          <h3>(begin the search by typing in someone's GitHub profile name)</h3>
        )}
      </div>
    </div>
  );
};
