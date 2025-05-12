import React from 'react'

function Loader() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#000101]">
      <div className="relative">
        <span className="font-italiana text-4xl md:text-6xl animate-pulse">
          Xecute
        </span>
        <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-loading"></div>
      </div>
    </div>
  )
}

export default Loader