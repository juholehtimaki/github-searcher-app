import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../sass/repoinfo.scss";
import { Commit } from "./Commit.jsx";

export const RepositoryInfo = () => {
  let { owner, repositoryname } = useParams();
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const getCommits = () => {
      let url = `https://api.github.com/repos/${owner}/${repositoryname}/commits`;
      console.log(url);
      axios
        .get(url)
        .then(res => {
          setCommits(res.data.slice(0, 10)); //Getting only the last 10 commits
        })
        .catch(e => console.log(e));
    };
    getCommits();
  }, [owner, repositoryname]);

  if (commits) {
    return (
      <div className="container repo-info-container">
        <div className="title-container">
          <h1>{repositoryname}</h1>
        </div>
        <div className="commits-container">
          {commits.map(commit => (
            <Commit commit={commit} key={commit.sha} />
          ))}
        </div>
        <button>
          <Link to={"/"}>Back</Link>
        </button>
      </div>
    );
  } else {
    return (
      <div className="container repo-info-container">
        <div className="title-container">
          <h1>{repositoryname}</h1>
        </div>
        <div className="commits-container">
          <h2>No commits were found</h2>
        </div>
        <button>
          <Link to={"/"}>Back</Link>
        </button>
      </div>
    );
  }
};
