import React from "react";

const Like = ({ liked, onClick }) => {
  const likeClass = liked ? "" : "-o";
  return (
    <i
      onClick={onClick}
      className={`fa fa-heart${likeClass}`}
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default Like;
