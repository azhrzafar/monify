import React, { Component } from "react";

class Form extends Component {
  state = {
    item: {
      description: "",
      amount: ""
    }
  };

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    const { item } = this.state;
    item[name] = value;
    this.setState({
      item
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { item } = this.state;
    const { onError, onAddItem } = this.props;
    if (item.description === "" || item.amount === "") {
      onError("Please fill in the form!");
      return;
    }
    if (parseFloat(item.amount) <= 0) {
      onError("Please enter a valid amount!");
      return;
    }
    onAddItem(item);
    this.handleClearForm();
  };

  handleClearForm = () => {
    const item = {
      description: "",
      amount: ""
    };
    this.setState({ item });
  };

  render() {
    const { item } = this.state;
    const { isExpense } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <div className="input-description-container">
          <input
            className={`input-description ${
              isExpense ? "input-expense" : "input-income"
            }`}
            name="description"
            placeholder="Description"
            type="text"
            value={item.description}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="input-amount-container">
          <input
            className={`input-amount ${
              isExpense ? "input-expense" : "input-income"
            }`}
            placeholder="Amount"
            name="amount"
            type="number"
            value={item.amount}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="button-container">
          <button
            type="submit"
            className={`button ${
              isExpense ? "button-expense" : "button-income"
            }`}
          >
            <svg className="icon">
              <use xlinkHref="#icon-checkmark" />
            </svg>
          </button>
        </div>
      </form>
    );
  }
}

export default Form;
