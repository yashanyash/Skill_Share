import React from 'react'

function Button({ label, onClick }) {
  return (
   
        <button 
          onClick={onClick} 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          {label}
        </button>
      
      
  )
}

export default Button