import React from 'react'
import { useState } from 'react'
import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Alert from './components/\bAlert'

const App = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, charge: '콜라', amount: 2000 },
    { id: 2, charge: '빵', amount: 1000 },
    { id: 3, charge: '맥북', amount: 2000000 },
  ])

  const [charge, setCharge] = useState('')
  const [amount, setAmount] = useState(0)
  const [id, setId] = useState('')

  const [alert, setAlert] = useState({ show: false })

  const [edit, setEdit] = useState()

  const handleEdit = (id) => {
    const expense = expenses.find((item) => item.id === id)
    console.log(expense)
    const { charge, amount } = expense
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
  }

  const handleCharge = (e) => {
    setCharge(e.target.value)
  }

  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber)
  }

  const handleDelete = (id) => {
    const newExpense = expenses.filter((expense) => expense.id !== id)
    setExpenses(newExpense)
    handleAlert({ type: 'dange', text: '아이템이 삭제되었습니다.' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (charge !== '' && amount > 0) {
      if (edit) {
        const newExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item
        })
        setExpenses(newExpenses)
        setEdit(false)
        handleAlert({ type: 'success', text: '아이템이 수정되었습니다.' })
      } else {
        const newExpense = { id: crypto.randomUUID(), charge: charge, amount: amount }
        const newExpenses = [...expenses, newExpense]
        setExpenses(newExpenses)
        handleAlert({ type: 'success', text: '아이템이 생성되었습니다.' })
      }
      setCharge('')
      setAmount(0)
    } else {
      handleAlert({
        type: 'danger',
        text: 'charge는 빈 값일 수 없으며 amount 값은 0보다 커야 합니다.',
      })
    }
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })
    }, 7000)
  }

  return (
    <div className="App">
      <main className="main-container">
        <div className="sub-container">
          {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
          <h1>장바구니</h1>
          <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
            <ExpenseForm
              charge={charge}
              handleCharge={handleCharge}
              amount={amount}
              handleAmount={handleAmount}
              handleSubmit={handleSubmit}
              edit={edit}
            />
          </div>
          <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem' }}>
            <ExpenseList
              initialExpense={expenses}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'start', marginTop: '1rem' }}>
            <p style={{ fontSize: '2rem' }}>
              총지출:
              <span>
                {expenses.reduce((acc, cur) => {
                  return (acc += cur.amount)
                }, 0)}
                원
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
