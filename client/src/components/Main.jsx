import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../sass/main.scss";
import { Repository } from "./Repository.jsx";
import { QueryContext } from "./QueryContext.jsx";

export const Main = () => {
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState("");
  const [hasError, setHasError] = useState(false);
  const { query, setQuery } = useContext(QueryContext);

  useEffect(() => {
    if (query) {
      getRepos();
    }
  }, [query]);

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
  if (hasError) {
    //Incase there was an error and user was not found
    return (
      <div className="container main-container">
        <div className="row justify-content-center search-container">
          <form className="form-inline search-form" onSubmit={getSearch}>
            <input type="text" value={search} onChange={updateSearch} />
            <button type="submit">Search</button>
          </form>
        </div>
        <div class="search-content-container">
          <h4>{query}'s GitHub profile was not found</h4>
        </div>
      </div>
    );
  }

  if (query) {
    //User was succesfully found
    return (
      <div className="container main-container">
        <div className="row justify-content-center search-container">
          <form className="form-inline search-form" onSubmit={getSearch}>
            <input type="text" value={search} onChange={updateSearch} />
            <button type="submit">Search</button>
          </form>
        </div>
        <div class="search-content-container">
          <h3>{query}'s public repositories:</h3>
          {repos.map(repo => (
            <Repository repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    );
  } else {
    //No query
    return (
      <div className="container main-container">
        <div className="row justify-content-center search-container">
          <form className="form-inline search-form" onSubmit={getSearch}>
            <input type="text" value={search} onChange={updateSearch} />
            <button type="submit">Search</button>
          </form>
        </div>
        <div class="search-content-container">
          <h4>(begin the search by typing in someone's GitHub profile name)</h4>
        </div>
      </div>
    );
  }
};
