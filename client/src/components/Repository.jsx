import React from "react";
import { Link } from "react-router-dom";

export const Repository = ({ repo }) => {
  return (
    <div className="card">
      <h1>{repo.name}</h1>
      <button>
        <Link to={"/repository/" + repo.full_name}>Show commit history</Link>
      </button>
    </div>
  );
};
