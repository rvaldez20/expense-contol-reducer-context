import { useReducer, createContext, Dispatch, ReactNode } from 'react'
import { BudgetActions, BudgetState, budgetReducer, initialState } from '../reducers/budget-reducer'

//! 4. creamos type para Props del BudgetContext
type BudgetContextProps = {
   state: BudgetState
   dispatch: Dispatch<BudgetActions>
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

   return (
      <BudgetContext.Provider
         value={{
            state,
            dispatch,
         }}
      >
         {children}
      </BudgetContext.Provider>
   )
}