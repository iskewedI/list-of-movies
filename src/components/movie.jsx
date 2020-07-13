import React from "react";

const _ID = "_id";
const Movie = ({ children, data }) => {
  const labels = [
    ...Object.values(data).filter((label) => data[_ID] !== label),
  ];
  return (
    <tr>
      {labels.map((label, index) => (
        <td key={index}>{label}</td>
      ))}
      {children.map((child, index) => (
        <td key={index}>{child}</td>
      ))}
    </tr>
  );
};

export default Movie;
