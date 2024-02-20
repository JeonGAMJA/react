import React from 'react'
import './ExpenseList.css'
import ExpenseItem from './ExpenseItem'

const ExpenseList = ({ initialExpense, handleDelete }) => {
  return (
    <>
      <ul className="list">
        {initialExpense.map((expense) => {
          return (
            <ExpenseItem key={expense.id} expense={expense} handleDelete={handleDelete} />
          )
        })}
      </ul>
      <button className="btn">목록 지우기</button>
    </>
  )
}

export default ExpenseList
