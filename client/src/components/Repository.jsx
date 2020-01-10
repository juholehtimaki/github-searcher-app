import React from "react";
import { Link } from "react-router-dom";

export const Repository = ({ repo }) => {
  return (
    <div className="card">
      <h4>{repo.name}</h4>
      <button>
        <Link to={"/" + repo.full_name}>Show commit history</Link>
      </button>
    </div>
  );
};
