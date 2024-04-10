import { useState } from 'react'
import type { DraftExpense } from '../types'
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'


export default function ExpenseForm() {

   const [expense, setExpense] = useState<DraftExpense>({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date(),
   })

   return (
      <form className="space-y-5">
         <legend 
            className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2"
         >New Expense</legend>

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
            />
         </div>

         <input 
            type="submit" 
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={'Add Expense'}
         />


      </form>
   )
}
