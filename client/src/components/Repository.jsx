import React from "react";
import { Link } from "react-router-dom";

export const Repository = ({ repo }) => {
  return (
    <div className="card" id={repo.id}>
      <h4>{repo.name}</h4>
      <Link to={"/" + repo.full_name}>
        <button>Show commit history</button>
      </Link>
    </div>
  );
};
