import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) => {
  const buttonClass = "list-group-item list-group-item-action";
  return (
    <div className="list-group">
      {items.map((item) => (
        <button
          key={item[valueProperty]}
          type="button"
          className={
            item === selectedItem ? `${buttonClass} active` : buttonClass
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </button>
      ))}
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
