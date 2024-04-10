import { categories } from "../data/categories";



export default function ExpenseForm() {
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
               className="text-xl"
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

         <input 
            type="submit" 
            className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={'Add Expense'}
         />


      </form>
   )
}
