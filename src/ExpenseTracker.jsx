import React, { useState, useEffect } from "react";

function ExpenseTracker() {
  const [expense, setExpense] = useState(100);
  const [income, setIncome] = useState(10000);
  const [showModal, setshowModal] = useState(false);
  const [showPopupExpense, setShowPopupExpense] = useState(false);
  const [showPopupIncome, setShowPopupIncome] = useState(false);
  const [newAmount, setNewAmount] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [balance, setBalance] = useState(150);
  const [query, setQuery] = useState("");
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Groceries", amount: -50, type: "expense" },
    { id: 2, description: "Salary", amount: 1000, type: "income" },
    { id: 3, description: "Rent", amount: -500, type: "expense" },
  ]);
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = (event) => {
    setQuery(event.target.value);
    setIsSearching(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSearching(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  const filteredTransactions = query
    ? transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(query.toLowerCase())
      )
    : transactions;

  const handleAddExpense = () => {
    if (!newAmount.trim()) {
      alert("Please enter a valid amount.");
      return;
    }
    const amount = parseInt(newAmount);
    setBalance((prevBalance) => prevBalance - amount);
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      {
        id: prevTransactions.length + 1,
        description: newDescription,
        amount: amount,
        type: "expense",
      },
    ]);
    setExpense((prevExpense) => prevExpense + amount);
    setShowPopupExpense(false);
    resetInputs();
  };

  const handleAddIncome = () => {
    if (!newAmount.trim()) {
      alert("Please enter a valid amount.");
      return;
    }
    const amount = parseFloat(newAmount);
    setBalance((prevBalance) => prevBalance + amount);
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      {
        id: prevTransactions.length + 1,
        description: newDescription,
        amount: amount,
        type: "income",
      },
    ]);
    setIncome((prevIncome) => prevIncome + amount);
    setShowPopupIncome(false);
    resetInputs();
  };

  const resetInputs = () => {
    setNewAmount("");
    setNewDescription("");
  };

  return (
    <div className="container">
      <h3>ExpenseTracker</h3>
      <div className="total-container">
        <div className="balance-containers">Balance : {balance}</div>
        <div className="sub-total-container">
          <div className="expense-containers">
            <span>Expense : {expense}</span>
            <button
              className="expense-btn"
              onClick={() => setShowPopupExpense(true)}
            >
              Add Expense
            </button>
            {showPopupExpense && (
              <div className="popup">
                <div className="modal-content">
                  <span
                    className="close"
                    onClick={() => setShowPopupExpense(false)}
                  >
                    &times;
                  </span>
                  <h2>Add Expense</h2>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                  <button onClick={handleAddExpense}>Add</button>
                </div>
              </div>
            )}
          </div>
          <div className="income-containers">
            <span>Income : {income}</span>
            <button
              className="btn-income"
              onClick={() => setShowPopupIncome(true)}
            >
              Add Money
            </button>
            {showPopupIncome && (
              <div className="popup">
                <div className="modal-content">
                  <span
                    className="close"
                    onClick={() => setShowPopupIncome(false)}
                  >
                    &times;
                  </span>
                  <h2>Add Money</h2>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                  <button onClick={handleAddIncome}>Add</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="trans-container">
        <h4>Transactions</h4>
        <div className="search-container">
          <input
            type="text"
            value={query}
            placeholder="Search.."
            onChange={handleChange}
          ></input>
        </div>
        <ul className={`transaction-list ${isSearching ? "loading" : ""}`}>
          {filteredTransactions.map((transaction) => (
            <li
              key={transaction.id}
              className={`transactionClass ${
                transaction.type === "expense"
                  ? "expense-transaction"
                  : "income-transaction"
              }`}
            >
              <div className="transaction-info">
                <div className="trns-description">
                  {transaction.description}
                </div>
                <div className="trns-amount">{transaction.amount}</div>
              </div>
            </li>
          ))}
        </ul>
        {isSearching && (
          <div className="loading-icon-container">
            <div className="loading-icon"></div>
          </div>
        )}
      </div>
      <footer></footer>
    </div>
  );
}

export default ExpenseTracker;
