import React from 'react'
import './ExpenseList.css'
import ExpenseItem from './ExpenseItem'
import { MdDelete } from 'react-icons/md'
import { useState } from 'react'

const ExpenseList = ({ initialExpense, handleDelete, clearItems, handleEdit }) => {
  return (
    <>
      <ul className="list">
        {' '}
        {initialExpense.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )
        })}
      </ul>
      {initialExpense.length > 0 ? (
        <button className="btn" onClick={() => clearItems()}>
          목록 지우기
          <MdDelete className="btn-icon" />
        </button>
      ) : null}
    </>
  )
}

export default ExpenseList
