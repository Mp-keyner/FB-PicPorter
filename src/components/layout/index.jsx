import React from 'react'
import Nav from "../Nav/index"

const Layout = ({children}) => {
  return (<>
    <Nav />
    {children}
  </>)
}

export default Layout
