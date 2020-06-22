import React, { Component } from "react";
import Header from "./components/header";
import Form from "./components/form";
import Items from "./components/items";
import Notif from "notifjs";
import "notifjs/dist/notif.min.css";
const notif = new Notif(2000);

class App extends Component {
  state = {
    items: [],
    totals: {
      budget: 0,
      income: 0,
      expense: 0
    },
    form: {
      isExpense: false
    }
  };

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem("items"));
    const totals = JSON.parse(localStorage.getItem("totals"));
    if (items && totals) {
      const itemsSorted = items.sort(function (a, b) {
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
        return 0;
      });
      this.setState({ items: itemsSorted, totals });
    }
  }

  handleToggleSwitch = () => {
    const { form } = this.state;
    form.isExpense = !form.isExpense;
    this.setState({ form });
  };

  handleError(message) {
    notif.error(message);
  }

  handleSuccess(message) {
    notif.success(message);
  }

  handleAdd = (item) => {
    const items = [...this.state.items];
    const { form } = this.state;
    if (items.length > 0) {
      item.id = items[0].id + 1;
    } else {
      item.id = 0;
    }
    item.type = form.isExpense ? "expense" : "income";
    items.unshift({ ...item });
    this.setState({ items }, () => {
      this.updateBudget();
    });
    localStorage.setItem("items", JSON.stringify(items));
  };

  handleDelete = (itemId) => {
    const items = this.state.items.filter((item) => item.id !== itemId);
    this.setState({ items: items }, () => {
      this.updateBudget();
    });
    localStorage.setItem("items", JSON.stringify(items));
  };

  updateBudget = function () {
    const { totals } = this.state;
    const income = this.calculateBudget("income");
    const expense = this.calculateBudget("expense");
    totals.income = income;
    totals.expense = expense;
    totals.budget = (income - expense).toFixed(2);
    this.setState({ totals });
    localStorage.setItem("totals", JSON.stringify(totals));
    this.handleSuccess("Budget updated Successfully!");
  };

  calculateBudget = function (type) {
    const { items } = this.state;
    const filteredItems = items.filter((item) => item.type === type);
    const sum = filteredItems.reduce(function (prev, current) {
      return prev + +current.amount;
    }, 0);
    return Math.abs(sum).toFixed(2);
  };

  render() {
    const { totals, form, items } = this.state;
    return (
      <div className="container">
        <Header
          totals={totals}
          isExpense={form.isExpense}
          onToggleSwitch={this.handleToggleSwitch}
        />
        <Form
          onAddItem={this.handleAdd}
          isExpense={form.isExpense}
          onError={this.handleError}
        />
        <Items items={items} onDelete={this.handleDelete} />
      </div>
    );
  }
}

export default App;
