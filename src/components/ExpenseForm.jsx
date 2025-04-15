import React, { useEffect, useState } from "react";

const ExpenseForm = ({
  setExpenses,
  editExpense,
  setEditExpense,
  setSuccessMessage,
}) => {
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
    date: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editExpense) setExpense(editExpense);
  }, [editExpense]);

  const validate = () => {
    const newErrors = {};
    if (!expense.title) newErrors.title = "Title is required";
    if (!expense.category) newErrors.category = "Category is required";
    if (!expense.amount || isNaN(expense.amount) || expense.amount <= 0)
      newErrors.amount = "Valid amount is required";
    if (!expense.date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editExpense) {
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === editExpense.id ? { ...expense, id: item.id } : item
        )
      );
      setSuccessMessage("Expense updated successfully!");
      setEditExpense(null);
    } else {
      setExpenses((prev) => [...prev, { ...expense, id: crypto.randomUUID() }]);
      setSuccessMessage("Expense added successfully!");
    }

    setExpense({ title: "", category: "", amount: "", date: "" });
    setErrors({});

    setTimeout(() => setSuccessMessage(""), 4000);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow bg-black text-white ab"
      >
        <h4 className="mb-3 text-warning">
          {editExpense ? "Edit Expense" : "Add Expense"}
        </h4>
        <div className="mb-3">
          <label className="form-label text-warning">Title</label>
          <input
            type="text"
            className={`form-control boxshad bg-dark text-white border-warning ${
              errors.title && "is-invalid"
            }`}
            value={expense.title}
            onChange={(e) => setExpense({ ...expense, title: e.target.value })}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label text-warning">Category</label>
          <select
            className={`form-select bg-dark text-white border-warning ${
              errors.category && "is-invalid"
            }`}
            value={expense.category}
            onChange={(e) =>
              setExpense({ ...expense, category: e.target.value })
            }
          >
            <option hidden>Select Category</option>
            <option value="Grocery">Grocery</option>
            <option value="Clothes">Clothes</option>
            <option value="Bills">Bills</option>
            <option value="Transport">Transport</option>
            <option value="Education">Education</option>
            <option value="Medicine">Medicine</option>
          </select>
          {errors.category && (
            <div className="invalid-feedback">{errors.category}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label text-warning">Amount</label>
          <input
            type="text"
            className={`form-control bg-dark text-white border-warning ${
              errors.amount && "is-invalid"
            }`}
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          />
          {errors.amount && (
            <div className="invalid-feedback">{errors.amount}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label text-warning">Date</label>
          <input
            type="date"
            className={`form-control bg-dark text-white border-warning ${
              errors.date && "is-invalid"
            }`}
            value={expense.date}
            onChange={(e) => setExpense({ ...expense, date: e.target.value })}
          />
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>

        <button type="submit" className="btn btn-warning w-100 fw-bold">
          {editExpense ? "Save Changes" : "Add Expense"}
        </button>
      </form>
    </>
  );
};

export default ExpenseForm;
