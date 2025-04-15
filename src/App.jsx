import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [successMessage, setSuccessMessage] = useState("");
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [editExpense, setEditExpense] = useState(null);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return (
    <div className="bg-dark">
      <div className="container py-4 text-white min-vh-100">
        <h1 className="text-center mb-4 text-warning text-uppercase">
          💸 Expense <span className="stroke">Tracker</span> 💸
        </h1>
        <hr />
        <div className="row">
          <div className="col-lg-6 mb-3">
            <ExpenseForm
              setExpenses={setExpenses}
              editExpense={editExpense}
              setEditExpense={setEditExpense}
              setSuccessMessage={setSuccessMessage}
            />
            {successMessage && (
              <div className="alert alert-success mt-2">{successMessage}</div>
            )}
          </div>
          <div className="col-lg-6 mb-3">
            <ExpenseTable
              expenses={expenses}
              setExpenses={setExpenses}
              setEditExpense={setEditExpense}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
