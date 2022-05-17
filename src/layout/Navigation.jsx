import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({ today, day}) => {

  return (
     <div className="bg-white grid  grid-cols-2 w-full items-center justify-center mb-5">
        <Link className={`text-center p-3  ${today ? "bg-slate-700 text-white font-bold" : "font-medium"}`} to={"/"}>Today</Link>
        <Link className={`text-center p-3 ${day ?  "bg-slate-700 text-white font-bold" : "font-medium"}`} to={"/day"}>6 Day</Link>
      </div>
  )
}

export default Navigation