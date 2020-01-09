import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
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
      <div>
        <div>
          <h1>{repositoryname}</h1>
        </div>
        <div>
          <div>
            {commits.map(commit => (
              <Commit commit={commit} key={commit.sha} />
            ))}
          </div>
        </div>
        <button>
          <Link to={"/"}>Back</Link>
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <h1>{repositoryname}</h1>
        </div>
        <div>
          <h2>No commits were found</h2>
        </div>
      </div>
    );
  }
};
