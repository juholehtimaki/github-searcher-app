import React from "react";
import noImage from "../assets/no-image.png";

export const Commit = ({ commit }) => {
  let dateObject = new Date(commit.commit.author.date);
  return (
    <div className="card">
      <h1>Author's name: {commit.commit.author.name}</h1>
      <img
        src={commit.committer ? commit.committer.avatar_url : noImage}
        alt="commiter's img"
      />
      <h1>Date: {dateObject.toLocaleString()}</h1>
      <h1>Commit message: {commit.commit.message}</h1>
    </div>
  );
};
