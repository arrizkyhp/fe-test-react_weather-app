import React from 'react'

const Card = ({ children }) => {
  return (
    <div className='bg-white px-0 py-8 md:p-8 rounded-lg mt-5 mb-5 shadow-xl'>
        { children }
    </div>
  )
}

export default Card