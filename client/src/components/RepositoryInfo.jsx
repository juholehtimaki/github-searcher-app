import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const RepositoryInfo = () => {
  let { owner, repositoryname } = useParams();

  useEffect(() => {
    console.log("SADAS " + owner + repositoryname);
    const getCommits = () => {
      let url = `https://api.github.com/repos/${owner}/${repositoryname}/commits`;
      console.log(url);
      axios
        .get(url)
        .then(res => {
          console.log(res.data);
        })
        .catch(e => console.log(e));
    };
    getCommits();
  }, [owner, repositoryname]);

  return (
    <div>
      <h1>{owner}</h1>
      <h1>{repositoryname}</h1>
    </div>
  );
};
