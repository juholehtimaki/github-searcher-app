import React from "react";
import noImage from "../assets/no-image.png";

export const Commit = ({ commit }) => {
  let dateObject = new Date(commit.commit.author.date);
  return (
    <div className="commit-container">
      <div className="image-container">
        <img
          src={commit.committer ? commit.committer.avatar_url : noImage} //using no img if no img was found
          alt="commiter's img"
        />
      </div>
      <div className="commit-info-container">
        <h4>Author's name: {commit.commit.author.name}</h4>
        <h4>Date: {dateObject.toLocaleString()}</h4>
        <h4>Commit message: {commit.commit.message}</h4>
      </div>
    </div>
  );
};
