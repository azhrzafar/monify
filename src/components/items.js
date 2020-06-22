import React from "react";
import Item from "./item";
const Items = ({ items, onDelete }) => {
  return (
    <div className="items-container">
      {items.map(item => (
        <Item key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default Items;
