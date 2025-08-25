import React, { createContext,useState } from 'react'

// create a context
export const addProjectResponseContext = createContext()

function ContextShare({children}) {
    // children is a pre defined props used to share data between all components
    // create a state, that state is we are sharing between components
    const[addProjectResponse,setAddProjectResponse] = useState({})
  return (
  <>
  <addProjectResponseContext.Provider
  value={{addProjectResponse,setAddProjectResponse}}>
    {children}
  </addProjectResponseContext.Provider>
  </>
  )
}

export default ContextShare