import React from 'react'

const PagesWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-5">
      {children}
    </div>
  )
}

export default PagesWrapper