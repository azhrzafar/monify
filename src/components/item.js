import React from "react";
const Item = ({ item, onDelete }) => {
  return (
    <div className={"item"}>
      <div className="item-description">{item.description}</div>
      <div
        className={`item-amount 
        ${item.type === "expense" ? "amount-expense" : "amount-income"}
      `}
      >
        {item.amount}
      </div>
      <button className="button-delete" onClick={() => onDelete(item.id)}>
        <svg className="icon">
          <use xlinkHref="#icon-cross" />
        </svg>
      </button>
    </div>
  );
};

export default Item;
