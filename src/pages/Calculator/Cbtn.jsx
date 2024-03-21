import React from 'react'

const Cbtn = ({ btn, className, modifier = false, childclass, ...props }) => {
  return (
    <>
      <div className={`p-1 bg-neutral-800 flex items-center justify-center ${className}`}>
        <div className={modifier ? `text-green-500 font-bold select-none cursor-pointer rounded-full hover:bg-neutral-700 py-2 px-4 ${childclass}` : `select-none cursor-pointer rounded-full hover:bg-neutral-700 py-2 text-lg px-4 ${childclass}`}
          {...props}
        >
          {btn}
        </div>
      </div>
    </>
  )
}

export default Cbtn