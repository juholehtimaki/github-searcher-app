import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../sass/main.scss";
import { Repository } from "./Repository.jsx";
import { QueryContext } from "./QueryContext.jsx";

export const Main = () => {
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState("");
  const [userNotFound, setUserNotFoud] = useState(false); //error if user was not found
  const { query, setQuery } = useContext(QueryContext); //storing query using useContext for easier navigation when going back from repositoryinfo view to main view

  useEffect(() => {
    if (query) {
      const getRepos = () => {
        let url = `https://api.github.com/users/${query}/repos`;
        axios
          .get(url)
          .then(res => {
            setRepos(res.data);
            setUserNotFoud(false);
          })
          .catch(e => {
            console.log(e);
            setUserNotFoud(true);
          });
      };
      getRepos();
    }
  }, [query]); //re-rendering component when query changes

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const userSearchResult = () => {
    if (userNotFound) {
      //if user was not found
      return <h3>{query}'s GitHub profile was not found</h3>;
    } else if (query) {
      //if query exists, rendering user's repositories
      return (
        <>
          <h3>{query}'s public repositories:</h3>
          {repos.map(repo => (
            <Repository repo={repo} key={repo.id} />
          ))}
        </>
      );
    } else {
      //else suggesting user to begin the search
      return (
        <h3>(begin the search by typing in someone's GitHub profile name)</h3>
      );
    }
  };

  return (
    <div className="container main-container">
      <div className="row justify-content-center search-container">
        <form className="form-inline search-form" onSubmit={getSearch}>
          <input type="text" value={search} onChange={updateSearch} />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="search-content-container">{userSearchResult()}</div>
    </div>
  );
};
