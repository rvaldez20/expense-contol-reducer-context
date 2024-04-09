import { useState, ChangeEvent, useMemo } from 'react'


export default function BudgetForm() {
   const [budget, setBudget] = useState(0)

   const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
      // console.log(e.target.valueAsNumber)
      setBudget(e.target.valueAsNumber)
   }

   const isValid = useMemo(() => {
      return isNaN(budget) || budget <= 0
   }, [budget])

   return (
      <form
         className="space-y-5"
      >
         <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
               Definir Presupuesto
            </label>
            <input
               id="budgetID"
               type="number"
               className="w-full bg-white border border-gray-300 p-2"
               placeholder="Define tu presupuesto"
               name="budget"
               value={budget}
               onChange={handleChange}
            />

         </div>

         <input 
            type="submit"
            value="Definir Presupuesto"
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 cursor-pointer font-black uppercase disabled:opacity-25"
            disabled={isValid}
         />
      </form>
   )
}
