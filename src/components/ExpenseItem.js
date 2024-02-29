import React from 'react'
import './ExpenseItem.css'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useState } from 'react'

const ExpenseItem = ({ expense, handleDelete, handleEdit }) => {
  const [edit, setEdit] = useState(false)
  const [newExpense, setNewExpense] = useState(expense)

  const setExpenseItem = (e) => {
    const { name, value } = e.target

    setNewExpense({ ...newExpense, [name]: name === 'amount' ? Number(value) : value })
  }

  return (
    <li className="item">
      <div className="info">
        {edit ? (
          <>
            <input
              type="text"
              className="expenseInput"
              name="charge"
              value={newExpense.charge}
              onChange={setExpenseItem}
            />
            <input
              type="number"
              className="amountInput"
              name="amount"
              value={newExpense.amount}
              onChange={setExpenseItem}
            />
          </>
        ) : (
          <>
            <span className="expense">{expense.charge}</span>
            <span className="amount">{expense.amount}</span>{' '}
          </>
        )}
      </div>
      <div>
        <button
          className="edit-btn"
          onClick={() => {
            handleEdit(edit, newExpense)
            setEdit(edit === true ? false : true)
          }}
        >
          <MdEdit />
        </button>
        <button onClick={() => handleDelete(expense.id)} className="clear-btn">
          <MdDelete />
        </button>
      </div>
    </li>
  )
}

export default ExpenseItem
