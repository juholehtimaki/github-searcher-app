import React, { useState, useEffect } from "react";
import axios from "axios";
import { Repository } from "./Repository";

export const Home = () => {
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState();
  const [query, setQuery] = useState("juholehtimaki");

  useEffect(() => {
    getRepos();
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
        console.log(res.data);
      })
      .catch(e => console.log(e));
  };

  return (
    <div className="container">
      <form className="form-inline" onSubmit={getSearch}>
        <div className="form-group">
          <input type="text" value={search} onChange={updateSearch} />
          <button type="submit" className="btn btn-primary mb-2">
            Search
          </button>
        </div>
      </form>
      <div>
        {repos.map(repo => (
          <Repository repo={repo} />
        ))}
      </div>
    </div>
  );
};
