import React, { useState, useEffect } from 'react';
import '../App.css';

function ExpenseTracker() {
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    return storedExpenses ? storedExpenses : [];
  });
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [salary, setSalary] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(() => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  });
  const [moneyLeft, setMoneyLeft] = useState(() => {
    return salary ? parseFloat(salary) - totalExpenses : 0;
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    setTotalExpenses(expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0));
  }, [expenses]);

  useEffect(() => {
    setMoneyLeft(salary ? parseFloat(salary) - totalExpenses : 0);
  }, [salary, totalExpenses]);

  const addExpense = () => {
    if (description && amount) {
      const newExpense = { description, amount };
      setExpenses([...expenses, newExpense]);
      setDescription('');
      setAmount('');
    }
  };

  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <div className='card-container'>
      <h1>Expense Tracker</h1>
      <div className='expense-container'>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.description} - ₹{expense.amount}
            <button className='btn' onClick={() => deleteExpense(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className='balance-container'>
        <h2>Total Expenses: ₹{totalExpenses}</h2>
        <input
          type="number"
          placeholder="Enter Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        {moneyLeft !== 0 && (
          <h2>Money Left After Expenses: ₹{moneyLeft}</h2>
        )}
      </div>
    </div>
  );
}

export default ExpenseTracker;
