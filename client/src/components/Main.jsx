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
  return (
    <div className="container main-container">
      <div className="row justify-content-center search-container">
        <form className="form-inline search-form" onSubmit={getSearch}>
          <input type="text" value={search} onChange={updateSearch} />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="search-content-container">
        {hasError ? (
          <h3>{query}'s GitHub profile was not found</h3>
        ) : query && !hasError ? (
          <>
            <h3>{query}'s public repositories:</h3>
            {repos.map(repo => (
              <Repository repo={repo} key={repo.id} />
            ))}
          </>
        ) : (
          <h3>(begin the search by typing in someone's GitHub profile name)</h3>
        )}
      </div>
    </div>
  );
};
