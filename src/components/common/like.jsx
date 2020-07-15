import React from "react";

const Like = (props) => {
  const likeClass = props.liked ? "" : "-o";
  return (
    <i
      onClick={props.onClick}
      className={`fa fa-heart${likeClass}`}
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default Like;
