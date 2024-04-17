import { useReducer, createContext, Dispatch, ReactNode, useMemo } from 'react'
import { BudgetActions, BudgetState, budgetReducer, initialState } from '../reducers/budget-reducer'

//! 4. creamos type para Props del BudgetContext
type BudgetContextProps = {
   state: BudgetState
   dispatch: Dispatch<BudgetActions>
   totalExpenses: number
   remainingBudget: number
}

//! 5. creamos type para Props del BudgetProvider
type BudgetProviderProps = {
   children: ReactNode
}

//! 3. Creamos el context
export const BudgetContext = createContext<BudgetContextProps>(null!)

//! 1. Creamos el provider
export const BudgetProvider = ({children}:BudgetProviderProps) => {

   //! 2. Instanciamos el Reducer
   const [state, dispatch] = useReducer(budgetReducer, initialState)

   //! state derivados para calculos de total gastado y resto del oresupuesto
   const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0) ,[state.expenses])
   const remainingBudget = state.budget - totalExpenses

   return (
      <BudgetContext.Provider
         value={{
            state,
            dispatch,
            totalExpenses,
            remainingBudget,
         }}
      >
         {children}
      </BudgetContext.Provider>
   )
}