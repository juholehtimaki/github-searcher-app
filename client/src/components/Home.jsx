import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Repository } from "./Repository.jsx";
import { QueryContext } from "./QueryContext.jsx";

export const Home = () => {
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
      <div className="container">
        <form className="form-inline" onSubmit={getSearch}>
          <div className="form-group">
            <input value={search} onChange={updateSearch} />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
        <h4>GitHub profile was not found</h4>
      </div>
    );
  }

  if (query) {
    //User was succesfully found
    return (
      <div className="container">
        <form className="form-inline" onSubmit={getSearch}>
          <div className="form-group">
            <input value={search} onChange={updateSearch} />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
        <div>
          {repos.map(repo => (
            <Repository repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    );
  } else {
    //No query
    return (
      <div className="container">
        <form className="form-inline" onSubmit={getSearch}>
          <div className="form-group">
            <input value={search} onChange={updateSearch} />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
        <h4>Begin the search by typing someone's GitHub profile name</h4>
      </div>
    );
  }
};
