import React, { useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    fetchUser();
  }, [query]);

  function fetchUser() {
    let url = `https://api.github.com/users/${query}`;
    axios
      .get(url)
      .then(res => {
        setUserData(JSON.stringify(res.data, undefined, 2));
      })
      .catch(e => console.log(e));
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    console.log("getSearch");
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="container">
      <form className="form-inline" onSubmit={getSearch}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={search}
            onChange={updateSearch}
          />
          <button type="submit" className="btn btn-primary mb-2">
            Search
          </button>
        </div>
      </form>
      <div>{userData}</div>
    </div>
  );
};
