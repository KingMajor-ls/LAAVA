import { useState } from 'react'

import Header from './Header'
import Sidebar from './Sidebar'


// function Layout()
const Layout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        {children}
        {/* <Chat/> */}
      </div>
      
  )
}

export default Layout