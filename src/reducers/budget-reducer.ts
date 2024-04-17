import {v4 as uuidv4} from 'uuid'
import { DraftExpense, Expense } from "../types"


export type BudgetActions = 
   {type: 'add-budget', payload:{budget: number}} |
   {type: 'show-modal'} |
   {type: 'close-modal'} |
   {type: 'add-expense', payload: {expense: DraftExpense}} |
   {type: 'remove-expense', payload: {id: Expense['id']}} |
   {type: 'get-expense-by-id', payload: {id: Expense['id']}} |
   {type: 'update-expense', payload: {expense: Expense}} |
   {type: 'restart-app'} 


export type BudgetState = {
   budget: number,
   modal: boolean,
   expenses: Expense[],
   editingId: Expense['id']
}


const initialBudget = (): number => {
   const localStorageBudget = localStorage.getItem('budget')
   return localStorageBudget ? +localStorageBudget : 0
}

const initialExpenses = (): Expense[] => {
   const localStorageExpenses = localStorage.getItem('expenses')
   return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}


export const initialState:BudgetState = {
   budget: initialBudget(),
   modal: false,
   expenses: initialExpenses(),
   editingId: '',
}


//* function for change drafExpense(no id) to Expense(whit id)
const createExpense = (drafExpense: DraftExpense): Expense => {
   return {
      ...drafExpense,
      id: uuidv4(),
   }
}



export const budgetReducer = (
      state: BudgetState = initialState,
      action: BudgetActions
   ) => {

   if(action.type === 'add-budget') {
      
      return {
         ...state,
         budget: action.payload.budget
      }
   }


   if(action.type === 'show-modal') {

      return {
         ...state,
         modal: true,
      }
   }


   if(action.type === 'close-modal') {

      return {
         ...state,
         modal: false,
         editingId: ''
      }
   }


   if(action.type === 'add-expense') {
      //* ejecutamos la funcion que crea el Exense   
      const expense = createExpense(action.payload.expense)

      return {
         ...state,
         expenses:  [...state.expenses, expense ],
         modal: false
      }
   }

   if(action.type === 'remove-expense') {

      return {
         ...state,
         expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
      }
   }

   if(action.type ==='get-expense-by-id') {

      return {
         ...state,
         editingId: action.payload.id,
         modal: true
      }
   }

   if(action.type === 'update-expense') {


      return {
         ...state,
         expenses: state.expenses.map(currenteExpense => currenteExpense.id === action.payload.expense.id ? action.payload.expense :currenteExpense),
         modal: false,
         editingId: '',
      }
   }

   if(action.type === 'restart-app') {

      return {
         ...state,
         budget: 0,
         expenses: [],
      }
   }

   
   return state
}