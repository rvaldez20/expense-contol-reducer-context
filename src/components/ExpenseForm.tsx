import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import type { DraftExpense, Value } from '../types'
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import ErrorMessage from './ErrorMessage'
import { useBudget } from '../hooks/useBudget'


export default function ExpenseForm() {

   const [expense, setExpense] = useState<DraftExpense>({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date(),
   })
   const [error, setError] = useState('')
   const {dispatch, state} = useBudget()

   useEffect(() => {
      if(state.editingId) {
         const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
         setExpense(editingExpense)
      }
   }, [state.editingId])


   const handleChange = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      const {name, value} = e.target

      //* validacion para elfield amount, debe ser number
      const isAmountField = ['amount'].includes(name)
      setExpense({
         ...expense,
         [name]: isAmountField ? Number(value) : value
      })
   }

   const handleChangeDate = (value:Value) => {
      setExpense({
         ...expense,
         date: value
      })
   }

   const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      
      //* Validacion
      if(Object.values(expense).includes('')) {
         setError('All fields are required')
         return
      } 

      
      //* Agregar o actualizar el gasto
      if(state.editingId) {
         //* update expense
         dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
      } else {
         //* add new expense
         dispatch({type: 'add-expense', payload: {expense}})
      }
         
      //* restart the estate (clean the form)
      setExpense({
         amount: 0,
         expenseName: '',
         category: '',
         date: new Date(),
      })

   }

   return (
      <form 
         className="space-y-5"
         onSubmit={handleSubmit}
      >
         <legend 
            className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
         >{state.editingId ? 'Update Expense' : 'New Expense'}</legend>

         {error && <ErrorMessage>{error}</ErrorMessage>}

         <div className="flex flex-col gap-2">
            <label 
               htmlFor="expenseName"
               className="text-xl"
            >Name Expense:</label>
            <input 
               type="text"
               id="expenseName"
               placeholder="Add the new expense"
               className="bg-slate-100 p-2"
               name="expenseName"
               value={expense.expenseName}
               onChange={handleChange}
            />
         </div>

         <div className="flex flex-col gap-2">
            <label 
               htmlFor="amount"
               className="text-xl"
            >Amount:</label>
            <input 
               type="text"
               id="amount"
               placeholder="Add the amount of expense: Example. 1000"
               className="bg-slate-100 p-2"
               name="amount"
               value={expense.amount}
               onChange={handleChange}
            />
         </div>

         <div className="flex flex-col gap-2">
            <label 
               htmlFor="category"
               className="text-xl"
            >Category:</label>
            <select 
               name="category" 
               id="category"
               className="text-xl bg-slate-100"
               value={expense.category}
               onChange={handleChange}
            >
               <option value="">-- Select --</option>
               {categories.map(category => (
                  <option 
                     key={category.id} 
                     value={category.id}
                  >{category.name}</option>
               ))}
            </select>
         </div>

         <div className="flex flex-col gap-2">
            <label 
               htmlFor="amount"
               className="text-xl"
               
            >Expense Date:</label>
            <DatePicker 
               className="bg-salte-100 p-2 border-0 bg-slate-100"
               value={expense.date}
               onChange={handleChangeDate}
            />
         </div>

         <input 
            type="submit" 
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={state.editingId ? 'Save Changes' : 'Record Expense'}
         />

      </form>
   )
}
