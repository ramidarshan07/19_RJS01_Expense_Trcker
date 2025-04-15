import React, { useState } from "react";

const ExpenseTable = ({ expenses, setExpenses, setEditExpense }) => {
  const [sortOrder, setSortOrder] = useState(null);

  const handleDelete = (id) => {
    const confoirmdelte = window.confirm(
      "Are you sure you want to delete this expense"
    );
    if (confoirmdelte) {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const total = expenses.reduce((acc, e) => acc + parseFloat(e.amount), 0);

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...expenses].sort((a, b) => {
      const valA = parseFloat(a.amount);
      const valB = parseFloat(b.amount);
      return newOrder === "asc" ? valA - valB : valB - valA;
    });
    setExpenses(sorted);
    setSortOrder(newOrder);
  };

  const getSortIcon = () => {
    if (sortOrder === "asc") return "bi-arrow-up";
    if (sortOrder === "desc") return "bi-arrow-down";
    return "bi-arrow-down-up";
  };

  return (
    <div className="rounded-2 shadow">
      <table className="table table-dark table-hover table-bordered rounded-2 overflow-hidden">
        <thead>
          <tr>
            <th className="custom-thead">Title</th>
            <th className="custom-thead">Category</th>
            <th className="custom-thead" onClick={handleSort}>
              <div className="sort-style">
                Amount (₹)<i className={`bi ${getSortIcon()} ms-1`}></i>
              </div>
            </th>
            <th className="custom-thead">Date</th>
            <th className="custom-thead">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(({ id, title, category, amount, date }) => (
            <tr key={id} className="table-row">
              <td>{title}</td>
              <td>{category}</td>
              <td>{amount}</td>
              <td>{date}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() =>
                    setEditExpense({ id, title, category, amount, date })
                  }
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
          <tr className="fw-bold">
            <th colSpan="2" className="text-end text-warning">
              Total
            </th>
            <th className="text-warning">₹ {total}</th>
            <th></th>
            <th></th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
