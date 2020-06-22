import React from "react";
import getMonthYear from "../utils/date";

const Header = ({ totals, isExpense, onToggleSwitch }) => {
  return (
    <div className="summary-container">
      <div className="summary-month">{getMonthYear()}</div>
      <div className="summary-budget">
        {totals.budget < 0 ? totals.budget : `+${totals.budget}`}
      </div>
      <div className="summary-label">Available Budget</div>
      <div className="summary-detail">
        <div className="summary-income">
          <div>
            Income{" "}
            <svg className="icon">
              <use xlinkHref="#icon-box-remove" />
            </svg>
          </div>
          <div>{`+ ${totals.income}`}</div>
        </div>
        <div className="switch-container">
          <label>
            <input
              type="checkbox"
              checked={isExpense}
              className="switch"
              onChange={onToggleSwitch}
            />
            <div>
              <div />
            </div>
          </label>
        </div>
        <div className="summary-expense">
          <div>
            Expenses{" "}
            <svg className="icon">
              <use xlinkHref="#icon-box-add" />
            </svg>
          </div>
          <div>{`- ${totals.expense}`}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
