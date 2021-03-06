import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../sass/repoinfo.scss";
import { Commit } from "./Commit.jsx";

export const RepositoryInfo = () => {
  let { owner, repositoryname } = useParams();
  const [commits, setCommits] = useState([]);
  const [searchFinished, setSearchFinished] = useState(false);

  useEffect(() => {
    const getCommits = () => {
      setSearchFinished(false);
      let url = `https://api.github.com/repos/${owner}/${repositoryname}/commits`;
      axios
        .get(url)
        .then(res => {
          setCommits(res.data.slice(0, 10)); //Getting only the last 10 commits
          setSearchFinished(true);
        })
        .catch(e => {
          console.log(e);
          setSearchFinished(true);
        });
    };
    getCommits();
  }, [owner, repositoryname]);

  const repositorySearchResult = () => {
    if (!searchFinished) return; //not returning anything if search is not finished (loading indicator or spinner would work too)
    if (commits.length > 0) {
      //if commits were found => returning them
      return (
        <>
          {commits.map(commit => (
            <Commit commit={commit} key={commit.sha} />
          ))}
        </>
      );
    } else {
      //else letting user know that no commits were found
      return <h2>No commits were found</h2>;
    }
  };

  return (
    <div className="container repo-info-container">
      <div className="title-container">
        <h3>{repositoryname}'s commits</h3>
      </div>
      <div className="commits-container">{repositorySearchResult()}</div>
      <Link to={"/"}>
        <button>Back</button>
      </Link>
    </div>
  );
};
