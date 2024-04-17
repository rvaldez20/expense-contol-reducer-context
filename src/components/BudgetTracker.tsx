import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import "react-circular-progressbar/dist/styles.css"



export default function BudgetTracker() {

   const {dispatch, state, totalExpenses, remainingBudget} = useBudget()

   const porcentage = +((totalExpenses / state.budget) * 100).toFixed(2)

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
         <div className="flex justify-center">

            <CircularProgressbar
               value={porcentage}                              // porcentage to grap round number 1-100
               text={`${porcentage}% Gastado`}

               // maxValue={1}

               styles={buildStyles({
                  pathColor: porcentage === 100 ? '#dc2626' : '#3b82f6',
                  trailColor: '#f5f5f5',        // color la prate no graficada
                  textSize: 10,                  
                  textColor: porcentage === 100 ? '#dc2626' : '#3b82f6',
                  strokeLinecap: 'butt',

                  // rotation: 0.25,
                  // pathTransitionDuration: 0.5,
                  // backgroundColor: '#3e98c7',          
               })}
            />

         </div>

         <div className="flex flex-col justify-center items-center gap-8">
            <button
               type="button"
               className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
               onClick={() => dispatch({type: 'restart-app'})}
            >
               Reset App
            </button>

            <AmountDisplay
               label="Presupuesto"
               amount={state.budget}
            />

            <AmountDisplay
               label="Disponible"
               amount={remainingBudget}
            />

            <AmountDisplay
               label="Gastado"
               amount={totalExpenses}
            />
         </div>
      </div>
   )
}
